import React from "react";
import { useTranslation } from "react-i18next";
import { CustomWords } from "../CustomWords";
import { TextReplacements } from "../TextReplacements";
import { SettingsGroup } from "../../ui/SettingsGroup";

// Everything that teaches Vitzer Talk the user's vocabulary, in one place.
export const DictionarySettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup
        title={t("settings.dictionary.words.title")}
        description={t("settings.dictionary.words.description")}
      >
        <CustomWords descriptionMode="tooltip" grouped />
      </SettingsGroup>

      <SettingsGroup
        title={t("settings.dictionary.replacements.title")}
        description={t("settings.dictionary.replacements.description")}
      >
        <TextReplacements descriptionMode="tooltip" grouped />
      </SettingsGroup>

      <p className="px-4 text-xs text-mid-gray">
        {t("settings.dictionary.techNote")}
      </p>
    </div>
  );
};
