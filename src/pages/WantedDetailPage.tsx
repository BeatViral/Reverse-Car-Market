import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { BuyerWantedCardView, OfferComparisonTable } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { buyerWantedCards, dealerResponses } from '../data/demo';

export function WantedDetailPage() {
  const { id } = useParams();
  const card = buyerWantedCards.find((item) => item.id === id) ?? buyerWantedCards[0];
  const responses = dealerResponses.filter((response) => response.buyerWantedCardId === card.id);

  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader eyebrow="Request Card Detail" title={card.title} description="Review criteria, compare dealer and seller responses, then accept, reject, pause or close the card." />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid h-fit gap-5">
            <BuyerWantedCardView card={card} action={false} />
            <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
              <h2 className="text-xl font-black text-navy">Buyer criteria</h2>
              <div className="mt-4 grid gap-3 text-sm text-charcoal/70">
                <p><strong>Must-haves:</strong> {card.mustHaves.join(', ')}</p>
                <p><strong>Dealbreakers:</strong> {card.dealbreakers.join(', ')}</p>
                <p><strong>Contact preference:</strong> {card.contactPreference}</p>
                <p><strong>Maximum responses:</strong> {card.maxSellerResponses}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="button" variant="secondary">Pause card</Button>
                <Button type="button" variant="dark">Close card</Button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-black text-navy">Dealer and seller responses</h2>
            {responses.length ? (
              <OfferComparisonTable responses={responses} />
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-soft ring-1 ring-charcoal/10">
                <h3 className="text-2xl font-black text-navy">No responses yet</h3>
                <p className="mt-2 text-charcoal/65">Sellers will appear here when they offer matching cars.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
