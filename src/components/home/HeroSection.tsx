import { ArrowRight, Zap } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Container } from '../Section';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-blue" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(47,107,255,0.22)_48%,rgba(47,107,255,0.22)_52%,transparent_52%)]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber ring-1 ring-white/10">
            <Zap size={14} /> The market flipped
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.8rem] font-black leading-[0.92] text-white sm:text-[4.1rem] lg:text-[5.45rem]">
            Post the car you want.
            <span className="mt-2 block text-blue">Let sellers come to you.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-white/72">
            Tell us what car you want, your budget and where you're buying. Verified sellers respond with matching cars.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/buyer/create-wanted-card" className="min-h-14 px-7 text-base">
              Post the Car You Want <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink to="/how-it-works" variant="secondary" className="min-h-14 px-7 text-base">
              See How It Works
            </ButtonLink>
          </div>
        </div>
        <HeroDemo />
      </Container>
    </section>
  );
}

function HeroDemo() {
  return (
    <div className="relative">
      <div className="rounded-[1.35rem] bg-white/10 p-4 shadow-card ring-1 ring-white/10 sm:p-5 lg:rotate-1">
        <div className="rounded-xl bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-md bg-blue px-3 py-1.5 text-xs font-black uppercase text-white">READY TO BUY</span>
            <span className="rounded-md bg-green/10 px-3 py-1.5 text-xs font-black uppercase text-green">Open</span>
          </div>
          <h2 className="mt-5 text-2xl font-black leading-[1.02] text-navy sm:text-3xl">Toyota Corolla under $20k</h2>
          <p className="mt-3 text-sm font-semibold text-charcoal/62">Buyer is ready this month near Gold Coast.</p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ['Budget', '$20k'],
              ['Location', 'Gold Coast'],
              ['Timeframe', 'Now'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-ice p-3">
                <p className="text-[10px] font-black uppercase text-charcoal/45">{label}</p>
                <p className="mt-1 text-sm font-black text-navy">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Auto', '120,000km max'].map((item) => (
              <span key={item} className="rounded-md bg-charcoal/5 px-2.5 py-1 text-xs font-black text-charcoal/75">
                {item}
              </span>
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
