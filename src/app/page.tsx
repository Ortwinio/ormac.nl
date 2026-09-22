import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const signals = [
  { label: "Stage", value: "Pre-seed & seed" },
  { label: "Focus", value: "AI-native SaaS" },
  { label: "Geography", value: "Europe first" },
  { label: "Role", value: "Cheque and operator" },
];

const approach = [
  {
    step: "01",
    title: "A clear thesis, applied quickly",
    body: "We look for AI-native and innovation-driven software with a sharp customer, a credible path to repeatable revenue, and a team that wants a partner rather than a passenger.",
  },
  {
    step: "02",
    title: "Diligence that respects your time",
    body: "Market, product, unit economics, and team — in that order. We move fast, ask precise questions, and tell you where we stand. No theatre, no 40-page process for a first cheque.",
  },
  {
    step: "03",
    title: "Founder-friendly terms",
    body: "Structures that keep incentives aligned. We would rather be useful than clever, and we would rather remain in the room after the wire than vanish into a portfolio dashboard.",
  },
  {
    step: "04",
    title: "Work after the close",
    body: "Go-to-market, pricing, partnerships, fundraising narrative, and governance. The same operator muscle that built and exited an agency group of 80+ people.",
  },
];

const criteria = [
  {
    title: "Software with leverage",
    body: "SaaS or AI-native products that can compound: clear ICP, defensible workflow, and a reason the next ten customers look like the first ten.",
  },
  {
    title: "Measured impact",
    body: "We prefer companies whose value is visible in the customer’s numbers — time saved, revenue unlocked, risk reduced — not only in a pitch deck.",
  },
  {
    title: "Teams we can actually help",
    body: "Founders who want a sparring partner on commercial motion. If you only need capital, there are larger funds. If you want a working investor, start here.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="A modern glass building along a Dutch canal at dusk, lights reflecting on still water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1524] via-[#0c1524]/55 to-[#0c1524]/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <p className="text-[0.72rem] tracking-[0.28em] text-[var(--gold)] uppercase">
            Early-stage investing · The Netherlands
          </p>
          <h1 className="font-heading mt-5 max-w-3xl text-[2.35rem] leading-[1.12] text-white sm:text-6xl sm:leading-[1.08]">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {site.description} We stay close through go-to-market, partnerships,
            and governance.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              variant="gold"
              size="lg"
              className="h-11 rounded-full px-6"
            >
              Start a conversation
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/#approach" />}
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              How we work
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0c1524]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {signals.map((item) => (
            <div key={item.label} className="px-5 py-6 sm:px-8 sm:py-8">
              <p className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-white sm:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-28">
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
              The practice
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              A small cheque, a long conversation.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Ormac is not a large fund with a 10-year clock and a 200-page
              memo. It is a boutique, operator-led practice: first cheques at
              pre-seed and seed, written by someone who has built, scaled, and
              exited software-adjacent businesses.
            </p>
            <p>
              We invest where product, market, and founder judgement meet —
              typically AI-native or deeply innovation-driven SaaS with a
              European centre of gravity. The work after the investment is the
              point: GTM architecture, pricing, partnerships, and the
              unglamorous hygiene that makes a board useful.
            </p>
            <blockquote className="border-l-2 border-[var(--gold)] pl-5 text-foreground">
              If the company is early, the investor should be useful. Capital
              without commercial help is just a slower no.
            </blockquote>
          </div>
        </div>
      </section>

      <section id="approach" className="scroll-mt-24 bg-[#f3eee4]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
            Approach
          </p>
          <h2 className="font-heading mt-4 max-w-xl text-3xl leading-tight tracking-tight sm:text-4xl">
            How a conversation with Ormac actually goes.
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {approach.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-border/70 bg-background p-6 sm:p-8"
              >
                <p className="text-[0.7rem] tracking-[0.22em] text-[var(--gold-ink)] uppercase">
                  {item.step}
                </p>
                <h3 className="font-heading mt-3 text-xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase">
            Fit
          </p>
          <h2 className="font-heading mt-4 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
            What we look for — and what we do not pretend to be.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {criteria.map((item) => (
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

      <section className="bg-[#0c1524] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <div className="max-w-xl">
            <p className="text-[0.72rem] tracking-[0.22em] text-[var(--gold)] uppercase">
              Introductions
            </p>
            <h2 className="font-heading mt-4 text-3xl leading-tight sm:text-4xl">
              Building something we should see?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              Send a short note. If there is a fit we will reply with a time.
              If there is not, we will say so plainly.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            variant="gold"
            size="lg"
            className="h-11 rounded-full px-6"
          >
            Write to Ormac
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </>
  );
}
