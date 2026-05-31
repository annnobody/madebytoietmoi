import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { availableColors } from "@/data/colors";
import type { SelectedColor } from "@/data/colors";
import { PantoneSearch } from "@/components/PantoneSearch";

type Props = {
  value: SelectedColor | null;
  onChange: (color: SelectedColor | null) => void;
};

export function ColorPicker({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [showOther, setShowOther] = useState(value?.type === "custom");

  const selectedAvailable =
    value?.type === "available" ? value.color : null;
  const selectedCustom =
    value?.type === "custom"
      ? { name: value.name, pantone: value.pantone, hex: value.hex }
      : null;

  const pickAvailable = (color: (typeof availableColors)[number]) => {
    setShowOther(false);
    onChange({ type: "available", color });
  };

  const openOther = () => {
    setShowOther(true);
    onChange(null);
  };

  const pickCustom = (entry: { name: string; pantone: string; hex: string } | null) => {
    if (entry) {
      onChange({ type: "custom", ...entry });
    } else {
      onChange(null);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-3">
        {t("gallery.colorLabel")}
      </p>

      <div className="flex gap-2 flex-wrap">
        {availableColors.map((color) => {
          const selected = selectedAvailable?.pantone === color.pantone;
          return (
            <button
              key={color.pantone}
              type="button"
              title={`${color.name} · ${color.pantone}`}
              aria-label={`${color.name} · ${color.pantone}`}
              onClick={() => pickAvailable(color)}
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

      {selectedAvailable && (
        <p className="text-[9px] text-green-deep mt-2 tracking-[0.12em]">
          ✓ {selectedAvailable.name} · {selectedAvailable.pantone}
        </p>
      )}

      {!showOther && (
        <button
          type="button"
          onClick={openOther}
          className="mt-3 text-[9px] tracking-[0.15em] uppercase text-ink-soft hover:text-ink transition-colors underline"
        >
          {t("gallery.colorOther")}
        </button>
      )}

      {showOther && (
        <PantoneSearch value={selectedCustom} onChange={pickCustom} />
      )}
    </div>
  );
}
