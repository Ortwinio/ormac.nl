import { copy } from "@/lib/copy";
import { siteUrl, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#ortwin-verreck`;

/** Organization and founder, shared by every page. */
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        legalName: site.legalName,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/icon-512.png`,
        description: t.meta.description,
        foundingDate: "2002",
        founder: { "@id": founderId },
        vatID: site.vat,
        identifier: { "@type": "PropertyValue", propertyID: "KvK", value: site.kvk },
        areaServed: "NL",
        knowsAbout: ["Venture capital", "Seed funding", "Go-to-market strategy", "Advisory boards", "Startups"],
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: t.about.founderName,
        jobTitle: locale === "nl" ? "Oprichter" : "Founder",
        worksFor: { "@id": organizationId },
        sameAs: [site.linkedin],
        image: `${siteUrl}/images/ortwin-verreck.jpg`,
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** The FAQ as shown on the page, for rich results. */
export function FaqJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy[locale].faq.items.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
