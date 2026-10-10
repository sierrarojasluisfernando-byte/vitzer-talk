import React from "react";
import { useTranslation } from "react-i18next";
import { openUrl } from "@tauri-apps/plugin-opener";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { Button } from "../../ui/Button";
import { LogDirectory } from "../debug/LogDirectory";

// Vitzer's contact page. Update when the site moves to its own domain.
const CONTACT_URL = "https://vitzer-portafolio.vercel.app/contacto.html";

export const HelpSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup title={t("settings.help.contact.group")}>
        <SettingContainer
          title={t("settings.help.contact.title")}
          description={t("settings.help.contact.description")}
          descriptionMode="inline"
          grouped={true}
        >
          <Button
            variant="primary"
            size="md"
            onClick={() => openUrl(CONTACT_URL)}
          >
            {t("settings.help.contact.button")}
          </Button>
        </SettingContainer>
      </SettingsGroup>

      <SettingsGroup
        title={t("settings.help.logs.group")}
        description={t("settings.help.logs.description")}
      >
        <LogDirectory descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
    </div>
  );
};
