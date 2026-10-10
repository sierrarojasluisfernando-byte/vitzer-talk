import React from "react";
import { useTranslation } from "react-i18next";
import { openUrl } from "@tauri-apps/plugin-opener";
import HandyTextLogo from "../../icons/HandyTextLogo";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { ShowWhatsNewOnUpdate } from "../ShowWhatsNewOnUpdate";

// Vitzer site. Update when the site moves to its own domain.
const SITE_URL = "https://vitzer-portafolio.vercel.app";
const SITE_LABEL = "vitzer-portafolio.vercel.app";

export const AboutSettings: React.FC = () => {
  const { t } = useTranslation();

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

      <SettingsGroup>
        <ShowWhatsNewOnUpdate descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
    </div>
  );
};
