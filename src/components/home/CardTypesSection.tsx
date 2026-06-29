import { ArrowRight, Car, Search, Upload, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Container } from '../Section';

export function CardTypesSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">Three simple paths</p>
          <h2 className="mt-3 text-4xl font-black leading-[0.98] text-navy sm:text-6xl">Tell us which side you're on.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-charcoal/70">
            Whether you want a car, have a car, or manage a full dealer inventory, Reverse Car Market turns intent into matches.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PathPanel
            icon={Search}
            title="I want a car"
            subtitle="For buyers"
            mainLine="Post what you're looking for."
            text="Tell sellers the car you want, your budget, location and must-haves. Sellers reply if they have a match."
            example="I want a Toyota Corolla under $20k."
            cta="Post What You Want"
            to="/buyer/create-wanted-card"
            tone="buyer"
          />
          <PathPanel
            icon={Car}
            title="I have a car"
            subtitle="For sellers"
            mainLine="Show buyers what you have."
            text="Post your car as a seller offer. Buyers can raise their hand if it matches what they're looking for, or you can reply to buyer posts."
            example="Are you looking for a Toyota Corolla under $20k?"
            cta="Create Seller Post"
            to="/sellers"
            tone="seller"
          />
          <PathPanel
            icon={Upload}
            title="I have many cars"
            subtitle="For dealers"
            mainLine="Upload inventory."
            text="Dealers can upload stock and generate seller posts from real vehicle inventory, then respond to buyer demand."
            example="Upload 50 cars. Generate seller posts automatically."
            cta="Dealer Inventory"
            to="/dealer-inventory"
            tone="dealer"
          />
        </div>
      </Container>
    </section>
  );
}

function PathPanel({
  icon: Icon,
  title,
  subtitle,
  mainLine,
  text,
  example,
  cta,
  to,
  tone,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  mainLine: string;
  text: string;
  example: string;
  cta: string;
  to: string;
  tone: 'buyer' | 'seller' | 'dealer';
}) {
  const styles = {
    buyer: {
      article: 'rounded-2xl border-2 border-blue/18 bg-white p-6 shadow-[0_24px_70px_rgba(47,107,255,0.12)]',
      icon: 'flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white',
      subtitle: 'text-sm font-black uppercase tracking-[0.16em] text-blue',
      quote: 'border-blue/20 bg-blue/5 text-blue',
      button: 'primary' as const,
    },
    seller: {
      article: 'rounded-2xl border-2 border-green/20 bg-white p-6 shadow-[0_24px_70px_rgba(0,166,96,0.12)]',
      icon: 'flex h-12 w-12 items-center justify-center rounded-xl bg-green text-white',
      subtitle: 'text-sm font-black uppercase tracking-[0.16em] text-green',
      quote: 'border-green/20 bg-green/5 text-green',
      button: 'dark' as const,
    },
    dealer: {
      article: 'rounded-2xl border-2 border-amber/45 bg-[#fff8ea] p-6 shadow-[0_24px_70px_rgba(245,165,36,0.14)]',
      icon: 'flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-navy',
      subtitle: 'text-sm font-black uppercase tracking-[0.16em] text-[#9b6200]',
      quote: 'border-amber/30 bg-white text-[#8a5a00]',
      button: 'secondary' as const,
    },
  }[tone];

  return (
    <article className={styles.article}>
      <div className="flex items-center gap-3">
        <span className={styles.icon}>
          <Icon size={22} />
        </span>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <h3 className="mt-6 text-3xl font-black leading-[1.02] text-navy">{title}</h3>
      <p className="mt-4 text-xl font-black leading-tight text-navy">{mainLine}</p>
      <p className="mt-3 text-base font-semibold leading-7 text-charcoal/70">{text}</p>
      <p className={`mt-5 rounded-xl border p-4 text-sm font-black leading-6 ${styles.quote}`}>"{example}"</p>
      <div className="mt-7">
        <ButtonLink to={to} variant={styles.button} className="min-h-14">
          {cta} <ArrowRight size={17} />
        </ButtonLink>
      </div>
    </article>
  );
}
