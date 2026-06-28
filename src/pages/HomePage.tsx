import { ArrowRight, BadgeCheck, Check, CircleDollarSign, Clock, MessageSquare, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, DealerMatchCardView } from '../components/MarketplaceCards';
import { Container } from '../components/Section';
import { buyerWantedCards, dealerMatchCards } from '../data/demo';

const steps = [
  ['Post what you want', 'Budget, location, must-haves. One simple Wanted Card.'],
  ['Sellers reply', 'Dealers and sellers respond only when they have a match.'],
  ['Compare clearly', 'Price, kilometres, warranty, warnings and match score together.'],
];

const promises = [
  ['No endless scrolling', Search],
  ['No fake buyer demand', ShieldCheck],
  ['Free for buyers', CircleDollarSign],
  ['Control your contact details', Clock],
];

export function HomePage() {
  return (
    <>
      <section className="bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="inline-flex rounded-md bg-blue/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue">
              The car market, flipped
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] text-navy sm:text-6xl lg:text-7xl">
              Tell sellers what car you want.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-charcoal/70">
              Post a Wanted Card once. Matching dealers and sellers come to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/buyer/create-wanted-card">
                Post a Car Wanted <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink to="/search" variant="secondary">
                Try search
              </ButtonLink>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
              {promises.map(([label, Icon]) => {
                const IconComponent = Icon as typeof Search;
                return (
                  <div key={label as string} className="flex items-center gap-2 rounded-lg bg-white px-3 py-3 text-sm font-bold text-charcoal/70 shadow-soft ring-1 ring-charcoal/10">
                    <IconComponent className="h-4 w-4 text-blue" />
                    {label as string}
                  </div>
                );
              })}
            </div>
          </div>
          <HeroDemo />
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue">How it works</p>
            <h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">Three moves. No maze.</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {steps.map(([title, text], index) => (
              <div key={title} className="rounded-lg bg-ice p-5 ring-1 ring-charcoal/10">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-sm font-black text-white">{index + 1}</span>
                <h3 className="mt-5 text-xl font-black text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal/68">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ice py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue">The important rule</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-4xl">Buyer cards and dealer cards stay separate.</h2>
              <p className="mt-4 text-base leading-7 text-charcoal/70">
                A Buyer Wanted Card is real buyer demand. A Dealer Match Card is a clearly labelled dealer prompt from inventory.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <BuyerWantedCardView card={buyerWantedCards[0]} compact action={false} />
              <DealerMatchCardView card={dealerMatchCards[1]} compact action={false} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="rounded-lg bg-navy p-7 text-white shadow-card md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber">For founding dealers</p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Turn stock into buyer interest without pretending to be buyers.</h2>
                <p className="mt-4 max-w-2xl text-white/68">
                  Upload your inventory. We generate honest "Looking for this?" cards. Buyers raise their hand, then a real lead is created.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink to="/dealers/founding" variant="secondary">
                    Join free pilot
                  </ButtonLink>
                  <ButtonLink to="/dealers" variant="ghost" className="text-white hover:bg-white/10">
                    Dealer tools
                  </ButtonLink>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 text-navy">
                <DealerMiniFlow />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ice py-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue">Trust</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-4xl">Built to avoid the usual car-site mess.</h2>
              <p className="mt-4 text-base leading-7 text-charcoal/70">
                Dealer identity is visible. Buyer contact details stay controlled. No scraping. No disguised demand.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Verified dealer labels', 'Buyer contact controls', 'Match-score warnings', 'PPSR and history reminders'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-4 font-bold text-navy shadow-soft ring-1 ring-charcoal/10">
                  <Check className="h-5 w-5 text-green" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black text-navy sm:text-5xl">Post the car you want.</h2>
            <p className="mt-4 text-lg text-charcoal/68">Let sellers come to you.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/buyer/create-wanted-card">Create Wanted Card</ButtonLink>
              <ButtonLink to="/browse" variant="secondary">
                Browse Match Cards
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroDemo() {
  return (
    <div className="rounded-[1.25rem] bg-navy p-4 shadow-card sm:p-5">
      <div className="rounded-lg bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-md bg-blue/10 px-3 py-1 text-xs font-black uppercase text-blue">Buyer Wanted</span>
          <span className="rounded-md bg-green/10 px-3 py-1 text-xs font-black uppercase text-green">Open</span>
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight text-navy">Wanted: Toyota Corolla under $20k</h2>
        <p className="mt-2 text-sm text-charcoal/60">Gold Coast. Automatic. Service history preferred.</p>
      </div>

      <div className="mx-auto h-8 w-px bg-white/25" />

      <div className="grid gap-3">
        {[
          ['Northern Rivers Auto', '2019 Corolla Ascent Sport', '$19,990', 'Strong Match', 'green'],
          ['Coastline Cars', '2018 Mazda 3 Maxx', '$17,500', 'Good Match', 'blue'],
        ].map(([dealer, car, price, match, tone]) => (
          <div key={car} className="rounded-lg bg-white/96 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-black uppercase text-charcoal/45">{dealer}</p>
              <span className={tone === 'green' ? 'rounded-md bg-green/10 px-2 py-1 text-xs font-black text-green' : 'rounded-md bg-blue/10 px-2 py-1 text-xs font-black text-blue'}>
                {match}
              </span>
            </div>
            <p className="mt-2 font-black text-navy">{car}</p>
            <p className="mt-1 text-sm text-charcoal/62">{price} / 88,000km / Automatic</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DealerMiniFlow() {
  return (
    <div className="grid gap-3">
      {[
        [BadgeCheck, 'Dealer uploads stock'],
        [Sparkles, 'Match Cards are generated'],
        [MessageSquare, 'Buyer raises their hand'],
      ].map(([Icon, label]) => {
        const IconComponent = Icon as typeof BadgeCheck;
        return (
          <div key={label as string} className="flex items-center gap-3 rounded-lg bg-ice p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber/20 text-[#8a5a00]">
              <IconComponent size={18} />
            </span>
            <p className="font-black text-navy">{label as string}</p>
          </div>
        );
      })}
      <p className="rounded-lg bg-amber/10 p-3 text-sm font-semibold leading-6 text-charcoal/72">
        Clearly labelled dealer prompt. Never a fake Buyer Wanted Card.
      </p>
    </div>
  );
}
