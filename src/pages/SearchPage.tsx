import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, DealerMatchCardView } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { formatCurrency } from '../lib/format';
import { searchMarketplace } from '../lib/mockAi';

export function SearchPage() {
  const [params] = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => (query.trim() ? searchMarketplace(query) : undefined), [query]);

  return (
    <section className="section-pad bg-white">
      <Container>
        <SectionHeader
          eyebrow="Buyer-facing search"
          title="What car are you looking for?"
          description="Search converts intent into demand. If there is no match, create a Buyer Wanted Card and let sellers come to you."
        />
        <div className="mt-8 rounded-lg bg-ice p-4 shadow-soft ring-1 ring-charcoal/10">
          <label className="grid gap-2 text-sm font-black text-navy">
            What car are you looking for?
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-12 flex-1 rounded-lg border border-charcoal/15 bg-white px-4 text-base font-normal text-charcoal"
                placeholder="Toyota Corolla under $20k, family SUV under $35k, first car under $15k..."
              />
              <button type="button" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue px-5 font-bold text-white">
                <Search size={18} /> Search
              </button>
            </div>
          </label>
        </div>

        {results ? (
          <div className="mt-8 grid gap-6">
            <div className="rounded-lg bg-navy p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/55">Parsed intent</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  results.intent.make,
                  results.intent.model,
                  results.intent.bodyType,
                  results.intent.fuelType,
                  results.intent.budgetMax ? `Under ${formatCurrency(results.intent.budgetMax, true)}` : undefined,
                  results.intent.location,
                  results.intent.useCase,
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <span key={item} className="rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-white/80">
                      {item}
                    </span>
                  ))}
              </div>
            </div>

            {results.dealerMatches.length || results.wantedCards.length ? (
              <>
                <div>
                  <h2 className="text-2xl font-black text-navy">Matching Dealer Match Cards</h2>
                  <div className="mt-4 grid gap-5 lg:grid-cols-2">
                    {results.dealerMatches.map((card) => (
                      <DealerMatchCardView key={card.id} card={card} />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-navy">Related public Buyer Wanted Cards</h2>
                  <div className="mt-4 grid gap-5 lg:grid-cols-2">
                    {results.wantedCards.map((card) => (
                      <BuyerWantedCardView key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-lg bg-ice p-8 text-center shadow-soft ring-1 ring-charcoal/10">
                <h2 className="text-3xl font-black text-navy">No matching cards yet.</h2>
                <p className="mt-3 text-charcoal/70">Post what you want and let sellers come to you.</p>
                <div className="mt-6">
                  <ButtonLink to="/buyer/create-wanted-card">Create Wanted Card</ButtonLink>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
