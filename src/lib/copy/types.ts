import type { PageId, SectionId } from "@/lib/i18n";

export type PageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
};

export type Copy = {
  meta: {
    title: string;
    description: string;
  };
  notFound: {
    title: string;
    body: string;
    back: string;
  };
  privacy: {
    title: string;
    lead: string;
    updated: string;
    controllerTitle: string;
    controller: string;
    preview: string;
    sections: { id: string; title: string; paragraphs: string[] }[];
    cookiesTitle: string;
    cookiesIntro: string;
    cookiePurpose: string;
    cookieDuration: string;
    languagePurpose: string;
    languageDuration: string;
    noticePurpose: string;
    noticeDuration: string;
    analyticsPurpose: string;
    analyticsDuration: string;
    cookieControls: string;
    contactTitle: string;
    contact: string;
    authority: string;
  };
  nav: { id: SectionId; label: string }[];
  ctaPlan: string;
  ctaApproach: string;
  language: { nl: string; en: string; switchTo: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    note: string;
  };
  stats: { value: string; label: string }[];
  difference: {
    title: string;
    items: { title: string; body: string }[];
  };
  offer: {
    title: string;
    items: { title: string; body: string }[];
  };
  focus: {
    title: string;
    body: string;
    areas: string[];
  };
  founders: {
    eyebrow: string;
    title: string;
    intro: string;
    criteria: { title: string; question: string; body: string }[];
    notYetTitle: string;
    notYet: string;
    notInTitle: string;
    notIn: string[];
    howTitle: string;
    howIntro: string;
    rounds: { title: string; stage: string; body: string }[];
    togetherTitle: string;
    together: string;
    free: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    boardTitle: string;
    board: string[];
    boardQuote: string;
    gtmTitle: string;
    gtm: string;
    after: string[];
  };
  network: {
    eyebrow: string;
    title: string;
    intro: string;
    areasTitle: string;
    areas: string[];
    howTitle: string;
    how: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    intro: string;
    activeTitle: string;
    active: { name: string; body: string }[];
    exitsTitle: string;
    exits: { name: string; body: string }[];
    failedTitle: string;
    failed: { name: string; body: string }[];
    learned: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    standTitle: string;
    stand: { title: string; body: string }[];
    founderTitle: string;
    founderName: string;
    founderRole: string;
    founder: string[];
    linkedin: string;
    togetherTitle: string;
    together: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    intro: string;
    needTitle: string;
    needs: string[];
    confidential: string;
    focusOptions: { value: string; label: string }[];
    stageOptions: { value: string; label: string }[];
  };
  footer: {
    legal: string;
    privacy: string;
  };
  pages: Record<PageId, PageCopy>;
  explore: {
    title: string;
    items: { page: PageId; title: string; body: string }[];
    more: string;
  };
  cta: { title: string; body: string };
};
