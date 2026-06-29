import { BadgeCheck, BellRing, Database, FileSpreadsheet, LineChart, MessageSquareReply, Upload } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { CardLinkList, DealerMatchCardView, DealerPromptDisclaimer } from '../components/MarketplaceCards';
import { Container, SectionHeader, StatCard } from '../components/Section';
import { dealerMatchCards } from '../data/demo';

const features = [
  [Database, 'Upload inventory', 'Manual entry, CSV upload, pasted inventory text or a permitted inventory URL.'],
  [FileSpreadsheet, 'Create seller posts', 'Convert owned stock into honest prompts buyers can raise their hand on.'],
  [MessageSquareReply, 'Respond to buyer posts', 'Reply only when your stock genuinely fits what a buyer wants.'],
  [BellRing, 'Receive buyer-interest leads', 'Buyers confirm interest before dealers see lead details.'],
  [LineChart, 'Demand insights', 'See which price bands, models and use cases buyers are requesting.'],
  [BadgeCheck, 'Founding dealer pilot', 'Join free during pilot and keep a discounted monthly path after launch.'],
];

export function DealersPage() {
  return (
    <>
      <section className="section-pad bg-navy text-white">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber">For dealers</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">See demand before buyers walk into someone else's yard.</h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Turn inventory into seller posts, respond to buyer posts and build a lead pipeline around demand instead of impressions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/dealers/founding" variant="secondary">
                Join as Founding Dealer
              </ButtonLink>
              <ButtonLink to="/dealer/inventory/upload" variant="ghost" className="text-white hover:bg-white/10">
                Upload Inventory
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 text-navy">
            <DealerMatchCardView card={dealerMatchCards[1]} />
          </div>
        </Container>
      </section>
      <section className="section-pad bg-ice">
        <Container>
          <SectionHeader title="Dealer tools for real demand." description="Seller posts are created from real inventory, clearly labelled and built to convert buyer interest into leads." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
                <Icon className="h-6 w-6 text-blue" />
                <h3 className="mt-4 font-black text-navy">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal/68">{text as string}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <DealerPromptDisclaimer />
          </div>
        </Container>
      </section>
      <section className="section-pad bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeader title="Founding dealer pilot can start free." description="Send us your inventory. We'll convert it into seller posts for free during the pilot, then you can continue on a discounted subscription after launch." />
              <div className="mt-8 grid grid-cols-2 gap-4">
                <StatCard label="Pilot cost" value="$0" tone="green" />
                <StatCard label="Lead source" value="Buyer intent" tone="blue" />
              </div>
            </div>
            <CardLinkList cards={dealerMatchCards} />
          </div>
        </Container>
      </section>
    </>
  );
}

export function FoundingDealerPage() {
  return (
    <section className="section-pad bg-ice">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">Join the Free Founding Dealer Pilot</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-navy">Send us your stock. We'll turn it into seller posts.</h1>
            <p className="mt-5 text-lg leading-8 text-charcoal/70">
              Buyers click "I'm looking for this" and you receive buyer-interest leads. No setup fee and no subscription while we test.
            </p>
            <div className="mt-8 grid gap-3">
              {['Upload CSV, spreadsheet or paste inventory', 'Generate seller posts', 'Receive buyer-interest leads', 'Respond to buyer posts', 'Founding dealer badge', 'Discounted subscription after pilot'].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 text-sm font-bold text-navy shadow-soft ring-1 ring-charcoal/10">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <form className="rounded-lg bg-white p-6 shadow-card ring-1 ring-charcoal/10">
            <h2 className="text-2xl font-black text-navy">Founding dealer application</h2>
            <p className="mt-2 text-sm text-charcoal/65">Only upload inventory you own or have permission to represent.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Business name', 'Northern Rivers Auto'],
                ['Contact person', 'Sam Rivera'],
                ['Email', 'dealer@example.com'],
                ['Phone', '02 5500 0123'],
                ['Location', 'Gold Coast / Northern Rivers'],
                ['Dealer licence', 'MD-48201'],
                ['Website', 'https://'],
                ['Approx stock count', '45'],
              ].map(([label, placeholder]) => (
                <label key={label} className="grid gap-2 text-sm font-bold text-navy">
                  {label}
                  <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder={placeholder} />
                </label>
              ))}
            </div>
            <label className="mt-4 grid gap-2 text-sm font-bold text-navy">
              Inventory upload
              <div className="rounded-lg border border-dashed border-blue/45 bg-blue/5 p-6 text-center">
                <Upload className="mx-auto h-7 w-7 text-blue" />
                <p className="mt-2 text-sm font-bold text-blue">Upload CSV, spreadsheet or stock list</p>
              </div>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-bold text-navy">
              Notes
              <textarea className="min-h-28 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="Anything we should know about your stock or region?" />
            </label>
            <button type="submit" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-bold text-white">
              Apply for pilot
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
