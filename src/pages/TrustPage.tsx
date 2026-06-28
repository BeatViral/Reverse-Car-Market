import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DealerPromptDisclaimer, TrustChecklist } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';

export function TrustPage() {
  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          eyebrow="Trust and safety"
          title="No fake demand. No disguised dealer posts. No scraping."
          description="Reverse Car Market is designed for high-trust matching, not classified-ad chaos."
        />
        <div className="mt-10">
          <TrustChecklist />
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <PolicyCard icon={CheckCircle2} title="Buyer Request Cards" text="Created only by real buyers. A dealer can respond to a card, but cannot create fake buyer demand." />
          <PolicyCard icon={ShieldCheck} title="Dealer Match Cards" text="Created by verified dealers from real inventory and clearly labelled as dealer-created prompts." />
          <PolicyCard icon={AlertTriangle} title="Buying safety" text="Reverse Car Market is a matching platform, not a vehicle inspector. Verify details, seller identity and PPSR history before purchase." />
        </div>
        <div className="mt-8">
          <DealerPromptDisclaimer />
        </div>
      </Container>
    </section>
  );
}

function PolicyCard({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
      <Icon className="h-7 w-7 text-blue" />
      <h2 className="mt-4 text-xl font-black text-navy">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-charcoal/68">{text}</p>
    </div>
  );
}
