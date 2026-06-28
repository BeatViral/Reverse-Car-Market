import { useMemo, useState } from 'react';
import { BuyerWantedCardView, DealerMatchCardView } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { buyerWantedCards, dealerMatchCards } from '../data/demo';
import { cx } from '../lib/format';

const tabs = ['Looking for this?', 'Buyers wanted cars', 'Popular searches'] as const;

export function BrowsePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Looking for this?');
  const popular = useMemo(
    () => ['Toyota Corolla under $20k', 'Reliable hatchback under $18k', 'Family SUV under $35k', 'Work ute under $40k', 'Hybrid SUV under $45k'],
    [],
  );

  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          eyebrow="Browse demand-shaped cards"
          title="Browse cards without falling into a listing grid."
          description="Public cards show buyer intent and dealer-created prompts, not endless vehicle listings."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cx('rounded-lg px-4 py-3 text-sm font-black transition', tab === item ? 'bg-blue text-white' : 'bg-white text-charcoal/70 hover:bg-charcoal/5')}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-8">
          {tab === 'Looking for this?' ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {dealerMatchCards.map((card) => (
                <DealerMatchCardView key={card.id} card={card} />
              ))}
            </div>
          ) : null}
          {tab === 'Buyers wanted cars' ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {buyerWantedCards
                .filter((card) => card.publicVisibility)
                .map((card) => (
                  <BuyerWantedCardView key={card.id} card={card} />
                ))}
            </div>
          ) : null}
          {tab === 'Popular searches' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popular.map((search) => (
                <a key={search} href={`/search?q=${encodeURIComponent(search)}`} className="rounded-lg bg-white p-5 text-lg font-black text-navy shadow-soft ring-1 ring-charcoal/10 hover:text-blue">
                  {search}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
