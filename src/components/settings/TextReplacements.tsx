import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSettings } from "../../hooks/useSettings";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { SettingContainer } from "../ui/SettingContainer";
import { X } from "lucide-react";

interface TextReplacementsProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

const MAX_LENGTH = 80;

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

export const TextReplacements: React.FC<TextReplacementsProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const replacements = getSetting("text_replacements") || [];
    const normalizedFrom = normalize(from);
    const normalizedTo = normalize(to);
    const updating = isUpdating("text_replacements");
    const canAdd =
      normalizedFrom.length > 0 &&
      normalizedTo.length > 0 &&
      normalizedFrom.length <= MAX_LENGTH &&
      normalizedTo.length <= MAX_LENGTH &&
      !updating;

    const handleAdd = () => {
      if (!canAdd) return;
      const exists = replacements.some(
        (r) => r.from.toLowerCase() === normalizedFrom.toLowerCase(),
      );
      if (exists) {
        toast.error(
          t("settings.advanced.textReplacements.duplicate", {
            from: normalizedFrom,
          }),
        );
        return;
      }
      updateSetting("text_replacements", [
        ...replacements,
        { from: normalizedFrom, to: normalizedTo },
      ]);
      setFrom("");
      setTo("");
    };

    const handleRemove = (fromToRemove: string) => {
      updateSetting(
        "text_replacements",
        replacements.filter((r) => r.from !== fromToRemove),
      );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAdd();
      }
    };

    return (
      <>
        <SettingContainer
          title={t("settings.advanced.textReplacements.title")}
          description={t("settings.advanced.textReplacements.description")}
          descriptionMode={descriptionMode}
          grouped={grouped}
          layout="stacked"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              type="text"
              className="max-w-40"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(
                "settings.advanced.textReplacements.fromPlaceholder",
              )}
              variant="compact"
              disabled={updating}
            />
            {}
            <span className="text-mid-gray">→</span>
            <Input
              type="text"
              className="max-w-40"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(
                "settings.advanced.textReplacements.toPlaceholder",
              )}
              variant="compact"
              disabled={updating}
            />
            <Button
              onClick={handleAdd}
              disabled={!canAdd}
              variant="primary"
              size="md"
            >
              {t("settings.advanced.textReplacements.add")}
            </Button>
          </div>
        </SettingContainer>
        {replacements.length > 0 && (
          <div
            className={`px-4 p-2 ${grouped ? "" : "rounded-lg border border-mid-gray/20"} flex flex-wrap gap-1`}
          >
            {replacements.map((r) => (
              <Button
                key={r.from}
                onClick={() => handleRemove(r.from)}
                disabled={updating}
                variant="secondary"
                size="sm"
                className="inline-flex items-center gap-1 cursor-pointer"
                aria-label={t("settings.advanced.textReplacements.remove", {
                  from: r.from,
                })}
              >
                <span>{r.from}</span>
                {}
                <span className="text-mid-gray">→</span>
                <span>{r.to}</span>
                <X className="w-3 h-3" />
              </Button>
            ))}
          </div>
        )}
      </>
    );
  },
);
