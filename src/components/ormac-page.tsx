import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function OrmacPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale);

  return (
    <>
      <section
        id="home"
        className="relative isolate flex min-h-[100svh] items-end overflow-hidden scroll-mt-24"
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123C39] via-[#123C39]/70 to-[#123C39]/25" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <p className="text-[0.72rem] tracking-[0.28em] text-[var(--gold-light,#E2C27F)] uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-heading mt-5 max-w-3xl text-[2.35rem] leading-[1.12] text-white sm:text-6xl sm:leading-[1.08]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t.hero.lead}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {t.hero.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              nativeButton={false}
              render={<Link href={`${home}#contact`} />}
              variant="gold"
              size="lg"
              className="h-11 rounded-full px-6"
            >
              {t.ctaPlan}
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={`${home}#approach`} />}
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              {t.ctaApproach}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#123C39]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {t.stats.map((item) => (
            <div key={item.value} className="px-5 py-6 sm:px-8 sm:py-8">
              <p className="font-heading text-lg text-white sm:text-xl">{item.value}</p>
              <p className="mt-2 text-sm text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          {t.difference.items.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
              <p className="text-[0.7rem] tracking-[0.22em] text-[var(--gold-ink)] uppercase">
                {t.difference.eyebrow} 0{index + 1}
              </p>
              <h2 className="font-heading mt-3 text-2xl tracking-tight sm:text-3xl">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f3ef]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
            {t.offer.eyebrow}
          </p>
          <h2 className="font-heading mt-4 max-w-xl text-3xl leading-tight tracking-tight sm:text-4xl">
            {t.offer.title}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t.offer.items.map((item) => (
              <article key={item.title} className="border-t border-border pt-6">
                <h3 className="font-heading text-xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-28">
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
              {t.focus.eyebrow}
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t.focus.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.focus.body}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.focus.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/marketing-media.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#123C39] text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <p className="text-[0.72rem] tracking-[0.22em] text-[var(--gold)] uppercase">
            {t.stages.eyebrow}
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl">
            {t.stages.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            {t.stages.body}
          </p>
          <Button
            nativeButton={false}
            render={<Link href={`${home}#founders`} />}
            variant="gold"
            size="lg"
            className="mt-8 h-11 rounded-full px-6"
          >
            {t.ctaApproach}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
            {t.track.eyebrow}
          </p>
          <h2 className="font-heading mt-4 text-2xl tracking-tight sm:text-3xl">
            {t.track.title}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {t.track.logos.map((name) => (
              <span
                key={name}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f3ef]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
              {t.closing.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.closing.body}
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href={`${home}#contact`} />}
            size="lg"
            className="h-11 rounded-full px-6"
          >
            {t.ctaPlan}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section id="founders" className="scroll-mt-24 bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
            {t.founders.eyebrow}
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-3xl leading-tight tracking-tight sm:text-4xl">
            {t.founders.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.founders.intro}
          </p>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.founders.criteriaTitle}
          </h3>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {t.founders.criteria.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8"
              >
                <p className="text-[0.7rem] tracking-[0.22em] text-[var(--gold-ink)] uppercase">
                  0{index + 1}
                </p>
                <h4 className="font-heading mt-3 text-xl tracking-tight">{item.title}</h4>
                <p className="mt-2 text-sm italic text-foreground/80">{item.question}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl tracking-tight">
                {t.founders.notYetTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.founders.notYet}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl tracking-tight">
                {t.founders.notInTitle}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {t.founders.notIn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="font-heading mt-16 text-2xl tracking-tight">
            {t.founders.howTitle}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.founders.howIntro}
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {t.founders.rounds.map((round) => (
              <article
                key={round.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h4 className="font-heading text-xl tracking-tight">{round.title}</h4>
                <p className="mt-2 text-sm italic text-foreground/80">{round.stage}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {round.body}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium">{t.founders.max}</p>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.founders.togetherTitle}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.founders.together}
          </p>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.founders.getTitle}
          </h3>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {t.founders.get.map((item) => (
              <li
                key={item}
                className="border-l-2 border-[var(--gold)] pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-foreground">{t.founders.free}</p>
        </div>
      </section>

      <section id="approach" className="scroll-mt-24 bg-[#f2f3ef]">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-28">
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
              {t.approach.eyebrow}
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t.approach.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.approach.intro}
            </p>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-3xl lg:block">
              <Image
                src="/images/bridge.jpg"
                alt=""
                fill
                sizes="28rem"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl tracking-tight">
              {t.approach.stepsTitle}
            </h3>
            <ol className="mt-6 space-y-5">
              {t.approach.steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-[0.7rem] tracking-[0.22em] text-[var(--gold-ink)] uppercase">
                    0{index + 1}
                  </p>
                  <h4 className="font-heading mt-2 text-lg tracking-tight">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-3 lg:pb-28">
          <article>
            <h3 className="font-heading text-xl tracking-tight">{t.approach.boardTitle}</h3>
            {t.approach.board.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </article>
          <article>
            <h3 className="font-heading text-xl tracking-tight">{t.approach.gtmTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.approach.gtm}
            </p>
          </article>
          <article>
            <h3 className="font-heading text-xl tracking-tight">{t.approach.afterTitle}</h3>
            {t.approach.after.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <h3 className="font-heading mt-8 text-xl tracking-tight">
              {t.approach.exitTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.approach.exit}
            </p>
          </article>
        </div>
      </section>

      <section id="network" className="scroll-mt-24 bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
                {t.network.eyebrow}
              </p>
              <h2 className="font-heading mt-4 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
                {t.network.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t.network.intro}
              </p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl">
              <Image
                src="/images/advisory-board.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.network.areasTitle}
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {t.network.areas.map((area) => (
              <article key={area.title} className="border-t border-border pt-4">
                <h4 className="font-heading text-base tracking-tight">{area.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {area.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <article>
              <h3 className="font-heading text-xl tracking-tight">{t.network.howTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.network.how}
              </p>
            </article>
            <article>
              <h3 className="font-heading text-xl tracking-tight">{t.network.coTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.network.co}
              </p>
            </article>
            <article>
              <h3 className="font-heading text-xl tracking-tight">{t.network.ecoTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.network.eco}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="portfolio" className="scroll-mt-24 bg-[#f2f3ef]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
            {t.portfolio.eyebrow}
          </p>
          <h2 className="font-heading mt-4 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
            {t.portfolio.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.portfolio.intro}
          </p>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.portfolio.activeTitle}
          </h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {t.portfolio.active.map((item) => (
              <article key={item.name} className="rounded-2xl border border-border bg-card p-6">
                <h4 className="font-heading text-xl tracking-tight">{item.name}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.portfolio.exitsTitle}
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.portfolio.exits.map((item) => (
              <article key={item.name} className="border-t border-border pt-5">
                <h4 className="font-heading text-lg tracking-tight">{item.name}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <h3 className="font-heading mt-14 text-2xl tracking-tight">
            {t.portfolio.failedTitle}
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {t.portfolio.failed.map((item) => (
              <article key={item.name} className="rounded-2xl border border-border bg-card p-6">
                <h4 className="font-heading text-lg tracking-tight">{item.name}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <blockquote className="mt-10 border-l-2 border-[var(--gold)] pl-5 text-foreground">
            {t.portfolio.learned}
          </blockquote>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-background">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.8fr)] lg:py-28">
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
              {t.about.eyebrow}
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.about.intro}
            </p>
            <h3 className="font-heading mt-10 text-xl tracking-tight">
              {t.about.missionTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t.about.mission}
            </p>
            <h3 className="font-heading mt-10 text-xl tracking-tight">
              {t.about.standTitle}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {t.about.stand.map((item) => (
                <article key={item.title}>
                  <h4 className="font-heading text-lg tracking-tight">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
            <h3 className="font-heading mt-12 text-xl tracking-tight">
              {t.about.togetherTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t.about.together}
            </p>
            <h3 className="font-heading mt-10 text-xl tracking-tight">
              {t.about.whereTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t.about.where}
            </p>
          </div>
          <aside className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="relative mx-auto aspect-[13/15] w-full max-w-xs overflow-hidden rounded-2xl bg-[#ece8dc]">
              <Image
                src="/images/ortwin-verreck.jpg"
                alt={t.about.founderName}
                fill
                sizes="20rem"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-6 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
              {t.about.founderTitle}
            </p>
            <h3 className="font-heading mt-2 text-2xl tracking-tight">
              {t.about.founderName}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.about.founderRole}</p>
            {t.about.founder.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <a
              href={site.linkedin}
              className="mt-5 inline-flex text-sm underline underline-offset-4"
              rel="noreferrer"
              target="_blank"
            >
              {t.about.linkedin}
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-[#f2f3ef]">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
          <h2 className="font-heading text-3xl tracking-tight">{t.faq.title}</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {t.faq.items.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="text-[var(--gold-ink)] group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-16 lg:py-28">
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
              {t.contact.eyebrow}
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.contact.intro}
            </p>
            <p className="mt-3 mb-8 text-sm text-muted-foreground">{t.contact.need}</p>
            <ContactForm locale={locale} />
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-[#f2f3ef] p-6 sm:p-8">
            <h3 className="font-heading text-xl tracking-tight">
              {t.contact.confidentialTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.contact.confidential}
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                  Email
                </dt>
                <dd className="mt-1">
                  <a className="hover:underline" href={`mailto:${site.email}`}>
                    {t.contact.general}
                  </a>
                </dd>
                <dd className="mt-1">
                  <a className="hover:underline" href={`mailto:${site.planEmail}`}>
                    {t.contact.plans}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                  LinkedIn
                </dt>
                <dd className="mt-1">
                  <a
                    className="hover:underline"
                    href={site.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    linkedin.com/in/ortwinverreck
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
