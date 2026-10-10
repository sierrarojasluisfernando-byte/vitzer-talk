import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

// Large page title with a one-line explanation, shown above every section.
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => (
  <div className="max-w-3xl w-full mx-auto px-1 pt-2">
    <h1 className="text-2xl font-extrabold">{title}</h1>
    {description && <p className="mt-1 text-sm text-text/60">{description}</p>}
    <div className="mt-3 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-logo-primary" />
      <span className="h-px flex-1 bg-mid-gray/20" />
    </div>
  </div>
);
