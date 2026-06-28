import { DashboardShell } from '../components/DashboardShell';
import { BuyerWantedCardView, DealerMatchCardView } from '../components/MarketplaceCards';
import { StatCard } from '../components/Section';
import { buyerInterests, buyerWantedCards, dealerMatchCards, dealerResponses, dealers, inventoryItems, outreachCopy, users } from '../data/demo';

const navItems: Array<[string, string]> = [
  ['Overview', '/admin/dashboard'],
  ['Users', '/admin/dashboard'],
  ['Dealers', '/admin/dashboard'],
  ['Dealer Verification', '/admin/dashboard'],
  ['Inventory', '/admin/dashboard'],
  ['Buyer Request Cards', '/admin/dashboard'],
  ['Dealer Match Cards', '/admin/dashboard'],
  ['Buyer Interests', '/admin/dashboard'],
  ['Responses', '/admin/dashboard'],
  ['Reports', '/admin/dashboard'],
  ['Subscriptions', '/admin/dashboard'],
  ['Analytics', '/admin/dashboard'],
  ['Outreach Copy', '/admin/dashboard'],
];

export function AdminDashboardPage() {
  return (
    <DashboardShell title="Admin Dashboard" description="Moderate cards, verify dealers, review leads and inspect conversion analytics." navItems={navItems}>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Buyers" value={String(users.filter((user) => user.role === 'buyer').length)} />
          <StatCard label="Dealers" value={String(dealers.length)} tone="green" />
          <StatCard label="Inventory Uploaded" value={String(inventoryItems.length)} tone="amber" />
          <StatCard label="Dealer Match Cards" value={String(dealerMatchCards.length)} tone="dark" />
          <StatCard label="Buyer Request Cards" value={String(buyerWantedCards.length)} />
          <StatCard label="Buyer Interests" value={String(buyerInterests.length)} tone="green" />
          <StatCard label="Dealer Responses" value={String(dealerResponses.length)} tone="amber" />
          <StatCard label="Conversion" value="6.8%" tone="dark" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
            <h2 className="text-2xl font-black text-navy">Dealer verification queue</h2>
            <div className="mt-4 grid gap-3">
              {dealers.map((dealer) => (
                <div key={dealer.id} className="rounded-lg bg-ice p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-navy">{dealer.businessName}</p>
                      <p className="text-sm text-charcoal/60">{dealer.location} / {dealer.dealerLicense}</p>
                    </div>
                    <span className="rounded-md bg-blue/10 px-3 py-1 text-xs font-black uppercase text-blue">{dealer.verifiedStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
            <h2 className="text-2xl font-black text-navy">Top searched terms</h2>
            <div className="mt-4 grid gap-2">
              {['Toyota Corolla under 20k', 'family SUV under 35k', 'first car under 18k', 'hybrid SUV under 45k', 'work ute under 40k'].map((term, index) => (
                <div key={term} className="flex items-center justify-between rounded-lg bg-ice px-4 py-3 text-sm font-bold text-charcoal/72">
                  <span>{term}</span>
                  <span>{132 - index * 19}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <BuyerWantedCardView card={buyerWantedCards[0]} action={false} />
          <DealerMatchCardView card={dealerMatchCards[1]} action={false} />
        </div>
        <div className="rounded-lg bg-navy p-6 text-white shadow-card">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber">Dealer outreach copy</p>
          <h2 className="mt-3 text-2xl font-black">{outreachCopy.subject}</h2>
          <pre className="mt-5 whitespace-pre-wrap rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/75">{outreachCopy.body}</pre>
        </div>
      </div>
    </DashboardShell>
  );
}
