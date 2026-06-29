import { DashboardShell } from '../components/DashboardShell';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, DealerMatchCardView, InventoryMiniCard } from '../components/MarketplaceCards';
import { StatCard } from '../components/Section';
import { buyerInterests, buyerWantedCards, dealerMatchCards, dealerResponses, inventoryItems } from '../data/demo';
import { generateDealerMatchCardsFromInventory } from '../lib/mockAi';

const navItems: Array<[string, string]> = [
  ['Overview', '/dealer/dashboard'],
  ['Inventory', '/dealer/dashboard'],
  ['Upload Inventory', '/dealer/inventory/upload'],
  ['Dealer Match Cards', '/dealer/dashboard'],
  ['Ready-to-Buy Cards', '/dealer/dashboard'],
  ['Buyer Interest Leads', '/dealer/dashboard'],
  ['Responses Sent', '/dealer/dashboard'],
  ['Saved Searches', '/dealer/dashboard'],
  ['Subscription', '/dealer/dashboard'],
  ['Dealer Profile', '/dealer/dashboard'],
  ['Team Settings', '/dealer/dashboard'],
];

export function DealerDashboardPage() {
  const generatedCards = generateDealerMatchCardsFromInventory(inventoryItems.filter((item) => item.dealerId === 'dealer-northern-rivers')).slice(0, 3);

  return (
    <DashboardShell title="Dealer Dashboard" description="Upload owned inventory, generate clearly labelled Dealer Match Cards and respond to real buyer demand." navItems={navItems}>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Inventory Items" value={String(inventoryItems.length)} />
          <StatCard label="Match Cards" value={String(dealerMatchCards.length)} tone="amber" />
          <StatCard label="Buyer Leads" value={String(buyerInterests.length)} tone="green" />
          <StatCard label="Responses Sent" value={String(dealerResponses.length)} tone="dark" />
        </div>
        <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-navy">Inventory</h2>
              <p className="mt-1 text-sm text-charcoal/60">Only upload inventory you own or have permission to represent.</p>
            </div>
            <ButtonLink to="/dealer/inventory/upload">Upload Inventory</ButtonLink>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {inventoryItems.slice(0, 4).map((item) => (
              <InventoryMiniCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
          <h2 className="text-2xl font-black text-navy">Generated Dealer Match Card drafts</h2>
          <p className="mt-1 text-sm text-charcoal/60">Review wording before publishing. These are dealer-created from real inventory.</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {generatedCards.map((card) => (
              <DealerMatchCardView key={card.id} card={card} />
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
          <h2 className="text-2xl font-black text-navy">Open public Ready-to-Buy Cards</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {buyerWantedCards.slice(0, 4).map((card) => (
              <BuyerWantedCardView key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
