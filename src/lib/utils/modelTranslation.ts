import type { TFunction } from "i18next";
import type { ModelInfo } from "@/bindings";

// Vitzer Talk shows its curated models by what they are for ("Fast",
// "Precise") instead of their technical names. Keyed by Hugging Face repo.
const FRIENDLY_MODELS: Record<string, string> = {
  "handy-computer/canary-180m-flash-gguf": "fast",
  "handy-computer/canary-1b-v2-gguf": "precise",
};

const friendlyKey = (model: ModelInfo): string | undefined => {
  const source = model.source;
  if (typeof source !== "object" || !("HuggingFace" in source))
    return undefined;
  return FRIENDLY_MODELS[source.HuggingFace.repo_id];
};

/**
 * Get the translated name for a model
 * @param model - The model info object
 * @param t - The translation function from useTranslation
 * @returns The translated model name, or the original name if no translation exists
 */
export function getTranslatedModelName(model: ModelInfo, t: TFunction): string {
  const friendly = friendlyKey(model);
  if (friendly) return t(`vitzerModels.${friendly}.name`);
  const translationKey = `onboarding.models.${model.id}.name`;
  const translated = t(translationKey, { defaultValue: "" });
  return translated !== "" ? translated : model.name;
}

/**
 * Get the translated description for a model
 * @param model - The model info object
 * @param t - The translation function from useTranslation
 * @returns The translated model description, or the original description if no translation exists
 */
export function getTranslatedModelDescription(
  model: ModelInfo,
  t: TFunction,
): string {
  // Custom models use a generic translation key
  if (model.is_custom) {
    return t("onboarding.customModelDescription");
  }
  const friendly = friendlyKey(model);
  if (friendly) return t(`vitzerModels.${friendly}.description`);
  const translationKey = `onboarding.models.${model.id}.description`;
  const translated = t(translationKey, { defaultValue: "" });
  return translated !== "" ? translated : model.description;
}
