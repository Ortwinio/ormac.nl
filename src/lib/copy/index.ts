import { en } from "@/lib/copy/en";
import { nl } from "@/lib/copy/nl";
import type { Copy } from "@/lib/copy/types";
import type { Locale } from "@/lib/i18n";

export const copy: Record<Locale, Copy> = { nl, en };

export type { Copy };
