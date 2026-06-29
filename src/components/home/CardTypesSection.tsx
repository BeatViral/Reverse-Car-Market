import { BuyerWantedCardView, DealerMatchCardView } from '../MarketplaceCards';
import { Container } from '../Section';
import { buyerWantedCards, dealerMatchCards } from '../../data/demo';

export function CardTypesSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">The important rule</p>
            <h2 className="mt-3 text-4xl font-black leading-[0.98] text-navy sm:text-5xl">Ready-to-Buy Cards and Dealer Match Cards stay separate.</h2>
            <p className="mt-4 text-base leading-7 text-charcoal/70">
              A Ready-to-Buy Card is posted by a real buyer. A Dealer Match Card is dealer-created from real inventory.
            </p>
            <div className="mt-6 grid gap-3 rounded-xl bg-ice p-5 text-sm font-black text-navy ring-1 ring-charcoal/10">
              <p>Normal car sites: Sellers list. Buyers search.</p>
              <p>Reverse Car Market: Buyers post what they want. Sellers respond.</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <BuyerWantedCardView card={buyerWantedCards[0]} compact action={false} />
            <DealerMatchCardView card={dealerMatchCards[1]} compact action={false} />
          </div>
        </div>
      </Container>
    </section>
  );
}
