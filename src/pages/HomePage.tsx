import { ArrowRight, BadgeCheck, CheckCircle2, CircleDollarSign, Database, FileText, ShieldCheck, Sparkles, Upload } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DealerMatchCardView, BuyerWantedCardView, DealerPromptDisclaimer, HeroCardStack, TrustChecklist } from '../components/MarketplaceCards';
import { ButtonLink } from '../components/Button';
import { Container, SectionHeader } from '../components/Section';
import { buyerWantedCards, dealerMatchCards } from '../data/demo';

const buyerBenefits = [
  ['Post once', 'Tell the market what you want: budget, location, model, kilometres and must-haves.'],
  ['Let sellers respond', 'Dealers and sellers can offer matching cars under your Wanted Card.'],
  ['Compare real offers', 'See price, kilometres, location, service history and match score in one place.'],
  ['Stay in control', 'Hide your contact details until you choose who to speak with.'],
];

const dealerBenefits = [
  ['Respond to real buyer demand', 'When buyers post what they want, you can respond only when you have a genuine match.'],
  ['Turn inventory into Match Cards', 'Upload stock and create prompts like "Looking for a reliable hatchback under $20k?"'],
  ['Get high-intent leads', 'Buyers raise their hand because they are actively looking for that type of car.'],
  ['Start free as a founding dealer', 'Join the pilot, upload inventory and test buyer interest before subscriptions begin.'],
];

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue">A buyer-first car marketplace</p>
            <h1 className="text-balance mt-5 text-5xl font-black leading-[0.95] text-navy sm:text-6xl lg:text-7xl">
              Post the car you want. Let sellers come to you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal/72">
              Reverse Car Market flips car buying. Create a Wanted Card with your budget, location and must-haves, then verified dealers and sellers respond with matching cars.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/buyer/create-wanted-card">
                Post a Car Wanted <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink to="/dealers" variant="secondary">
                I'm a Dealer
              </ButtonLink>
              <ButtonLink to="/browse" variant="ghost">
                Browse Match Cards
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm font-semibold text-charcoal/55">Free for buyers. Founding dealers join free during pilot.</p>
          </div>
          <HeroCardStack />
        </Container>
      </section>

      <section className="section-pad bg-ice">
        <Container>
          <SectionHeader
            title="The car market has always worked one way. We flipped it."
            description="Most car sites are built around seller inventory. Reverse Car Market is built around buyer demand."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
              <span className="rounded-md bg-charcoal/5 px-3 py-1 text-xs font-black uppercase text-charcoal/55">Inventory-first</span>
              <h3 className="mt-5 text-2xl font-black text-navy">Old way</h3>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-charcoal/68">
                {['Sellers list cars', 'Buyers scroll endlessly', 'Listings go stale', 'Buyers chase sellers', 'Good matches get buried'].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-charcoal/35" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3 opacity-45 grayscale">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-24 rounded-lg bg-charcoal/10 p-3">
                    <div className="h-5 w-20 rounded bg-white" />
                    <div className="mt-7 h-3 w-full rounded bg-white" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-white" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-navy p-6 text-white shadow-card">
              <span className="rounded-md bg-blue px-3 py-1 text-xs font-black uppercase text-white">Demand-first</span>
              <h3 className="mt-5 text-2xl font-black">Reverse way</h3>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-white/72">
                {['Buyer posts what they want', 'Sellers respond with matches', 'Offers sit under one Wanted Card', 'Buyer compares clearly', 'Buyer stays in control'].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-white p-4 text-navy">
                <p className="text-xs font-black uppercase text-blue">Wanted Card</p>
                <p className="mt-2 font-black">Wanted: Reliable hatchback under $18k</p>
                <div className="mt-3 grid gap-2">
                  {['Dealer response: Mazda 3 Maxx - Good Match', 'Dealer response: Hyundai i30 - Strong Match', 'Private seller response: Cerato - Partial Match'].map((item) => (
                    <div key={item} className="rounded-md bg-ice px-3 py-2 text-xs font-bold text-charcoal/70">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <SectionHeader
            align="center"
            title="Two ways to match. Both built around demand."
            description="Buyers can start with a Wanted Card. Dealers can start with a Match Card. No fake demand. No disguised listings."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ScenarioCard
              badge="Scenario 1"
              title="Buyer Wanted Card"
              note="This is the core reverse marketplace."
              flow="Buyer posts -> dealers respond -> buyer compares offers"
              cta="Post a Car Wanted"
              to="/buyer/create-wanted-card"
            >
              <BuyerWantedCardView card={buyerWantedCards[0]} compact action={false} />
            </ScenarioCard>
            <ScenarioCard
              badge="Scenario 2"
              title="Dealer Match Card"
              note="Dealer cards are clearly labelled. They never pretend to be buyer posts."
              flow="Dealer posts from inventory -> buyer raises hand -> real lead is created"
              cta="Browse Dealer Match Cards"
              to="/browse"
            >
              <DealerMatchCardView card={dealerMatchCards[0]} compact action={false} />
            </ScenarioCard>
          </div>
        </Container>
      </section>

      <BenefitSection
        eyebrow="For buyers"
        title="For buyers - finally, a smarter way to buy a car."
        description="No endless scrolling. No chasing dead ads. No giving your number to every seller before you're ready."
        benefits={buyerBenefits}
        cta="Create Wanted Card"
        to="/buyer/create-wanted-card"
      />

      <BenefitSection
        dark
        eyebrow="For dealers"
        title="For dealers - see demand before buyers walk into someone else's yard."
        description="Turn your inventory into buyer-interest cards and respond to real Wanted Cards from people already looking."
        benefits={dealerBenefits}
        cta="Join as Founding Dealer"
        to="/dealers/founding"
      />

      <section className="section-pad bg-white">
        <Container>
          <SectionHeader
            align="center"
            title="The whole market runs on two cards."
            description="One card says what the buyer wants. The other helps dealers turn stock into buyer interest."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <BuyerWantedCardView card={buyerWantedCards[1]} />
            <DealerMatchCardView card={dealerMatchCards[1]} />
          </div>
        </Container>
      </section>

      <section className="section-pad bg-ice">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow="Inventory to match cards"
              title="Dealer inventory becomes buyer-interest cards."
              description="Dealers do not need to create fake buyer demand. They upload real stock, and Reverse Car Market turns it into honest Looking for this? cards."
            />
            <div className="grid gap-4">
              {[
                [Upload, 'Dealer uploads inventory', '2019 Corolla, 2018 Mazda 3, 2020 i30, 2017 Cerato'],
                [Database, 'System groups the stock', 'Reliable hatchbacks under $20k'],
                [FileText, 'Dealer Match Card is generated', 'Looking for a reliable hatchback under $20k?'],
                [Sparkles, 'Buyer raises their hand', "Yes, I'm looking for this"],
                [BadgeCheck, 'Dealer receives lead', 'A real buyer-interest record is created'],
              ].map(([Icon, title, text]) => {
                const IconComponent = Icon as typeof Upload;
                return (
                  <div key={title as string} className="flex gap-4 rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
                      <IconComponent size={21} />
                    </span>
                    <div>
                      <h3 className="font-black text-navy">{title as string}</h3>
                      <p className="mt-1 text-sm text-charcoal/65">{text as string}</p>
                    </div>
                  </div>
                );
              })}
              <DealerPromptDisclaimer />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <SectionHeader
            title="High-value purchases need high trust."
            description="Reverse Car Market is designed to prevent fake demand, spam and disguised listings."
          />
          <div className="mt-10">
            <TrustChecklist />
          </div>
          <p className="mt-6 rounded-lg bg-navy p-5 text-sm font-semibold leading-6 text-white/78">
            Dealer Match Cards are not fake buyer posts. They are clearly labelled dealer-created prompts based on real inventory.
          </p>
        </Container>
      </section>

      <section className="section-pad bg-ice">
        <Container>
          <SectionHeader
            align="center"
            title="This is not Carsales. This is not Marketplace. This is not Gumtree."
            description="Those platforms show cars for sale. Reverse Car Market shows buyer demand first."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['Carsales / Marketplace', 'Inventory-first', 'Sellers list. Buyers search.'],
              ['Classifieds', 'Clutter-first', 'Anyone posts anything. Buyers sort through the noise.'],
              ['Reverse Car Market', 'Demand-first', 'Buyers create demand. Sellers match it.'],
            ].map(([title, label, text]) => (
              <div key={title} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
                <p className="text-sm font-black uppercase text-blue">{label}</p>
                <h3 className="mt-4 text-xl font-black text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/68">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink to="/how-it-works" variant="dark">
              See How It Works
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-navy text-white">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber">Founding dealer pilot</p>
              <h2 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">Founding dealers join free during pilot.</h2>
              <p className="mt-5 max-w-2xl text-white/70">Send us your current stock. We'll turn it into Dealer Match Cards and test buyer interest before subscriptions begin.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {['Upload CSV, spreadsheet or paste inventory', 'Generate Dealer Match Cards', 'Receive buyer-interest leads', 'Founding dealer badge', 'Discounted subscription after pilot'].map((item) => (
                  <span key={item} className="rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-white/78">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink to="/dealers/founding" variant="secondary">
                  Apply as Founding Dealer
                </ButtonLink>
                <p className="mt-3 text-sm text-white/55">No setup fee. No subscription during pilot.</p>
              </div>
            </div>
            <div className="rounded-lg bg-white p-5 text-navy shadow-card">
              <DealerMatchCardView card={dealerMatchCards[2]} action={false} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <div className="rounded-lg bg-ice p-8 text-center shadow-soft ring-1 ring-charcoal/10 md:p-12">
            <h2 className="text-4xl font-black text-navy lg:text-5xl">Ready to flip the car market?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-charcoal/70">
              Whether you're buying or selling, Reverse Car Market starts with what people actually want.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/buyer/create-wanted-card">Post a Car Wanted</ButtonLink>
              <ButtonLink to="/browse" variant="secondary">
                Browse Dealer Match Cards
              </ButtonLink>
              <ButtonLink to="/dealers/founding" variant="dark">
                Join as Founding Dealer
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ScenarioCard({
  badge,
  title,
  note,
  flow,
  cta,
  to,
  children,
}: {
  badge: string;
  title: string;
  note: string;
  flow: string;
  cta: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg bg-ice p-5 shadow-soft ring-1 ring-charcoal/10">
      <span className="rounded-md bg-white px-3 py-1 text-xs font-black uppercase text-blue">{badge}</span>
      <h3 className="mt-4 text-2xl font-black text-navy">{title}</h3>
      <div className="mt-5">{children}</div>
      <p className="mt-5 text-sm font-bold text-charcoal/70">{flow}</p>
      <p className="mt-2 text-sm text-charcoal/58">{note}</p>
      <Link to={to} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue">
        {cta} <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function BenefitSection({
  eyebrow,
  title,
  description,
  benefits,
  cta,
  to,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[][];
  cta: string;
  to: string;
  dark?: boolean;
}) {
  return (
    <section className={dark ? 'section-pad bg-navy text-white' : 'section-pad bg-ice'}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className={dark ? 'text-sm font-black uppercase tracking-[0.18em] text-amber' : 'text-sm font-black uppercase tracking-[0.18em] text-blue'}>{eyebrow}</p>
            <h2 className={dark ? 'mt-4 text-4xl font-black leading-tight text-white' : 'mt-4 text-4xl font-black leading-tight text-navy'}>{title}</h2>
            <p className={dark ? 'mt-4 text-lg leading-8 text-white/68' : 'mt-4 text-lg leading-8 text-charcoal/70'}>{description}</p>
            <div className="mt-8">
              <ButtonLink to={to} variant={dark ? 'secondary' : 'primary'}>
                {cta}
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(([benefitTitle, text]) => (
              <div key={benefitTitle} className={dark ? 'rounded-lg bg-white/8 p-5 ring-1 ring-white/10' : 'rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10'}>
                <CircleDollarSign className={dark ? 'h-6 w-6 text-amber' : 'h-6 w-6 text-blue'} />
                <h3 className={dark ? 'mt-4 text-lg font-black text-white' : 'mt-4 text-lg font-black text-navy'}>{benefitTitle}</h3>
                <p className={dark ? 'mt-2 text-sm leading-6 text-white/65' : 'mt-2 text-sm leading-6 text-charcoal/68'}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
