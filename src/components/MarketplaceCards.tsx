import { AlertTriangle, BadgeCheck, Car, CheckCircle2, Clock, Eye, MapPin, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { dealers, inventoryItems } from '../data/demo';
import { formatCurrency, formatNumber, cx } from '../lib/format';
import type { BuyerWantedCard, DealerMatchCard, DealerResponse, InventoryItem, MatchScore } from '../types';
import { ButtonLink } from './Button';

function Chip({ children, tone = 'slate' }: { children: ReactNode; tone?: 'blue' | 'amber' | 'green' | 'slate' | 'dark' }) {
  const tones = {
    blue: 'bg-blue text-white',
    amber: 'bg-amber text-navy',
    green: 'bg-green text-white',
    slate: 'bg-charcoal/5 text-charcoal/75',
    dark: 'bg-navy text-white',
  };
  return <span className={cx('inline-flex items-center rounded-md px-2.5 py-1 text-xs font-black', tones[tone])}>{children}</span>;
}

function timeframeChip(timeframe: string) {
  if (/now|ready/i.test(timeframe)) return 'Now';
  return timeframe;
}

function timeframeIntent(timeframe: string) {
  if (/ready this month/i.test(timeframe)) return 'this month';
  if (/ready now|now/i.test(timeframe)) return 'now';
  return timeframe.toLowerCase();
}

function transmissionChip(transmission?: string) {
  if (!transmission) return undefined;
  return transmission.toLowerCase() === 'automatic' ? 'Auto' : transmission;
}

function buyerIntentLine(card: BuyerWantedCard) {
  const timeframe = timeframeIntent(card.buyingTimeframe);
  const location = card.location ? ` near ${card.location}` : '';
  return `Buyer is ready ${timeframe}${location}.`;
}

export function BuyerWantedCardView({
  card,
  compact = false,
  action = true,
}: {
  card: BuyerWantedCard;
  compact?: boolean;
  action?: boolean;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border-2 border-blue/20 bg-white p-6 shadow-[0_24px_70px_rgba(47,107,255,0.14)]">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-blue" />
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="blue">READY TO BUY</Chip>
        <Chip tone={card.status === 'open' ? 'green' : 'slate'}>{card.status}</Chip>
      </div>
      <h3 className="mt-5 text-2xl font-black leading-[1.05] text-navy">{card.title}</h3>
      <p className="mt-4 text-sm font-semibold leading-6 text-charcoal/70">{buyerIntentLine(card)}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip>Budget: {card.budgetMax ? formatCurrency(card.budgetMax, true) : 'open'}</Chip>
        <Chip>Location: {card.location ?? 'Any location'}</Chip>
        <Chip>Timeframe: {timeframeChip(card.buyingTimeframe)}</Chip>
        {transmissionChip(card.transmission) ? <Chip>{transmissionChip(card.transmission)}</Chip> : null}
        {card.maxKilometres ? <Chip>{formatNumber(card.maxKilometres)}km max</Chip> : null}
      </div>
      {action ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to={`/dealer/respond/${card.id}`} variant="dark">
            <Car size={17} /> Reply with a Car
          </ButtonLink>
          <ButtonLink to={`/buyer/wanted/${card.id}`} variant="secondary">
            View post
          </ButtonLink>
        </div>
      ) : null}
    </article>
  );
}

export function DealerMatchCardView({
  card,
  compact = false,
  action = true,
}: {
  card: DealerMatchCard;
  compact?: boolean;
  action?: boolean;
}) {
  const dealer = dealers.find((item) => item.id === card.dealerId);
  return (
    <article className="relative overflow-hidden rounded-2xl border-2 border-amber/45 bg-[#fff8ea] p-6 shadow-[0_24px_70px_rgba(245,165,36,0.16)]">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-amber" />
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="amber">SELLER POST</Chip>
        <Chip tone={dealer?.verifiedStatus === 'verified' ? 'green' : 'slate'}>
          <BadgeCheck size={13} className="mr-1" />
          {dealer?.verifiedStatus === 'verified' ? 'Verified Dealer' : 'Private Seller'}
        </Chip>
      </div>
      <h3 className="mt-5 text-2xl font-black leading-[1.05] text-navy">{card.title}</h3>
      <p className="mt-4 text-sm font-semibold leading-6 text-charcoal/70">{compact ? 'A seller has a vehicle that may match this search.' : 'A seller has a vehicle that may match this search.'}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip tone="amber">
          Price: {formatCurrency(card.priceMin, true)}-{formatCurrency(card.priceMax, true)}
        </Chip>
        <Chip>{card.location}</Chip>
        <Chip>
          Year: {card.yearMin ?? 'Any'}-{card.yearMax ?? 'Any'}
        </Chip>
        <Chip>{card.kmMax ? `Typical km under ${formatNumber(card.kmMax)}` : 'Flexible km'}</Chip>
        <Chip>{card.buyerUseCase}</Chip>
      </div>
      <p className="mt-5 border-t border-amber/25 pt-4 text-xs font-black uppercase tracking-[0.08em] text-charcoal/62">
        Created from real vehicle details.
      </p>
      {action ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to={`/interest/${card.id}`} variant="primary">
            <Sparkles size={17} /> {card.ctaText}
          </ButtonLink>
          <ButtonLink to="/buyer/create-wanted-card" variant="secondary">
            Post What You Want
          </ButtonLink>
        </div>
      ) : null}
    </article>
  );
}

export function HeroCardStack() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="rounded-lg bg-white p-6 shadow-border">
        <div className="flex items-center justify-between gap-4">
          <Chip tone="blue">READY TO BUY</Chip>
          <span className="text-xs font-bold uppercase text-green">Open</span>
        </div>
        <h2 className="mt-5 text-2xl font-black text-navy">Toyota Corolla under $20k</h2>
        <p className="mt-3 text-sm font-semibold text-charcoal/70">Buyer is ready this month near Gold Coast.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Budget: $20k', 'Location: Gold Coast', 'Timeframe: Now', 'Auto', '120,000km max'].map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </div>
      <div className="mx-auto h-10 w-px bg-blue/30" />
      <div className="ml-auto max-w-md rounded-lg border border-green/20 bg-white p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <Chip tone="green">Dealer Response</Chip>
          <Chip tone="green">Strong Match</Chip>
        </div>
        <h3 className="mt-4 text-lg font-black text-navy">2019 Toyota Corolla Ascent Sport</h3>
        <p className="mt-2 text-sm text-charcoal/70">$19,990 / 88,000km / Automatic</p>
      </div>
    </div>
  );
}

export function OfferComparisonTable({ responses }: { responses: DealerResponse[] }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-charcoal/10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-charcoal/10 text-left text-sm">
          <thead className="bg-ice text-xs uppercase text-charcoal/60">
            <tr>
              {['Car', 'Dealer/Seller', 'Price', 'Km', 'Year', 'Location', 'Warranty', 'Match', 'Warnings', 'Actions'].map((heading) => (
                <th key={heading} className="px-4 py-3 font-black">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {responses.map((response) => {
              const vehicle = inventoryItems.find((item) => item.id === response.inventoryItemId);
              const dealer = dealers.find((item) => item.id === response.dealerId);
              return (
                <tr key={response.id} className="align-top">
                  <td className="px-4 py-4 font-bold text-navy">
                    {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Manual offer'}
                  </td>
                  <td className="px-4 py-4">{dealer?.businessName ?? 'Private seller'}</td>
                  <td className="px-4 py-4">{formatCurrency(response.price)}</td>
                  <td className="px-4 py-4">{formatNumber(vehicle?.kilometres)}</td>
                  <td className="px-4 py-4">{vehicle?.year ?? 'TBC'}</td>
                  <td className="px-4 py-4">{vehicle?.location ?? 'TBC'}</td>
                  <td className="px-4 py-4">{response.warrantyDetails}</td>
                  <td className="px-4 py-4">
                    <MatchBadge score={response.matchScore} />
                  </td>
                  <td className="px-4 py-4">
                    {response.warnings.length ? response.warnings.join(', ') : 'None'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-md bg-green px-3 py-2 text-xs font-bold text-white">Accept</button>
                      <button className="rounded-md bg-charcoal/5 px-3 py-2 text-xs font-bold text-charcoal">Reject</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function InventoryMiniCard({ item, selected = false, onClick }: { item: InventoryItem; selected?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'w-full rounded-lg border bg-white p-4 text-left shadow-soft transition',
        selected ? 'border-blue ring-2 ring-blue/20' : 'border-charcoal/10 hover:border-blue/40',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-black text-navy">
            {item.year} {item.make} {item.model} {item.badge}
          </p>
          <p className="mt-1 text-sm text-charcoal/65">
            {formatCurrency(item.price)} / {formatNumber(item.kilometres)}km / {item.transmission}
          </p>
        </div>
        <Chip tone={item.status === 'active' ? 'green' : 'slate'}>{item.status}</Chip>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip>{item.bodyType}</Chip>
        <Chip>{item.fuelType}</Chip>
        <Chip>{item.location}</Chip>
      </div>
    </button>
  );
}

export function MatchBadge({ score }: { score: MatchScore }) {
  const tone = {
    'Strong match': 'bg-green/10 text-green',
    'Good match': 'bg-blue/10 text-blue',
    'Partial match': 'bg-amber/15 text-[#8a5a00]',
    'Poor match': 'bg-red-50 text-red-700',
  }[score];

  return <span className={cx('inline-flex rounded-md px-2.5 py-1 text-xs font-black', tone)}>{score}</span>;
}

export function TrustChecklist() {
  const items = [
    ['Verified dealer profiles', ShieldCheck],
    ['Buyer contact visibility controls', Eye],
    ['No fake buyer posts', CheckCircle2],
    ['Seller posts are clearly labelled', BadgeCheck],
    ['No scraping third-party sites', AlertTriangle],
    ['Match-score warnings', MessageSquare],
    ['Buyers can close posts anytime', Clock],
    ['PPSR and car history guidance', MapPin],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([label, Icon]) => {
        const IconComponent = Icon as typeof ShieldCheck;
        return (
          <div key={label as string} className="rounded-lg bg-white p-4 shadow-soft ring-1 ring-charcoal/10">
            <IconComponent className="h-5 w-5 text-blue" />
            <p className="mt-3 text-sm font-bold text-navy">{label as string}</p>
          </div>
        );
      })}
    </div>
  );
}

export function DealerPromptDisclaimer() {
  return (
    <div className="rounded-lg border border-amber/30 bg-amber/10 p-4 text-sm leading-6 text-charcoal/75">
      <strong className="text-navy">No fake demand:</strong> Buyer posts come from real buyers. Seller posts come from real vehicle details.
    </div>
  );
}

export function CardLinkList({ cards }: { cards: DealerMatchCard[] }) {
  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <Link key={card.id} to={`/interest/${card.id}`} className="block rounded-lg bg-white p-4 shadow-soft ring-1 ring-charcoal/10 transition hover:-translate-y-0.5">
          <p className="text-xs font-bold uppercase text-amber">Seller Post</p>
          <p className="mt-1 font-black text-navy">{card.title}</p>
          <p className="mt-2 text-sm text-charcoal/65">{card.interestsCount} buyer-interest leads captured</p>
        </Link>
      ))}
    </div>
  );
}
