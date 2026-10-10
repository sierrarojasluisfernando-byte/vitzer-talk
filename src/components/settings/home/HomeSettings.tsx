import React from "react";
import { useTranslation } from "react-i18next";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { AppLanguageSelector } from "../AppLanguageSelector";
import { ThemeSelector } from "../ThemeSelector";
import { AppVersion } from "../AppVersion";
import { HistorySettings } from "../history/HistorySettings";

// Home: the app basics (language, theme, version) and the recent dictations.
export const HomeSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="max-w-3xl w-full mx-auto">
        <SettingsGroup title={t("settings.home.app")}>
          <AppLanguageSelector descriptionMode="tooltip" grouped={true} />
          <ThemeSelector descriptionMode="tooltip" grouped={true} />
          <AppVersion grouped={true} />
        </SettingsGroup>
      </div>
      <HistorySettings />
    </div>
  );
};
