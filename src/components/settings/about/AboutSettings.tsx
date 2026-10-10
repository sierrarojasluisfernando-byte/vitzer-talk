import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
import { openUrl } from "@tauri-apps/plugin-opener";
import HandyTextLogo from "../../icons/HandyTextLogo";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { AppLanguageSelector } from "../AppLanguageSelector";
import { ShowWhatsNewOnUpdate } from "../ShowWhatsNewOnUpdate";
import { ThemeSelector } from "../ThemeSelector";

// Vitzer site. Update when the site moves to its own domain.
const SITE_URL = "https://vitzer-portafolio.vercel.app";
const SITE_LABEL = "vitzer-portafolio.vercel.app";

export const AboutSettings: React.FC = () => {
  const { t } = useTranslation();
  const [version, setVersion] = useState("");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const appVersion = await getVersion();
        setVersion(appVersion);
      } catch (error) {
        console.error("Failed to get app version:", error);
        setVersion("0.1.2");
      }
    };

    fetchVersion();
  }, []);

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      {/* The upstream license texts ship in resources/licenses, so the page
          only introduces the product. */}
      <div className="bg-background border border-mid-gray/20 rounded-xl shadow-card px-6 py-5 space-y-3">
        <HandyTextLogo width={170} />
        <p className="text-sm">{t("settings.about.intro.what")}</p>
        <p className="text-sm">{t("settings.about.intro.privacy")}</p>
        <p className="text-sm text-mid-gray">
          {t("settings.about.intro.madeBy")}{" "}
          <button
            type="button"
            className="text-logo-primary hover:underline cursor-pointer"
            onClick={() => openUrl(SITE_URL)}
          >
            {SITE_LABEL}
          </button>
        </p>
      </div>

      <SettingsGroup title={t("settings.about.title")}>
        <AppLanguageSelector descriptionMode="tooltip" grouped={true} />
        <ThemeSelector descriptionMode="tooltip" grouped={true} />
        <SettingContainer
          title={t("settings.about.version.title")}
          description={t("settings.about.version.description")}
          grouped={true}
        >
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <span className="text-sm font-mono">v{version}</span>
        </SettingContainer>

        <ShowWhatsNewOnUpdate descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
    </div>
  );
};
