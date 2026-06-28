import { Link } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell';
import { ButtonLink } from '../components/Button';
import { BuyerWantedCardView, OfferComparisonTable } from '../components/MarketplaceCards';
import { StatCard } from '../components/Section';
import { buyerWantedCards, dealerResponses } from '../data/demo';
import { useAuth } from '../context/AuthContext';

const navItems: Array<[string, string]> = [
  ['Overview', '/buyer/dashboard'],
  ['My Request Cards', '/buyer/dashboard'],
  ['Create Request Card', '/buyer/create-wanted-card'],
  ['Offers Received', '/buyer/dashboard'],
  ['Compare Offers', '/buyer/dashboard'],
  ['Saved Offers', '/buyer/dashboard'],
  ['Messages', '/buyer/dashboard'],
  ['Account Settings', '/buyer/dashboard'],
];

export function BuyerDashboardPage() {
  const { user } = useAuth();
  const cards = buyerWantedCards.filter((card) => card.buyerId === user.id || user.role === 'admin').slice(0, 3);

  return (
    <DashboardShell title="Buyer Dashboard" description="Manage Request Cards, compare offers and control when sellers can contact you." navItems={navItems}>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Open Request Cards" value={String(cards.length || buyerWantedCards.length)} />
          <StatCard label="Offers Received" value={String(dealerResponses.length)} tone="green" />
          <StatCard label="Saved Offers" value="4" tone="amber" />
          <StatCard label="Messages" value="7" tone="dark" />
        </div>
        <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-navy">My Request Cards</h2>
              <p className="mt-1 text-sm text-charcoal/60">Cards created by real buyers only. Dealers respond underneath each card.</p>
            </div>
            <ButtonLink to="/buyer/create-wanted-card">Create Request Card</ButtonLink>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {(cards.length ? cards : buyerWantedCards.slice(0, 2)).map((card) => (
              <BuyerWantedCardView key={card.id} card={card} />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-navy">Compare Offers</h2>
            <Link to="/buyer/wanted/wanted-corolla-20k" className="text-sm font-black text-blue">
              Open detail
            </Link>
          </div>
          <OfferComparisonTable responses={dealerResponses} />
        </div>
      </div>
    </DashboardShell>
  );
}
