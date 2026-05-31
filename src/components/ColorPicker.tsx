import { useLanguage } from "@/contexts/LanguageContext";
import { availableColors } from "@/data/colors";
import type { SelectedColor } from "@/data/colors";

type Props = {
  value: SelectedColor | null;
  onChange: (color: SelectedColor | null) => void;
};

export function ColorPicker({ value, onChange }: Props) {
  const { t } = useLanguage();

  return (
    <div className="mt-6">
      <p className="text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-3">
        {t("gallery.colorLabel")}
      </p>

      <div className="flex gap-2 flex-wrap">
        {availableColors.map((color) => {
          const selected = value?.pantone === color.pantone;
          return (
            <button
              key={color.pantone}
              type="button"
              title={`${color.name} · ${color.pantone}`}
              aria-label={`${color.name} · ${color.pantone}`}
              onClick={() => onChange(selected ? null : color)}
              className="w-7 h-7 rounded-full transition-all focus:outline-none"
              style={{
                background: color.hex,
                boxShadow: selected
                  ? `0 0 0 2px #f7f1e6, 0 0 0 3.5px ${color.hex}`
                  : "0 0 0 1px #d4c9bc",
              }}
            />
          );
        })}
      </div>

      {value && (
        <p className="text-[9px] text-green-deep mt-2 tracking-[0.12em]">
          ✓ {value.name} · {value.pantone}
        </p>
      )}

      <p className="mt-3 text-[9px] tracking-[0.15em] text-ink-soft leading-relaxed">
        {t("gallery.colorOtherNotice")}
      </p>
    </div>
  );
}
