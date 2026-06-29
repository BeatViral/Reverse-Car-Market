import { ArrowRight, BadgeCheck, Search, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Container } from '../Section';

export function CardTypesSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">Two ways to start</p>
          <h2 className="mt-3 text-4xl font-black leading-[0.98] text-navy sm:text-6xl">Start from either side.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-charcoal/70">
            Buyers can post the car they want. Dealers can show matching stock. When both sides line up, the buyer gets real options.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <StartPanel
            icon={Search}
            eyebrow="Buyer starts"
            title="I'm ready to buy a Toyota Corolla under $20k."
            text="The buyer posts what they want, their budget and where they're buying. Sellers respond with matching cars."
            cta="Post the Car You Want"
            to="/buyer/create-wanted-card"
            tone="buyer"
          />
          <StartPanel
            icon={BadgeCheck}
            eyebrow="Dealer starts"
            title="Looking for a reliable hatchback under $20k?"
            text="A verified dealer creates this from real stock. Buyers raise their hand if it matches what they want."
            cta="Browse Match Cards"
            to="/browse"
            tone="dealer"
          />
        </div>
      </Container>
    </section>
  );
}

function StartPanel({
  icon: Icon,
  eyebrow,
  title,
  text,
  cta,
  to,
  tone,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  to: string;
  tone: 'buyer' | 'dealer';
}) {
  const isBuyer = tone === 'buyer';

  return (
    <article className={isBuyer ? 'rounded-2xl border-2 border-blue/18 bg-white p-6 shadow-[0_24px_70px_rgba(47,107,255,0.12)]' : 'rounded-2xl border-2 border-amber/45 bg-[#fff8ea] p-6 shadow-[0_24px_70px_rgba(245,165,36,0.14)]'}>
      <div className="flex items-center gap-3">
        <span className={isBuyer ? 'flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white' : 'flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-navy'}>
          <Icon size={22} />
        </span>
        <p className={isBuyer ? 'text-sm font-black uppercase tracking-[0.16em] text-blue' : 'text-sm font-black uppercase tracking-[0.16em] text-[#9b6200]'}>
          {eyebrow}
        </p>
      </div>
      <h3 className="mt-6 text-3xl font-black leading-[1.02] text-navy">{title}</h3>
      <p className="mt-4 text-base font-semibold leading-7 text-charcoal/70">{text}</p>
      <div className="mt-7">
        <ButtonLink to={to} variant={isBuyer ? 'primary' : 'secondary'} className="min-h-14">
          {cta} <ArrowRight size={17} />
        </ButtonLink>
      </div>
    </article>
  );
}
