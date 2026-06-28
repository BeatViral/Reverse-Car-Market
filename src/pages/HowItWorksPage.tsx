import { ArrowRight, BadgeCheck, Car, FileText, MessageSquare, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, DealerMatchCardView, DealerPromptDisclaimer } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { buyerWantedCards, dealerMatchCards } from '../data/demo';

export function HowItWorksPage() {
  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="How it works"
          title="The market starts with demand, then matches real stock to it."
          description="Reverse Car Market supports two honest scenarios: real buyers create Wanted Cards, and verified dealers create clearly labelled Match Cards from inventory."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <FlowPanel
            title="Scenario 1: Buyer starts"
            intro='Buyer posts: "I am looking for a Toyota Corolla under $20k." Dealer replies: "I have a matching car."'
            steps={[
              [FileText, 'Buyer creates a Wanted Card', 'Budget, location, must-haves and buying timeframe.'],
              [Car, 'Dealer or seller responds', 'Only respond when there is a genuine matching vehicle.'],
              [MessageSquare, 'Buyer compares offers', 'Price, kilometres, warranty, warnings and match score in one place.'],
            ]}
          >
            <BuyerWantedCardView card={buyerWantedCards[0]} />
          </FlowPanel>
          <FlowPanel
            title="Scenario 2: Dealer starts"
            intro='Dealer has inventory and creates: "Looking for a Toyota Corolla under $20k?" Buyer clicks: "Yes, I am looking for this."'
            steps={[
              [BadgeCheck, 'Dealer uploads owned inventory', 'No scraping. Only stock the dealer owns or can represent.'],
              [Sparkles, 'Dealer Match Card is published', 'It is labelled as dealer-created and never shown as buyer demand.'],
              [FileText, 'Buyer interest becomes real demand', 'The buyer can create or confirm a real Buyer Wanted Card.'],
            ]}
          >
            <DealerMatchCardView card={dealerMatchCards[0]} />
          </FlowPanel>
        </div>
        <div className="mt-8">
          <DealerPromptDisclaimer />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/buyer/create-wanted-card">
            Post a Car Wanted <ArrowRight size={17} />
          </ButtonLink>
          <ButtonLink to="/dealers/founding" variant="dark">
            Join as Founding Dealer
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function FlowPanel({
  title,
  intro,
  steps,
  children,
}: {
  title: string;
  intro: string;
  steps: Array<[typeof FileText, string, string]>;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
      <h2 className="text-2xl font-black text-navy">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-charcoal/68">{intro}</p>
      <div className="my-6">{children}</div>
      <div className="grid gap-3">
        {steps.map(([Icon, stepTitle, text]) => (
          <div key={stepTitle} className="flex gap-3 rounded-lg bg-ice p-4">
            <Icon className="h-5 w-5 shrink-0 text-blue" />
            <div>
              <p className="font-black text-navy">{stepTitle}</p>
              <p className="mt-1 text-sm text-charcoal/65">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
