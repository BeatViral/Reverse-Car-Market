import { Clock3, ListChecks, MessageSquareReply, type LucideIcon } from 'lucide-react';
import { Container } from '../Section';

const benefits: Array<[LucideIcon, string, string]> = [
  [Clock3, 'Less browsing', 'Post what you want instead of digging through endless listings.'],
  [MessageSquareReply, 'Faster responses', "Sellers can reply when they already have what you're looking for."],
  [ListChecks, 'Clearer matching', 'Buyers and sellers meet around real intent, not random browsing.'],
];

export function BenefitsSection() {
  return (
    <section className="bg-ice py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue">Better by design</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-5xl">What makes Reverse Car Market better?</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map(([Icon, title, text]) => (
              <article key={title} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-xl font-black text-navy">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-charcoal/68">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
