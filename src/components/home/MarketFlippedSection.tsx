import { ArrowRight } from 'lucide-react';
import { Container } from '../Section';

const oldWay = ['Sellers list', 'Buyers scroll', 'Buyers chase'];
const reverseWay = ['Buyers post', 'Sellers respond', 'Buyers compare'];

export function MarketFlippedSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">The market flipped</p>
          <h2 className="mt-3 text-4xl font-black leading-[0.98] text-navy sm:text-6xl">The car market has always worked one way. We flipped it.</h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <MarketPanel label="Old way" items={oldWay} tone="old" />
          <div className="hidden items-center justify-center lg:flex">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white shadow-card">
              <ArrowRight size={28} />
            </span>
          </div>
          <MarketPanel label="Reverse way" items={reverseWay} tone="reverse" />
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 rounded-xl bg-ice p-5 text-center text-sm font-black text-navy ring-1 ring-charcoal/10 sm:grid-cols-2">
          <p>Normal car sites: Sellers list. Buyers search.</p>
          <p>Reverse Car Market: Buyers post what they want. Sellers respond.</p>
        </div>
      </Container>
    </section>
  );
}

function MarketPanel({ label, items, tone }: { label: string; items: string[]; tone: 'old' | 'reverse' }) {
  const isReverse = tone === 'reverse';

  return (
    <div className={isReverse ? 'rounded-2xl bg-navy p-6 text-white shadow-card' : 'rounded-2xl bg-ice p-6 text-navy ring-1 ring-charcoal/10'}>
      <p className={isReverse ? 'text-sm font-black uppercase tracking-[0.18em] text-amber' : 'text-sm font-black uppercase tracking-[0.18em] text-charcoal/45'}>{label}</p>
      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <div key={item} className={isReverse ? 'flex items-center gap-4 rounded-xl bg-white/10 p-4' : 'flex items-center gap-4 rounded-xl bg-white p-4 shadow-soft'}>
            <span className={isReverse ? 'flex h-10 w-10 items-center justify-center rounded-lg bg-blue text-sm font-black text-white' : 'flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal/10 text-sm font-black text-charcoal/70'}>
              {index + 1}
            </span>
            <p className="text-2xl font-black">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
