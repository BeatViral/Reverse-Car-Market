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
          description="This is not a buyer post. It is a dealer-created Match Card."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid h-fit gap-3">
            <DealerMatchCardView card={card} action={false} />
            <p className="rounded-lg bg-amber/10 p-4 text-sm font-bold leading-6 text-charcoal/72 ring-1 ring-amber/20">
              This is not a buyer post. It is a dealer-created Match Card.
            </p>
          </div>
          <form className="rounded-lg bg-white p-6 shadow-card ring-1 ring-charcoal/10" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            {submitted ? (
              <div className="rounded-lg bg-green/10 p-5">
                <h2 className="text-2xl font-black text-navy">Interest captured</h2>
                <p className="mt-2 text-sm leading-6 text-charcoal/70">A buyer-interest record was created. If selected, a real Ready-to-Buy Card would be generated for the buyer to confirm.</p>
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
                <input type="checkbox" defaultChecked /> Turn this into a real Ready-to-Buy Card
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
