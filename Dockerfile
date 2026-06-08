# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

# Copy source and build.
# NITRO_PRESET=node-server makes nitro emit a standalone Node.js server (dist/server/index.mjs)
# instead of the default Cloudflare Workers bundle. vite.config.ts force-enables the nitro plugin.
COPY . .
RUN NITRO_PRESET=node-server bun run build

# ── Stage 2: production runtime ──────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Only copy the compiled output — no source, no devDeps.
# The lovable vite config writes nitro output to dist/ (server + client), not .output/.
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server/index.mjs"]
