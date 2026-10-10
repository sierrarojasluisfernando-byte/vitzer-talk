import React from "react";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Cog,
  FlaskConical,
  Home,
  Info,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import HandyTextLogo from "./icons/HandyTextLogo";
import { useSettings } from "../hooks/useSettings";
import {
  ConfigurationSettings,
  DictionarySettings,
  HelpSettings,
  HistorySettings,
  DebugSettings,
  AboutSettings,
  PostProcessingSettings,
} from "./settings";

export type SidebarSection = keyof typeof SECTIONS_CONFIG;

interface IconProps {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

interface SectionConfig {
  labelKey: string;
  /** Page title and one-line explanation shown above the section. */
  titleKey: string;
  descriptionKey: string;
  icon: React.ComponentType<IconProps>;
  component: React.ComponentType;
  enabled: (settings: any) => boolean;
}

// Vitzer Talk navigation: recent dictations first, then the vocabulary, then
// every setting on one page.
export const SECTIONS_CONFIG = {
  home: {
    labelKey: "sidebar.home",
    titleKey: "pages.home.title",
    descriptionKey: "pages.home.description",
    icon: Home,
    component: HistorySettings,
    enabled: () => true,
  },
  dictionary: {
    labelKey: "sidebar.dictionary",
    titleKey: "pages.dictionary.title",
    descriptionKey: "pages.dictionary.description",
    icon: BookOpen,
    component: DictionarySettings,
    enabled: () => true,
  },
  general: {
    labelKey: "sidebar.general",
    titleKey: "pages.general.title",
    descriptionKey: "pages.general.description",
    icon: Cog,
    component: ConfigurationSettings,
    enabled: () => true,
  },
  postprocessing: {
    labelKey: "sidebar.postProcessing",
    titleKey: "pages.postProcessing.title",
    descriptionKey: "pages.postProcessing.description",
    icon: Sparkles,
    component: PostProcessingSettings,
    enabled: (settings) => settings?.post_process_enabled ?? false,
  },
  debug: {
    labelKey: "sidebar.debug",
    titleKey: "pages.debug.title",
    descriptionKey: "pages.debug.description",
    icon: FlaskConical,
    component: DebugSettings,
    enabled: (settings) => settings?.debug_mode ?? false,
  },
  about: {
    labelKey: "sidebar.about",
    titleKey: "pages.about.title",
    descriptionKey: "pages.about.description",
    icon: Info,
    component: AboutSettings,
    enabled: () => true,
  },
  help: {
    labelKey: "sidebar.help",
    titleKey: "pages.help.title",
    descriptionKey: "pages.help.description",
    icon: LifeBuoy,
    component: HelpSettings,
    enabled: () => true,
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const availableSections = Object.entries(SECTIONS_CONFIG)
    .filter(([_, config]) => config.enabled(settings))
    .map(([id, config]) => ({ id: id as SidebarSection, ...config }));

  return (
    <div className="flex flex-col w-44 h-full bg-surface border-e border-mid-gray/20 items-center px-2">
      <HandyTextLogo width={120} className="m-4" />
      <div className="flex flex-col w-full items-center gap-1 pt-2 border-t border-mid-gray/20">
        {availableSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              className={`flex gap-2 items-center p-2 w-full rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? "bg-background-ui text-white"
                  : "hover:bg-mid-gray/20 hover:opacity-100 opacity-85"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <Icon width={24} height={24} className="shrink-0" />
              <p
                className="text-sm font-medium truncate"
                title={t(section.labelKey)}
              >
                {t(section.labelKey)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
