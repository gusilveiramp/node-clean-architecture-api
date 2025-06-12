import { ptBR } from "./pt-BR";
import { enUS } from "./en-US";
import { Messages } from "./types";
import { useRequestLanguage } from "../context/request-context";

const locales = {
  "pt-BR": ptBR,
  "en-US": enUS,
} as const;

export type LocaleKey = keyof typeof locales;

export function getMessages(lang?: string): Messages {
  const resolvedLang = lang ?? useRequestLanguage();
  const key = (resolvedLang in locales ? resolvedLang : "pt-BR") as LocaleKey;
  return locales[key];
}
