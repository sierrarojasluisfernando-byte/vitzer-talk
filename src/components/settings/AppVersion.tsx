import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
import { SettingContainer } from "../ui/SettingContainer";

interface AppVersionProps {
  grouped?: boolean;
}

export const AppVersion: React.FC<AppVersionProps> = ({ grouped = false }) => {
  const { t } = useTranslation();
  const [version, setVersion] = useState("");

  useEffect(() => {
    getVersion()
      .then(setVersion)
      .catch((error) => console.error("Failed to get app version:", error));
  }, []);

  return (
    <SettingContainer
      title={t("settings.about.version.title")}
      description={t("settings.about.version.description")}
      grouped={grouped}
    >
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <span className="text-sm font-mono">v{version}</span>
    </SettingContainer>
  );
};
