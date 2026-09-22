import { SiteShell } from "@/components/site-shell";
import { copy } from "@/lib/copy";
import { localeMetadata } from "@/lib/metadata";

export const metadata = localeMetadata("en", "privacy");

export default function EnglishPrivacyPage() {
  const t = copy.en;
  return (
    <SiteShell locale="en">
      <article className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <h1 className="font-heading text-4xl tracking-tight">{t.privacy.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t.privacy.lead}
        </p>
        {t.privacy.body.map((paragraph) => (
          <p key={paragraph} className="mt-5 text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </article>
    </SiteShell>
  );
}
