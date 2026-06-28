import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell';
import { Button } from '../components/Button';
import { BuyerWantedCardView, InventoryMiniCard, MatchBadge } from '../components/MarketplaceCards';
import { buyerWantedCards, inventoryItems } from '../data/demo';
import { createResponseFromInventory } from '../lib/mockAi';
import { formatCurrency, formatNumber } from '../lib/format';

const navItems: Array<[string, string]> = [
  ['Overview', '/dealer/dashboard'],
  ['Buyer Wanted Cards', '/dealer/dashboard'],
  ['Responses Sent', '/dealer/dashboard'],
  ['Inventory', '/dealer/dashboard'],
];

export function DealerRespondPage() {
  const { wantedCardId } = useParams();
  const card = buyerWantedCards.find((item) => item.id === wantedCardId) ?? buyerWantedCards[0];
  const [selectedId, setSelectedId] = useState(inventoryItems[0].id);
  const response = useMemo(() => createResponseFromInventory(card, selectedId), [card, selectedId]);

  return (
    <DashboardShell title="Respond to Buyer Wanted Card" description="Select one of your inventory items or enter a vehicle manually. Responses are scored against the buyer's criteria." navItems={navItems}>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="grid h-fit gap-5">
          <BuyerWantedCardView card={card} action={false} />
          {response ? (
            <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
              <h2 className="text-xl font-black text-navy">Match preview</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <MatchBadge score={response.matchScore} />
                <span className="text-sm font-bold text-charcoal/65">{response.percentage}% criteria fit</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-charcoal/70">{response.matchSummary}</p>
              <div className="mt-4 grid gap-2 text-sm text-charcoal/65">
                <p>{formatCurrency(response.vehicle.price)} · {formatNumber(response.vehicle.kilometres)}km · {response.vehicle.location}</p>
                <p>Warnings: {response.warnings.length ? response.warnings.join(', ') : 'None'}</p>
              </div>
            </div>
          ) : null}
        </div>
        <form className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-charcoal/10">
          <h2 className="text-2xl font-black text-navy">Choose matching vehicle</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {inventoryItems.map((item) => (
              <InventoryMiniCard key={item.id} item={item} selected={item.id === selectedId} onClick={() => setSelectedId(item.id)} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['Price', String(response?.vehicle.price ?? '')],
              ['Availability', 'Available now'],
              ['Warranty details', response?.vehicle.warrantyDetails ?? ''],
              ['Service history', response?.vehicle.serviceHistory ?? ''],
            ].map(([label, value]) => (
              <label key={label} className="grid gap-2 text-sm font-bold text-navy">
                {label}
                <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" defaultValue={value} />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-bold text-navy md:col-span-2">
              Message
              <textarea className="min-h-28 rounded-lg border border-charcoal/15 px-3 py-3 font-normal text-charcoal" defaultValue={response?.matchSummary} />
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-navy">
              <input type="checkbox" defaultChecked /> Inspection available
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button">Submit response</Button>
            <Button type="button" variant="secondary">
              Save draft
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
