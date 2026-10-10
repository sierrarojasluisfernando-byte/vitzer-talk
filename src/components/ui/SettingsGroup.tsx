import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * When provided, every titled SettingsGroup below renders as a collapsible
 * card. `defaultOpen` lists the titles that start expanded; after that each
 * group remembers what the user chose.
 */
export const CollapsibleGroupsContext = createContext<{
  defaultOpen: string[];
} | null>(null);

const OPEN_STATE_KEY = "vitzer.settings.openGroups";

const readOpenState = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(OPEN_STATE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeOpenState = (title: string, open: boolean) => {
  try {
    localStorage.setItem(
      OPEN_STATE_KEY,
      JSON.stringify({ ...readOpenState(), [title]: open }),
    );
  } catch {
    // Remembering the state is a convenience; ignore storage failures.
  }
};

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  const collapsible = useContext(CollapsibleGroupsContext);
  const [open, setOpen] = useState(() =>
    collapsible && title
      ? (readOpenState()[title] ?? collapsible.defaultOpen.includes(title))
      : true,
  );

  if (collapsible && title) {
    const toggle = () => {
      writeOpenState(title, !open);
      setOpen(!open);
    };

    return (
      <div className="bg-background border border-mid-gray/20 rounded-xl shadow-card overflow-visible">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-start cursor-pointer rounded-xl hover:bg-mid-gray/10 transition-colors"
        >
          <span>
            <span className="block text-sm font-semibold">{title}</span>
            {description && (
              <span className="block text-xs text-mid-gray mt-0.5">
                {description}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 shrink-0 text-mid-gray transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="border-t border-mid-gray/20 divide-y divide-mid-gray/20">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {title && (
        <div className="px-4">
          <h2 className="text-xs font-medium text-mid-gray uppercase tracking-wide">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-mid-gray mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="bg-background border border-mid-gray/20 rounded-xl shadow-card overflow-visible">
        <div className="divide-y divide-mid-gray/20">{children}</div>
      </div>
    </div>
  );
};
