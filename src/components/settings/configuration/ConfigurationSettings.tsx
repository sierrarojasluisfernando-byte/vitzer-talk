import React from "react";
import { GeneralSettings } from "../general/GeneralSettings";
import { ModelsSettings } from "../models/ModelsSettings";
import { AdvancedSettings } from "../advanced/AdvancedSettings";

// One page for every setting: shortcuts and sound, then the model, then the
// app, output and transcription options.
export const ConfigurationSettings: React.FC = () => (
  <div className="w-full flex flex-col gap-8">
    <GeneralSettings />
    <ModelsSettings />
    <AdvancedSettings />
  </div>
);
