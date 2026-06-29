import { ArrowRight, Car, MessageSquare, Search, Upload, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container, SectionHeader } from '../components/Section';

const paths: Array<[LucideIcon, string, string]> = [
  [Search, 'I want a car.', 'Post what you want. Sellers reply.'],
  [Car, 'I have a car.', 'Post what you have. Buyers raise their hand.'],
  [Upload, 'I have many cars.', 'Upload inventory. Generate seller posts automatically.'],
];

export function HowItWorksPage() {
  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="How it works"
          title="Three simple paths."
          description="Reverse Car Market is built around plain intent: buyers say what they want, sellers show what they have, and dealers can turn inventory into seller posts."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {paths.map(([Icon, title, text]) => (
            <article key={title} className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white">
                <Icon size={22} />
              </span>
              <h2 className="mt-6 text-3xl font-black text-navy">{title}</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-charcoal/70">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal/10">
          <div className="grid gap-5 lg:grid-cols-2">
            <MechanicPanel
              eyebrow="Buyer says"
              first="I want this car."
              secondEyebrow="Seller replies"
              second="I have it."
            />
            <MechanicPanel
              eyebrow="Seller says"
              first="Are you looking for this kind of car?"
              secondEyebrow="Buyer replies"
              second="Yes, I am."
            />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/buyer/create-wanted-card">
            Post What You Want <ArrowRight size={17} />
          </ButtonLink>
          <ButtonLink to="/sellers" variant="dark">
            I Have a Car
          </ButtonLink>
          <ButtonLink to="/dealer-inventory" variant="secondary">
            Dealer Inventory
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function MechanicPanel({ eyebrow, first, secondEyebrow, second }: { eyebrow: string; first: string; secondEyebrow: string; second: string }) {
  return (
    <div className="rounded-xl bg-ice p-5">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-5 w-5 text-blue" />
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue">{eyebrow}</p>
      </div>
      <p className="mt-3 rounded-lg bg-white p-4 text-2xl font-black leading-tight text-navy shadow-soft">"{first}"</p>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-charcoal/45">{secondEyebrow}</p>
      <p className="mt-2 rounded-lg bg-navy p-4 text-2xl font-black leading-tight text-white shadow-soft">"{second}"</p>
    </div>
  );
}
