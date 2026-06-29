import { BadgeCheck, MessageSquare, Sparkles } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Container } from '../Section';

export function DealerSection() {
  return (
    <section className="bg-ice py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-navy p-7 text-white shadow-card md:p-10">
          <div className="absolute right-0 top-0 h-full w-2 bg-amber" />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber">For founding dealers</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.98] sm:text-6xl">Turn stock into buyer interest.</h2>
              <p className="mt-4 max-w-2xl text-white/68">
                Upload inventory. Generate honest "Looking for this?" cards. Capture real buyer intent.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to="/dealers/founding" variant="secondary">
                  Join free pilot
                </ButtonLink>
                <ButtonLink to="/dealers" variant="ghost" className="text-white hover:bg-white/10">
                  Dealer tools
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 text-navy">
              <DealerMiniFlow />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DealerMiniFlow() {
  return (
    <div className="grid gap-3">
      {[
        [BadgeCheck, 'Dealer uploads stock'],
        [Sparkles, 'Match Cards are generated'],
        [MessageSquare, 'Buyer raises their hand'],
      ].map(([Icon, label]) => {
        const IconComponent = Icon as typeof BadgeCheck;
        return (
          <div key={label as string} className="flex items-center gap-3 rounded-lg bg-ice p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber/20 text-[#8a5a00]">
              <IconComponent size={18} />
            </span>
            <p className="font-black text-navy">{label as string}</p>
          </div>
        );
      })}
      <p className="rounded-lg bg-amber/10 p-3 text-sm font-semibold leading-6 text-charcoal/72">
        Clearly labelled dealer prompt. Never fake buyer demand.
      </p>
    </div>
  );
}
