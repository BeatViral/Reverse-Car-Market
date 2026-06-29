import { ArrowRight, Sparkles, Upload, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { DealerMatchCardView, InventoryMiniCard } from '../components/MarketplaceCards';
import { Container, SectionHeader } from '../components/Section';
import { dealerMatchCards, inventoryItems } from '../data/demo';

const uploaded = ['2019 Toyota Corolla', '2018 Mazda 3', '2020 Hyundai i30', '2017 Kia Cerato'];
const generated = ['Looking for a Toyota Corolla under $20k?', 'Looking for a reliable hatchback under $20k?', 'Looking for a first car under $18k?'];

export function DealerInventoryPage() {
  return (
    <>
      <section className="section-pad bg-navy text-white">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber">Dealer inventory</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">I have many cars.</h1>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Upload dealer stock and turn inventory into seller posts.
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/60">
              Dealer Inventory is for car yards and dealers with multiple vehicles, stock lists, CSV uploads and lead management tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/dealer/inventory/upload" variant="secondary">
                Upload Inventory <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink to="/dealers/founding" variant="ghost" className="text-white hover:bg-white/10">
                Join Founding Dealer Pilot
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-navy shadow-card">
            <div className="grid gap-3">
              {inventoryItems.slice(0, 3).map((item) => (
                <InventoryMiniCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="section-pad bg-ice">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="From stock to demand"
            title="Upload once. Create seller posts from real cars."
            description="Reverse Car Market turns inventory into simple buyer-facing prompts, then helps dealers respond when buyers show intent."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <ExamplePanel icon={Upload} title="Dealer uploads" items={uploaded} />
            <ExamplePanel icon={Sparkles} title="The platform generates" items={generated} />
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {dealerMatchCards.slice(0, 2).map((card) => (
              <DealerMatchCardView key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ExamplePanel({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-navy">
          <Icon size={22} />
        </span>
        <h2 className="text-2xl font-black text-navy">{title}</h2>
      </div>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-lg bg-ice px-4 py-3 text-sm font-black text-navy">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
