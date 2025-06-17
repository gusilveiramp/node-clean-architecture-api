// src/common/errors/i18n/index.ts

import { ptBR } from "./pt-BR";
import { enUS } from "./en-US";
import { useRequestLanguage } from "../context/request-context";
import { Messages } from "./types";

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
