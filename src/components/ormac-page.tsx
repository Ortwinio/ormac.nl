import { ScrollBlock } from "@/components/scroll-block";
import Image from "next/image";
import { SectionLink as Link } from "@/components/section-link";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GrowthRoute } from "@/components/growth-route";
import { copy } from "@/lib/copy";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import s from "./ormac.module.css";

const domainImages = ["health", "learning", "marketing", "business"];
const roundNames = ["Seed", "Early growth", "Scale-up"];
const roundAmounts = ["€25k – €50k", "€50k – €100k", "€50k – €100k"];
const portfolioMarks = ["WisePIM", "ActARion", "Four Oaks"];

export function OrmacPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale);
  const nl = locale === "nl";
  const timing = nl ? ["1–2 weken", "ongeveer 1 week", "2–4 weken", "", ""] : ["1–2 weeks", "about 1 week", "2–4 weeks", "", ""];
  const statValues = ["2002", nl ? "€1,15m" : "€1.15m", "6", "80+"];
  const statLabels = [t.stats[0].label, t.stats[1].label, nl ? "succesvolle exits" : "successful exits", nl ? "experts in ons netwerk" : "experts in our network"];
  const planLink = `${home}#contact`;

  return (
    <>
      <ScrollBlock id="home">
        <section className={`${s.wrap} ${s.hero}`}>
          <div>
            <p className={s.eyebrow}>{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className={s.heroLead}>{t.hero.lead}</p>
            <p className={s.heroIntro}>{t.hero.body}</p>
            <div className={s.ctas}>
              <Link href={planLink} className={s.button}>{t.ctaPlan}</Link>
              <Link href={`${home}#stages`} className={`${s.button} ${s.outline}`}>{t.ctaApproach}</Link>
            </div>
            <p className={s.heroNote}>{t.hero.note}</p>
          </div>
          <GrowthRoute locale={locale} />
        </section>
      </ScrollBlock>

      <ScrollBlock>
        <div className={s.wrap}>
          <section className={s.stats} aria-label={nl ? "Ormac in cijfers" : "Ormac in numbers"}>
            {statValues.map((value, index) => <div key={value}><strong>{value}</strong><span>{statLabels[index]}</span></div>)}
          </section>
        </div>
      </ScrollBlock>

      <ScrollBlock>
        <section className={`${s.wrap} ${s.block}`}>
          <h2 className={s.sectionTitle}>{t.difference.title}</h2>
          <div className={s.usp}>
            {t.difference.items.map((item, index) => (
              <article key={item.title} className={`${s.uspCard} ${index === 0 ? s.darkCard : ""}`}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {index === 0 ? <><circle cx="22" cy="22" r="18" /><path d="M14 26l6-6 5 4 7-9M28 15h4v4" /></> : <path d="M6 36L18 24l8 6 12-18M30 12h8v8M6 40h32" />}
                </svg>
                <h3>{item.title}</h3><p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="founders">
        <section className={`${s.wrap} ${s.block} ${s.offer}`}>
          <h2 className={s.sectionTitle}>{t.offer.title}</h2>
          <div className={s.four}>
            {t.offer.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
          <div className={`${s.splitHead} ${s.sectionGap}`}>
            <h2 className={s.sectionTitle}>{t.focus.title}</h2><p className={s.lead}>{t.focus.body}</p>
          </div>
          <div className={s.domains}>
            {t.focus.areas.map((area, index) => <figure key={area}>
              <Image src={`/images/${domainImages[index]}.webp`} alt="" width={800} height={800} sizes="(max-width: 820px) 45vw, 22vw" />
              <figcaption>{area}</figcaption>
            </figure>)}
          </div>
          <div className={`${s.splitHead} ${s.sectionGap}`}>
            <h2 className={s.sectionTitle}>{t.founders.title}</h2><p className={s.lead}>{t.founders.intro}</p>
          </div>
          <ol className={s.criteria}>
            {t.founders.criteria.map((item, index) => <li className={s.criterion} key={item.title}>
              <span className={s.number}>{index + 1}</span><h3>{item.title}</h3>
              <p className={s.question}>{item.question}</p><p>{item.body}</p>
            </li>)}
          </ol>
          <div className={s.twoNotes}>
            <article><h3>{t.founders.notYetTitle}</h3><p>{t.founders.notYet}</p></article>
            <article><h3>{t.founders.notInTitle}</h3><ul>{t.founders.notIn.map(item => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="stages">
        <section className={`${s.surface} ${s.block}`}>
          <div className={s.wrap}>
            <div className={s.splitHead}><h2 className={s.sectionTitle}>{t.founders.howTitle}</h2><p className={s.lead}>{t.founders.howIntro}</p></div>
            <div className={s.phases}>
              {t.founders.rounds.map((round, index) => <article className={s.phase} key={round.title}>
                <span className={s.dot}>{index + 1}</span><h3>{roundNames[index]}</h3><p className={s.amount}>{roundAmounts[index]}</p>
                <p>{round.body}</p><p className={s.condition}>{round.stage}</p>
              </article>)}
            </div>
            <div className={s.strip}>
              <div><strong>{nl ? "Maximaal €250.000 per deelneming" : "Up to €250,000 per company"}</strong><p>{t.founders.free}</p></div>
              <Link href={planLink} className={`${s.button} ${s.gold}`}>{t.ctaPlan}</Link>
            </div>
            <p className={s.together}><strong>{t.founders.togetherTitle}. </strong>{t.founders.together}</p>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="approach">
        <section className={`${s.wrap} ${s.block}`}>
          <h2 className={s.sectionTitle}>{t.approach.title}</h2>
          <ol className={s.steps}>
            {t.approach.steps.map((step, index) => <li key={step.title}>
              <span className={s.number}>{index + 1}{timing[index] && ` · ${timing[index]}`}</span>
              <h3>{step.title.replace(/\s*\([^)]*\)\s*$/, "")}</h3><p>{step.body}</p>
            </li>)}
          </ol>
          <div className={s.advisory}>
            <Image src="/images/advisory.webp" width={1100} height={734} sizes="(max-width: 820px) 90vw, 45vw" alt={nl ? "Pentekening van een team in overleg" : "Pen drawing of a team in discussion"} />
            <div className={s.textStack}><h2 className={s.sectionTitle}>{t.approach.boardTitle}</h2><p>{t.approach.board[0]}</p><blockquote className={s.boardQuote}>{t.approach.boardQuote}</blockquote><p>{t.approach.board[1]}</p></div>
          </div>
          <div className={s.gtm}>
            <h2 className={s.sectionTitle}>{t.approach.gtmTitle}</h2>
            <div className={s.textStack}><p>{t.approach.gtm}</p>{t.approach.after.map(p => <p key={p}>{p}</p>)}</div>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="network">
        <section className={`${s.network} ${s.block}`}>
          <div className={`${s.wrap} ${s.networkGrid}`}>
            <div className={s.textStack}><span className={s.networkNumber}>80+</span><h2 className={s.sectionTitle}>{t.network.title}</h2><p>{t.network.intro}</p><p>{t.network.how}</p></div>
            <div><h3>{t.network.areasTitle}</h3><ul className={s.chips}>{t.network.areas.map(area => <li key={area.title}>{area.title}</li>)}</ul>
            </div>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="portfolio">
        <section className={`${s.wrap} ${s.block}`}>
          <div className={s.splitHead}><h2 className={s.sectionTitle}>{t.portfolio.title}</h2><p className={s.lead}>{t.portfolio.intro}</p></div>
          <h3 className={s.subhead}>{t.portfolio.activeTitle}</h3>
          <div className={s.active}>{t.portfolio.active.map((item, index) => <article key={item.name}><div className={s.logoTile} aria-hidden="true">{portfolioMarks[index]}</div><h4>{item.name}</h4><p>{item.body}</p></article>)}</div>
          <div className={s.portfolioSubhead}><h3>{t.portfolio.exitsTitle}</h3><span>{nl ? "Logo’s van eerdere deelnemingen" : "Logos of previous investments"}</span></div>
          <ul className={s.exits}>{t.portfolio.exits.map(item => <li key={item.name}><b>{item.name}</b><span className={s.pill}>Exit</span></li>)}</ul>
          <div className={s.exitDescriptions}>{t.portfolio.exits.map(item => <p key={item.name}><b>{item.name}</b> – {item.body}</p>)}</div>
          <div className={s.failed}>
            {t.portfolio.failed.map(item => <article key={item.name}><h4>{item.name}</h4><p>{item.body}</p></article>)}
            <blockquote className={s.lesson}>{t.portfolio.learned}</blockquote>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="about">
        <section className={`${s.surface} ${s.block}`}>
          <div className={`${s.wrap} ${s.about}`}>
            <Image className={s.portrait} src="/images/ortwin-verreck.webp" alt={t.about.founderName} width={1040} height={1200} sizes="(max-width: 820px) 90vw, 40vw" />
            <div className={s.textStack}>
              <h2 className={s.sectionTitle}>{t.about.title}</h2><p>{t.about.intro}</p>
              <div className={s.bio}><h3>{t.about.founderName}, {t.about.founderRole}</h3>{t.about.founder.map(p => <p key={p}>{p}</p>)}</div>
              <div className={s.values}>{t.about.stand.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.body}</p></article>)}</div>
              <p>{t.about.together}</p>
            </div>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="contact">
        <section className={`${s.wrap} ${s.block} ${s.plan}`}>
          <div className={`${s.textStack} ${s.planIntro}`}>
            <h2 className={s.sectionTitle}>{t.contact.title}</h2><p>{t.contact.intro}</p><h3>{t.contact.needTitle}</h3>
            <ul className={s.checks}>{t.contact.needs.map(need => <li key={need}><Check size={20} strokeWidth={2} aria-hidden="true" />{need}</li>)}</ul>
            <p className={s.heroNote}>{t.contact.confidential}</p>
          </div>
          <ContactForm locale={locale} />
        </section>
      </ScrollBlock>

      <ScrollBlock id="faq">
        <section className={`${s.surface} ${s.block}`}>
          <div className={`${s.wrap} ${s.faq}`}>
            <h2 className={s.sectionTitle}>{t.faq.title}</h2>
            <div className={s.faqItems}>{t.faq.items.map((item, index) => <details key={item.q} open={index === 0}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
          </div>
        </section>
      </ScrollBlock>

      <ScrollBlock id="contact-details">
        <section className={`${s.wrap} ${s.block} ${s.contact}`}>
          <div className={s.textStack}><h2 className={s.sectionTitle}>Contact</h2><p>{nl ? "Heb je een vraag die niet in onze veelgestelde vragen staat? Of wil je eerst verkennen of Ormac bij je past voordat je een plan indient? Neem gerust contact op. We spreken je graag op een locatie bij jou in de buurt." : "Have a question that is not covered in our FAQ? Or would you like to explore whether Ormac is a good fit before submitting a plan? Feel free to get in touch. We are happy to meet you at a location near you."}</p></div>
          <dl className={s.contactLinks}>
            <dt>{nl ? "Plannen indienen" : "Submitting plans"}</dt><dd><Link href={planLink}>{nl ? "Via het formulier" : "Use the form"}</Link></dd>
            <dt>{nl ? "Vragen via LinkedIn" : "Questions via LinkedIn"}</dt><dd><a href={site.linkedin} target="_blank" rel="noreferrer">Ortwin Verreck</a></dd>
          </dl>
        </section>
      </ScrollBlock>
    </>
  );
}
