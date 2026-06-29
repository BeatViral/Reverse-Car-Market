import { ArrowRight, Car, MessageSquareReply, Search, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, DealerMatchCardView } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { buyerWantedCards, dealerMatchCards } from '../data/demo';

export function SellersPage() {
  return (
    <>
      <section className="section-pad bg-white">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">For sellers</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-navy">I have a car.</h1>
            <p className="mt-5 text-lg leading-8 text-charcoal/70">
              Post what you have or reply to buyers looking for it.
            </p>
            <div className="mt-7 grid gap-4">
              <SellerMove
                icon={MessageSquareReply}
                title="Reply to buyer posts"
                text='If a buyer says "I want a Toyota Corolla under $20k," you can reply: "I have one."'
              />
              <SellerMove
                icon={Car}
                title="Create a seller post"
                text='If you have a car but no buyer has posted yet, create: "Are you looking for a Toyota Corolla under $20k?"'
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/dealer/inventory/upload">
                Create Seller Post <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink to="/browse" variant="secondary">
                Browse Buyer Posts
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5">
            <BuyerWantedCardView card={buyerWantedCards[0]} />
            <DealerMatchCardView card={dealerMatchCards[0]} compact />
          </div>
        </Container>
      </section>
      <section className="section-pad bg-ice">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Seller flow"
            title="You do not need to wait for endless listing traffic."
            description="Reply directly to a buyer who already knows what they want, or publish a seller post so buyers can raise their hand."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Find buyer posts', 'See buyers who are ready now and looking for cars like yours.'],
              ['Reply with a car', 'Send vehicle details only when the car genuinely fits.'],
              ['Start with your car', 'Create a seller post when you want buyers to come to you.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
                <Search className="h-6 w-6 text-blue" />
                <h2 className="mt-5 text-xl font-black text-navy">{title}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-charcoal/68">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function SellerMove({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl bg-ice p-4 ring-1 ring-charcoal/10">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue text-white">
        <Icon size={20} />
      </span>
      <div>
        <h2 className="font-black text-navy">{title}</h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-charcoal/70">{text}</p>
      </div>
    </div>
  );
}
