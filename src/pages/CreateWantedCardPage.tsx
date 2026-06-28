import { useMemo, useState } from 'react';
import { DashboardShell } from '../components/DashboardShell';
import { Button } from '../components/Button';
import { BuyerWantedCardView } from '../components/MarketplaceCards';
import { detectMissingQuestions, structureWantedRequest } from '../lib/mockAi';
import type { BuyerWantedCard } from '../types';

const navItems: Array<[string, string]> = [
  ['Overview', '/buyer/dashboard'],
  ['Create Wanted Card', '/buyer/create-wanted-card'],
  ['Offers Received', '/buyer/dashboard'],
  ['Messages', '/buyer/dashboard'],
  ['Account Settings', '/buyer/dashboard'],
];

export function CreateWantedCardPage() {
  const [request, setRequest] = useState('I need a Toyota Corolla under $20k near Gold Coast, automatic and reliable.');
  const structured = useMemo(() => structureWantedRequest(request), [request]);
  const questions = useMemo(() => detectMissingQuestions(structured), [structured]);

  const preview: BuyerWantedCard = {
    id: 'preview-card',
    buyerId: 'preview-buyer',
    title: structured.title ?? 'Wanted: car',
    naturalLanguageRequest: request,
    make: structured.make,
    model: structured.model,
    bodyType: structured.bodyType,
    fuelType: structured.fuelType,
    transmission: structured.transmission,
    minYear: structured.minYear,
    maxYear: structured.maxYear,
    maxKilometres: structured.maxKilometres ?? 120000,
    budgetMin: structured.budgetMin,
    budgetMax: structured.budgetMax,
    location: structured.location,
    radiusKm: structured.radiusKm ?? 100,
    sellerTypePreference: structured.sellerTypePreference ?? 'both',
    mustHaves: structured.mustHaves ?? [],
    dealbreakers: structured.dealbreakers ?? [],
    buyingTimeframe: structured.buyingTimeframe ?? 'Exploring',
    contactPreference: structured.contactPreference ?? 'Message first',
    maxSellerResponses: structured.maxSellerResponses ?? 8,
    publicVisibility: structured.publicVisibility ?? true,
    status: 'open',
    aiSummary: structured.aiSummary ?? 'Preview wanted card.',
    createdAt: new Date().toISOString(),
  };

  return (
    <DashboardShell title="Create Wanted Card" description="Type naturally, then refine the structured criteria sellers will match against." navItems={navItems}>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <form className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
          <label className="grid gap-2 text-sm font-black text-navy">
            Natural language request
            <textarea
              value={request}
              onChange={(event) => setRequest(event.target.value)}
              className="min-h-32 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal"
              placeholder="I need a Toyota Corolla under $20k near Gold Coast."
            />
          </label>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ['Make', structured.make ?? 'Toyota'],
              ['Model', structured.model ?? 'Corolla'],
              ['Body type', structured.bodyType ?? 'Hatchback'],
              ['Fuel type', structured.fuelType ?? 'Petrol'],
              ['Transmission', structured.transmission ?? 'Automatic'],
              ['Min year', String(structured.minYear ?? '')],
              ['Max year', String(structured.maxYear ?? '')],
              ['Max kilometres', String(structured.maxKilometres ?? '120000')],
              ['Budget min', String(structured.budgetMin ?? '')],
              ['Budget max', String(structured.budgetMax ?? '20000')],
              ['Location', structured.location ?? 'Gold Coast'],
              ['Radius km', String(structured.radiusKm ?? 100)],
              ['Seller type preference', structured.sellerTypePreference ?? 'both'],
              ['Buying timeframe', structured.buyingTimeframe ?? 'Ready this month'],
              ['Contact preference', structured.contactPreference ?? 'Message first'],
              ['Max seller responses', String(structured.maxSellerResponses ?? 8)],
            ].map(([label, value]) => (
              <label key={label} className="grid gap-2 text-sm font-bold text-navy">
                {label}
                <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" defaultValue={value} />
              </label>
            ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-navy">
              Must-haves
              <textarea className="min-h-24 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" defaultValue={preview.mustHaves.join(', ')} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              Dealbreakers
              <textarea className="min-h-24 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" defaultValue={preview.dealbreakers.join(', ')} />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm font-bold text-navy">
              <input type="checkbox" defaultChecked /> Public visibility
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-navy">
              <input type="checkbox" defaultChecked /> Allow dealer responses
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button">Create Wanted Card</Button>
            <Button type="button" variant="secondary">
              Save draft
            </Button>
          </div>
        </form>
        <aside className="grid h-fit gap-5">
          <BuyerWantedCardView card={preview} action={false} />
          <div className="rounded-lg bg-amber/10 p-5 shadow-soft ring-1 ring-amber/20">
            <h2 className="font-black text-navy">Suggested missing questions</h2>
            <div className="mt-3 grid gap-2">
              {(questions.length ? questions : ['You have enough detail to publish this card.']).map((question) => (
                <p key={question} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-charcoal/70">
                  {question}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}
