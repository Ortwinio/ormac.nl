import type { SectionId } from "@/lib/i18n";

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
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  offer: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  focus: {
    eyebrow: string;
    title: string;
    body: string;
    areas: string[];
  };
  stages: {
    eyebrow: string;
    title: string;
    body: string;
  };
  track: {
    eyebrow: string;
    title: string;
    body: string;
    logos: string[];
  };
  closing: {
    title: string;
    body: string;
  };
  founders: {
    eyebrow: string;
    title: string;
    intro: string;
    criteriaTitle: string;
    criteria: { title: string; question: string; body: string }[];
    notYetTitle: string;
    notYet: string;
    notInTitle: string;
    notIn: string[];
    howTitle: string;
    howIntro: string;
    rounds: { title: string; stage: string; body: string }[];
    max: string;
    togetherTitle: string;
    together: string;
    getTitle: string;
    get: string[];
    free: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    stepsTitle: string;
    steps: { title: string; body: string }[];
    boardTitle: string;
    board: string[];
    boardQuote: string;
    gtmTitle: string;
    gtm: string;
    afterTitle: string;
    after: string[];
    exitTitle: string;
    exit: string;
  };
  network: {
    eyebrow: string;
    title: string;
    intro: string;
    areasTitle: string;
    areas: { title: string; body: string }[];
    howTitle: string;
    how: string;
    coTitle: string;
    co: string;
    ecoTitle: string;
    eco: string;
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
    missionTitle: string;
    mission: string;
    standTitle: string;
    stand: { title: string; body: string }[];
    founderTitle: string;
    founderName: string;
    founderRole: string;
    founder: string[];
    linkedin: string;
    togetherTitle: string;
    together: string;
    whereTitle: string;
    where: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    need: string;
    needTitle: string;
    needs: string[];
    emailHint: string;
    general: string;
    plans: string;
    confidentialTitle: string;
    confidential: string;
    successTitle: string;
    success: string;
    successLang: string;
    another: string;
    submitting: string;
    submit: string;
    required: string;
    optional: string;
    fields: {
      name: string;
      role: string;
      email: string;
      phone: string;
      company: string;
      website: string;
      description: string;
      focus: string;
      stage: string;
      round: string;
      amount: string;
      use: string;
      investors: string;
      urgency: string;
      urgencyWhy: string;
      privacy: string;
    };
    focusOptions: { value: string; label: string }[];
    stageOptions: { value: string; label: string }[];
    errors: {
      name: string;
      email: string;
      emailInvalid: string;
      company: string;
      description: string;
      focus: string;
      stage: string;
      privacy: string;
      urgency: string;
    };
  };
  footer: {
    tagline: string;
    legal: string;
    privacy: string;
    rights: string;
  };
};
