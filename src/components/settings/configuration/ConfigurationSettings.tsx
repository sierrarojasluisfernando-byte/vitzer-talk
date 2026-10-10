import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CollapsibleGroupsContext,
  SettingsGroup,
} from "../../ui/SettingsGroup";
import { AppLanguageSelector } from "../AppLanguageSelector";
import { ThemeSelector } from "../ThemeSelector";
import { AppVersion } from "../AppVersion";
import { GeneralSettings } from "../general/GeneralSettings";
import { ModelsSettings } from "../models/ModelsSettings";
import { AdvancedSettings } from "../advanced/AdvancedSettings";

// One page for every setting. Each group is a collapsible card so the page
// reads as a short list; only the shortcuts start open.
export const ConfigurationSettings: React.FC = () => {
  const { t } = useTranslation();
  const collapsible = useMemo(
    () => ({ defaultOpen: [t("settings.general.title")] }),
    [t],
  );

  return (
    <CollapsibleGroupsContext.Provider value={collapsible}>
      <div className="w-full flex flex-col gap-3 [&>div]:space-y-3">
        <GeneralSettings />
        <div className="max-w-3xl w-full mx-auto">
          <SettingsGroup title={t("settings.models.title")}>
            <div className="p-4">
              <ModelsSettings embedded />
            </div>
          </SettingsGroup>
        </div>
        <div className="max-w-3xl w-full mx-auto">
          <SettingsGroup title={t("settings.home.app")}>
            <AppLanguageSelector descriptionMode="tooltip" grouped={true} />
            <ThemeSelector descriptionMode="tooltip" grouped={true} />
            <AppVersion grouped={true} />
          </SettingsGroup>
        </div>
        <AdvancedSettings />
      </div>
    </CollapsibleGroupsContext.Provider>
  );
};
