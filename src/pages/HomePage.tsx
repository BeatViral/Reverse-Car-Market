import { ArrowRight, BadgeCheck, Check, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, DealerMatchCardView } from '../components/MarketplaceCards';
import { Container } from '../components/Section';
import { buyerWantedCards, dealerMatchCards } from '../data/demo';

const steps = [
  ['Post what you want', 'Budget, location, must-haves. One simple Request Card.'],
  ['Sellers reply', 'Dealers and sellers respond only when they have a match.'],
  ['Compare clearly', 'Price, kilometres, warranty, warnings and match score together.'],
];

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-blue" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(47,107,255,0.22)_48%,rgba(47,107,255,0.22)_52%,transparent_52%)]" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber ring-1 ring-white/10">
              <Zap size={14} /> The car market, flipped
            </p>
            <h1 className="mt-6 max-w-4xl text-[3.2rem] font-black leading-[0.9] text-white sm:text-[4.7rem] lg:text-[6.25rem]">
              Post the car you want.
              <span className="mt-2 block text-blue">Let sellers come to you.</span>
            </h1>
            <p className="mt-7 max-w-xl text-xl font-semibold leading-8 text-white/72">
              Tell the market what car you want. Sellers respond with matching cars. You compare the offers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/buyer/create-wanted-card" className="min-h-14 px-7 text-base">
                Post a Car Request <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink to="/search" variant="secondary" className="min-h-14 px-7 text-base">
                Try search
              </ButtonLink>
            </div>
          </div>
          <HeroDemo />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">How it works</p>
            <h2 className="mt-3 text-4xl font-black leading-none text-navy sm:text-6xl">Three moves. No maze.</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {steps.map(([title, text], index) => (
              <div key={title} className="group rounded-xl bg-ice p-6 ring-1 ring-charcoal/10 transition hover:-translate-y-1 hover:bg-navy hover:text-white hover:shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-base font-black text-white group-hover:bg-blue">{index + 1}</span>
                <h3 className="mt-6 text-2xl font-black text-navy group-hover:text-white">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-charcoal/68 group-hover:text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ice py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">The important rule</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] text-navy sm:text-5xl">Buyer cards and dealer cards stay separate.</h2>
              <p className="mt-4 text-base leading-7 text-charcoal/70">
                A Buyer Request Card is real buyer demand. A Dealer Match Card is a clearly labelled dealer prompt from inventory.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <BuyerWantedCardView card={buyerWantedCards[0]} compact action={false} />
              <DealerMatchCardView card={dealerMatchCards[1]} compact action={false} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-navy p-7 text-white shadow-card md:p-10">
            <div className="absolute right-0 top-0 h-full w-2 bg-amber" />
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-amber">For founding dealers</p>
                <h2 className="mt-3 text-4xl font-black leading-[0.95] sm:text-6xl">Turn stock into buyer interest.</h2>
                <p className="mt-4 max-w-2xl text-white/68">
                  Upload inventory. Generate honest "Looking for this?" cards. Capture real buyer intent.
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

      <section className="bg-ice py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">Trust</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] text-navy sm:text-5xl">Built to avoid the usual car-site mess.</h2>
              <p className="mt-4 text-base leading-7 text-charcoal/70">
                Dealer identity is visible. Buyer contact details stay controlled. No scraping. No disguised demand.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Verified dealer labels', 'Buyer contact controls', 'Match-score warnings', 'PPSR and history reminders'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-5 text-lg font-black text-navy shadow-soft ring-1 ring-charcoal/10">
                  <Check className="h-5 w-5 text-green" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl bg-blue p-8 text-center text-white shadow-card md:p-12">
            <h2 className="text-5xl font-black uppercase leading-[0.9] sm:text-7xl">Post it. Match it. Drive it.</h2>
            <p className="mt-5 text-lg font-semibold text-white/78">Reverse Car Market starts with what buyers actually want.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/buyer/create-wanted-card" variant="dark" className="min-h-14 px-7 text-base">Create Request Card</ButtonLink>
              <ButtonLink to="/browse" variant="secondary" className="min-h-14 px-7 text-base">
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
    <div className="relative">
      <div className="rounded-[1.35rem] bg-white/10 p-4 shadow-card ring-1 ring-white/10 sm:p-5 lg:rotate-1">
        <div className="rounded-xl bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-md bg-blue px-3 py-1.5 text-xs font-black uppercase text-white">Buyer Request</span>
            <span className="rounded-md bg-green/10 px-3 py-1.5 text-xs font-black uppercase text-green">Open</span>
          </div>
          <h2 className="mt-5 text-3xl font-black leading-[0.95] text-navy">Toyota Corolla under $20k</h2>
          <p className="mt-3 text-sm font-semibold text-charcoal/62">Gold Coast / Automatic / Service history</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {['Budget', 'Location', 'Timeframe'].map((label) => (
              <div key={label} className="rounded-lg bg-ice p-3">
                <p className="text-[10px] font-black uppercase text-charcoal/45">{label}</p>
                <p className="mt-1 text-sm font-black text-navy">{label === 'Budget' ? '$20k' : label === 'Location' ? 'GC' : 'Now'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto h-8 w-px bg-white/25" />

        <div className="grid gap-3">
          {[
            ['Northern Rivers Auto', '2019 Corolla Ascent Sport', '$19,990', 'Strong Match', 'green'],
            ['Coastline Cars', '2018 Mazda 3 Maxx', '$17,500', 'Good Match', 'blue'],
          ].map(([dealer, car, price, match, tone]) => (
            <div key={car} className="rounded-xl bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-black uppercase text-charcoal/50">{dealer}</p>
                <span className={tone === 'green' ? 'rounded-md bg-green px-2 py-1 text-xs font-black text-white' : 'rounded-md bg-blue px-2 py-1 text-xs font-black text-white'}>
                  {match}
                </span>
              </div>
              <p className="mt-2 text-lg font-black text-navy">{car}</p>
              <p className="mt-1 text-sm font-semibold text-charcoal/72">{price} / 88,000km / Automatic</p>
            </div>
          ))}
        </div>
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
        Clearly labelled dealer prompt. Never a fake Buyer Request Card.
      </p>
    </div>
  );
}
