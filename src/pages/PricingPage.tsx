import { CheckCircle2 } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container, SectionHeader } from '../components/Section';
import { pricingTiers } from '../data/demo';
import { cx } from '../lib/format';

export function PricingPage() {
  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Pricing"
          title="Free for buyers. Subscription-ready for dealers."
          description="Buyers can post what they want for free. The founding dealer pilot is free during launch."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={cx('rounded-lg p-5 shadow-soft ring-1', tier.highlighted ? 'bg-navy text-white ring-navy' : 'bg-white text-navy ring-charcoal/10')}>
              <h2 className="text-xl font-black">{tier.name}</h2>
              <p className={cx('mt-3 text-3xl font-black', tier.highlighted ? 'text-white' : 'text-blue')}>{tier.price}</p>
              <p className={cx('mt-3 text-sm leading-6', tier.highlighted ? 'text-white/65' : 'text-charcoal/65')}>{tier.description}</p>
              <div className="mt-6 grid gap-3">
                {tier.features.map((feature) => (
                  <p key={feature} className={cx('flex gap-2 text-sm font-semibold', tier.highlighted ? 'text-white/80' : 'text-charcoal/70')}>
                    <CheckCircle2 className={cx('h-5 w-5 shrink-0', tier.highlighted ? 'text-green' : 'text-blue')} />
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink to="/dealers/founding">Join Founding Dealer Pilot</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
