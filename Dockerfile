# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

# Copy source and build
# NITRO_PRESET=node targets Node.js instead of the default Cloudflare Workers preset
COPY . .
RUN NITRO_PRESET=node bun run build

# ── Stage 2: production runtime ──────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Only copy the compiled server output — no source, no devDeps
COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
