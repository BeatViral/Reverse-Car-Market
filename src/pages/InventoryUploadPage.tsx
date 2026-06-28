import { useMemo, useState } from 'react';
import { DashboardShell } from '../components/DashboardShell';
import { Button } from '../components/Button';
import { DealerMatchCardView, InventoryMiniCard } from '../components/MarketplaceCards';
import { inventoryItems } from '../data/demo';
import { generateDealerMatchCardsFromInventory } from '../lib/mockAi';
import { cx } from '../lib/format';

const navItems: Array<[string, string]> = [
  ['Overview', '/dealer/dashboard'],
  ['Inventory', '/dealer/dashboard'],
  ['Upload Inventory', '/dealer/inventory/upload'],
  ['Dealer Match Cards', '/dealer/dashboard'],
  ['Buyer Request Cards', '/dealer/dashboard'],
  ['Subscription', '/dealer/dashboard'],
];

const modes = ['Manual entry', 'CSV upload', 'Paste inventory text', 'Inventory URL'] as const;

export function InventoryUploadPage() {
  const [mode, setMode] = useState<(typeof modes)[number]>('Manual entry');
  const generated = useMemo(() => generateDealerMatchCardsFromInventory(inventoryItems.filter((item) => item.dealerId === 'dealer-northern-rivers')).slice(0, 4), []);

  return (
    <DashboardShell title="Upload Inventory" description="Add dealer-owned stock, then generate honest Dealer Match Cards from that inventory." navItems={navItems}>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
          <div className="rounded-lg bg-amber/10 p-4 text-sm font-semibold leading-6 text-charcoal/75">
            Only upload inventory you own or have permission to use. Do not scrape Carsales or third-party sites.
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {modes.map((item) => (
              <button key={item} type="button" onClick={() => setMode(item)} className={cx('rounded-lg px-4 py-3 text-sm font-black', mode === item ? 'bg-blue text-white' : 'bg-ice text-charcoal/70')}>
                {item}
              </button>
            ))}
          </div>
          {mode === 'Manual entry' ? <ManualInventoryForm /> : null}
          {mode === 'CSV upload' ? <UploadBox label="Drop CSV or spreadsheet here" /> : null}
          {mode === 'Paste inventory text' ? (
            <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
              Paste inventory text
              <textarea className="min-h-56 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="2019 Toyota Corolla Ascent Sport, $19,990, 88,000km..." />
            </label>
          ) : null}
          {mode === 'Inventory URL' ? (
            <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
              Inventory URL with permission note
              <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="https://yourdealership.example/inventory" />
              <span className="text-xs font-semibold text-charcoal/50">Use only URLs for inventory you own or have explicit permission to represent.</span>
            </label>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button">Save inventory</Button>
            <Button type="button" variant="secondary">
              Generate Match Cards
            </Button>
          </div>
        </div>
        <aside className="grid h-fit gap-5">
          <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
            <h2 className="text-xl font-black text-navy">Current inventory sample</h2>
            <div className="mt-4 grid gap-3">
              {inventoryItems.slice(0, 3).map((item) => (
                <InventoryMiniCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {generated.slice(0, 2).map((card) => (
              <DealerMatchCardView key={card.id} card={card} />
            ))}
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function ManualInventoryForm() {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {[
        ['Make', 'Toyota'],
        ['Model', 'Corolla'],
        ['Badge/trim', 'Ascent Sport'],
        ['Year', '2019'],
        ['Price', '19990'],
        ['Kilometres', '88000'],
        ['Body type', 'Hatchback'],
        ['Fuel type', 'Petrol'],
        ['Transmission', 'Automatic'],
        ['Drivetrain', 'FWD'],
        ['Colour', 'White'],
        ['Location', 'Northern Rivers'],
        ['Rego status', 'Registered'],
        ['VIN optional', 'Optional'],
        ['Stock number', 'NRA-1028'],
        ['Status', 'active'],
      ].map(([label, placeholder]) => (
        <label key={label} className="grid gap-2 text-sm font-bold text-navy">
          {label}
          <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder={placeholder} />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-bold text-navy md:col-span-2">
        Service history
        <textarea className="min-h-20 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="Full service history" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-navy md:col-span-2">
        Warranty details
        <textarea className="min-h-20 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="3 month statutory warranty" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-navy md:col-span-2">
        Description
        <textarea className="min-h-24 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="Clean Corolla hatch..." />
      </label>
      <label className="grid gap-2 text-sm font-bold text-navy md:col-span-2">
        Photo URLs
        <textarea className="min-h-20 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" placeholder="One URL per line" />
      </label>
    </div>
  );
}

function UploadBox({ label }: { label: string }) {
  return (
    <div className="mt-5 rounded-lg border border-dashed border-blue/45 bg-blue/5 p-10 text-center">
      <p className="text-sm font-black text-blue">{label}</p>
      <p className="mt-2 text-xs font-semibold text-charcoal/55">CSV parsing can map columns to the inventory schema before saving.</p>
    </div>
  );
}
