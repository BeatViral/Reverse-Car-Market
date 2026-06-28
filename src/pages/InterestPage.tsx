import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { DealerMatchCardView } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { dealerMatchCards } from '../data/demo';

export function InterestPage() {
  const { dealerMatchCardId } = useParams();
  const card = dealerMatchCards.find((item) => item.id === dealerMatchCardId) ?? dealerMatchCards[0];
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          eyebrow="Buyer interest"
          title="Tell us what you're looking for."
          description="This creates a buyer-interest record and can optionally create a real Buyer Wanted Card. The dealer card is not treated as fake buyer demand."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <DealerMatchCardView card={card} action={false} />
          <form className="rounded-lg bg-white p-6 shadow-card ring-1 ring-charcoal/10" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            {submitted ? (
              <div className="rounded-lg bg-green/10 p-5">
                <h2 className="text-2xl font-black text-navy">Interest captured</h2>
                <p className="mt-2 text-sm leading-6 text-charcoal/70">A buyer-interest record was created. If selected, a real Buyer Wanted Card would be generated for the buyer to confirm.</p>
              </div>
            ) : null}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Name', 'Mia Collins'],
                ['Email', 'mia@example.com'],
                ['Phone optional', '0412 555 019'],
                ['Location', 'Gold Coast'],
                ['Budget', '19000'],
                ['Timeframe', 'Ready this month'],
              ].map(([label, placeholder]) => (
                <label key={label} className="grid gap-2 text-sm font-bold text-navy">
                  {label}
                  <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder={placeholder} />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-bold text-navy md:col-span-2">
                Exact requirements
                <textarea className="min-h-28 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="Automatic hatchback, service history preferred, around Gold Coast." />
              </label>
            </div>
            <div className="mt-5 grid gap-3">
              <label className="flex items-center gap-2 text-sm font-bold text-navy">
                <input type="checkbox" defaultChecked /> Permission for the verified dealer to contact me
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-navy">
                <input type="checkbox" /> Create account
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-navy">
                <input type="checkbox" defaultChecked /> Create a real Buyer Wanted Card from this interest
              </label>
            </div>
            <div className="mt-6">
              <Button type="submit">Submit interest</Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
