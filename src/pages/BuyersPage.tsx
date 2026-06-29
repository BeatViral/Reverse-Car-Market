import { EyeOff, GitCompare, LockKeyhole, MessageSquareReply, PauseCircle, ShieldCheck, WalletCards } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, OfferComparisonTable } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { buyerWantedCards, dealerResponses } from '../data/demo';

const features = [
  [WalletCards, 'Post what you want', 'Tell sellers exactly what you want without browsing stale listings.'],
  [LockKeyhole, 'Stay in control', 'Hide contact details until you are ready to speak with a seller.'],
  [GitCompare, 'Compare offers', 'See cars, prices, warranty details, warnings and match score together.'],
  [PauseCircle, 'Close posts anytime', 'Pause or close a post when you have enough offers.'],
  [EyeOff, 'Avoid noise', 'Set response limits and seller type preferences.'],
  [ShieldCheck, 'Free for buyers', 'Buyers can post demand and compare responses for free.'],
];

export function BuyersPage() {
  return (
    <>
      <section className="section-pad bg-white">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">For buyers</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-navy">I want a car.</h1>
            <p className="mt-5 text-lg leading-8 text-charcoal/70">
              Post what you're looking for and let sellers reply.
            </p>
            <div className="mt-6 grid gap-3 rounded-xl bg-ice p-5 ring-1 ring-charcoal/10">
              <div className="flex items-start gap-3">
                <MessageSquareReply className="mt-1 h-5 w-5 shrink-0 text-blue" />
                <p className="text-sm font-semibold leading-6 text-charcoal/72">
                  Your buyer post can be as simple as <strong className="text-navy">"I want a Toyota Corolla under $20k."</strong>
                </p>
              </div>
              <p className="rounded-lg bg-white px-4 py-3 text-sm font-black text-navy shadow-soft">Sellers reply: "I have one."</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/buyer/create-wanted-card">Post What You Want</ButtonLink>
            </div>
          </div>
          <BuyerWantedCardView card={buyerWantedCards[0]} />
        </Container>
      </section>
      <section className="section-pad bg-ice">
        <Container>
          <SectionHeader title="Buyer tools built around control." description="A car purchase is high-stakes. Reverse Car Market keeps your intent, privacy and comparison workflow in one place." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
                <Icon className="h-6 w-6 text-blue" />
                <h3 className="mt-4 font-black text-navy">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal/68">{text as string}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-pad bg-white">
        <Container>
          <SectionHeader title="Compare offers without spreadsheet chaos." description="Every response can be scored against the buyer's criteria and shown with warnings before the buyer chooses who to contact." />
          <div className="mt-8">
            <OfferComparisonTable responses={dealerResponses} />
          </div>
        </Container>
      </section>
    </>
  );
}
