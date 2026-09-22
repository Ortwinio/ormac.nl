export const site = {
  name: "Ormac",
  legalName: "Ormac B.V.",
  domain: "ormac.nl",
  tagline: "Patient capital for founders building what comes next.",
  description:
    "Boutique early-stage investor based in the Netherlands. We back AI-native and innovation-driven SaaS companies at pre-seed and seed.",
  email: "hello@ormac.nl",
  phone: "+31 73 522 0388",
  kvk: "17148427",
  vat: "NL811307694B01",
  address: {
    street: "Sportlaan 59",
    postalCode: "5242 CP",
    city: "Rosmalen",
    country: "The Netherlands",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/#approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;
