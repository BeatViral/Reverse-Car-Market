import { buyerWantedCards, dealerMatchCards, inventoryItems } from '../data/demo';
import type { BuyerWantedCard, DealerMatchCard, InventoryItem, MatchScore, SearchIntent } from '../types';

const makes = ['toyota', 'mazda', 'hyundai', 'kia', 'ford', 'holden', 'nissan', 'subaru', 'mitsubishi'];
const models = ['corolla', 'rav4', 'hilux', 'mazda 3', '3', 'i30', 'cerato', 'cx-5', 'tucson', 'sportage'];
const bodyTypes = ['hatchback', 'suv', 'ute', 'sedan', 'wagon', 'van'];
const fuelTypes = ['hybrid', 'diesel', 'petrol', 'electric'];
const locations = ['gold coast', 'northern rivers', 'brisbane', 'sydney', 'melbourne', 'newcastle'];

function titleCase(value?: string) {
  if (!value) return undefined;
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseBudget(text: string) {
  const underMatch = text.match(/(?:under|below|less than|max|maximum|up to)\s*\$?\s*(\d+(?:\.\d+)?)\s*(k|000)?/i);
  const plainKMatch = text.match(/\$?\s*(\d+(?:\.\d+)?)\s*k\b/i);
  const raw = underMatch?.[1] ?? plainKMatch?.[1];
  const suffix = underMatch?.[2] ?? (plainKMatch ? 'k' : undefined);
  if (!raw) return undefined;
  const amount = Number(raw);
  if (Number.isNaN(amount)) return undefined;
  return suffix?.toLowerCase() === 'k' || amount < 1000 ? Math.round(amount * 1000) : Math.round(amount);
}

function findKnown(text: string, knownValues: string[]) {
  const lower = text.toLowerCase();
  return knownValues.find((value) => lower.includes(value));
}

export function parseSearchIntent(raw: string): SearchIntent {
  const lower = raw.toLowerCase();
  const model = findKnown(lower, models);
  const make = findKnown(lower, makes);
  const bodyType = findKnown(lower, bodyTypes);
  const fuelType = findKnown(lower, fuelTypes);
  const location = findKnown(lower, locations);
  const useCase = lower.includes('family')
    ? 'family'
    : lower.includes('first car')
      ? 'first car'
      : lower.includes('work')
        ? 'work'
        : lower.includes('daily')
          ? 'daily driver'
          : undefined;

  return {
    raw,
    make: titleCase(make),
    model: model === '3' ? '3' : titleCase(model),
    bodyType: titleCase(bodyType),
    fuelType: titleCase(fuelType),
    budgetMax: parseBudget(raw),
    location: titleCase(location),
    useCase,
  };
}

export function structureWantedRequest(raw: string): Partial<BuyerWantedCard> {
  const intent = parseSearchIntent(raw);
  const mustHaves = [
    intent.useCase === 'family' ? 'family suitable' : undefined,
    intent.useCase === 'first car' ? 'easy first car' : undefined,
    intent.fuelType === 'Hybrid' ? 'low running cost' : undefined,
    raw.toLowerCase().includes('service') ? 'service history' : undefined,
    raw.toLowerCase().includes('automatic') || raw.toLowerCase().includes('auto') ? 'automatic' : undefined,
    raw.toLowerCase().includes('reliable') ? 'reliable' : undefined,
  ].filter(Boolean) as string[];

  const subject = [intent.make, intent.model].filter(Boolean).join(' ') || intent.bodyType || 'car';
  const budgetText = intent.budgetMax ? ` under $${Math.round(intent.budgetMax / 1000)}k` : '';

  return {
    title: `Wanted: ${subject}${budgetText}`,
    naturalLanguageRequest: raw,
    make: intent.make,
    model: intent.model,
    bodyType: intent.bodyType,
    fuelType: intent.fuelType,
    transmission: raw.toLowerCase().includes('manual') ? 'Manual' : raw.toLowerCase().includes('auto') ? 'Automatic' : undefined,
    budgetMax: intent.budgetMax,
    location: intent.location,
    radiusKm: intent.location ? 100 : undefined,
    sellerTypePreference: raw.toLowerCase().includes('dealer') ? 'dealer only' : 'both',
    mustHaves,
    dealbreakers: raw.toLowerCase().includes('no write') ? ['written-off history'] : [],
    buyingTimeframe: raw.toLowerCase().includes('now') ? 'Ready now' : raw.toLowerCase().includes('month') ? 'Ready this month' : 'Exploring',
    contactPreference: 'Message first',
    maxSellerResponses: 8,
    publicVisibility: true,
    status: 'open',
    aiSummary: `Structured from: “${raw}”`,
  };
}

export function detectMissingQuestions(card: Partial<BuyerWantedCard>) {
  const questions: string[] = [];
  if (!card.budgetMax) questions.push('What is your maximum budget?');
  if (!card.location) questions.push('What location and search radius should sellers use?');
  if (!card.sellerTypePreference) questions.push('Dealer only, private sellers only, or both?');
  if (!card.maxKilometres) questions.push('What is your maximum kilometre preference?');
  if (!card.buyingTimeframe || card.buyingTimeframe === 'Exploring') questions.push('Ready to buy now or later?');
  return questions;
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function priceBandLabel(max: number) {
  return `$${Math.ceil(max / 1000)}k`;
}

function buildCardFromItems(items: InventoryItem[], id: string, title: string, buyerUseCase: string): DealerMatchCard {
  const prices = items.map((item) => item.price);
  const years = items.map((item) => item.year);
  const kms = items.map((item) => item.kilometres);
  const first = items[0];

  return {
    id,
    dealerId: first.dealerId,
    title,
    cardType: 'dealer_match',
    generatedFromInventoryIds: items.map((item) => item.id),
    make: unique(items.map((item) => item.make)).length === 1 ? first.make : undefined,
    model: unique(items.map((item) => item.model)).length === 1 ? first.model : undefined,
    bodyType: unique(items.map((item) => item.bodyType)).length === 1 ? first.bodyType : undefined,
    fuelType: unique(items.map((item) => item.fuelType)).length === 1 ? first.fuelType : undefined,
    transmission: unique(items.map((item) => item.transmission)).length === 1 ? first.transmission : undefined,
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    yearMin: Math.min(...years),
    yearMax: Math.max(...years),
    kmMin: Math.min(...kms),
    kmMax: Math.max(...kms),
    location: unique(items.map((item) => item.location)).join(' / '),
    radiusKm: 120,
    buyerUseCase,
    description: 'A verified dealer has matching stock available. Tell us what you are looking for and we will create real buyer demand from your interest.',
    possibleMatches: unique(items.map((item) => `${item.make} ${item.model}`)),
    ctaText: "Yes, I'm looking for this",
    status: 'draft',
    visibility: 'public',
    viewsCount: 0,
    interestsCount: 0,
    createdAt: new Date().toISOString(),
  };
}

export function generateDealerMatchCardsFromInventory(items: InventoryItem[]) {
  const active = items.filter((item) => item.status === 'active');
  const generated: DealerMatchCard[] = [];

  active.forEach((item) => {
    generated.push(
      buildCardFromItems(
        [item],
        `generated-${item.id}`,
        `Looking for a ${item.make} ${item.model} under ${priceBandLabel(item.price)}?`,
        item.bodyType === 'Ute' ? 'work, trade, towing' : 'daily driver, practical buyer',
      ),
    );
  });

  const byBodyType = active.reduce<Record<string, InventoryItem[]>>((acc, item) => {
    acc[item.bodyType] = [...(acc[item.bodyType] ?? []), item];
    return acc;
  }, {});

  Object.entries(byBodyType).forEach(([bodyType, group]) => {
    if (group.length < 2) return;
    const maxPrice = Math.max(...group.map((item) => item.price));
    generated.push(
      buildCardFromItems(
        group,
        `generated-${bodyType.toLowerCase()}-${maxPrice}`,
        `Looking for a reliable ${bodyType.toLowerCase()} under ${priceBandLabel(maxPrice)}?`,
        bodyType === 'SUV' ? 'family, school run, weekend trips' : 'first car, work commute, daily driver',
      ),
    );
  });

  const firstCarItems = active.filter((item) => item.price <= 18000 && item.transmission === 'Automatic');
  if (firstCarItems.length) {
    generated.push(
      buildCardFromItems(
        firstCarItems,
        'generated-first-car-18k',
        'Looking for a first car under $18k?',
        'first car, student, budget buyer',
      ),
    );
  }

  return generated;
}

function textMatch(needle?: string, haystack?: string) {
  if (!needle || !haystack) return false;
  return haystack.toLowerCase().includes(needle.toLowerCase()) || needle.toLowerCase().includes(haystack.toLowerCase());
}

export function calculateMatchScore(card: BuyerWantedCard, vehicle: InventoryItem) {
  const warnings: string[] = [];
  let points = 0;
  let possible = 0;

  const add = (condition: boolean, warning: string) => {
    possible += 1;
    if (condition) points += 1;
    else warnings.push(warning);
  };

  if (card.make) add(textMatch(card.make, vehicle.make), 'wrong make');
  if (card.model) add(textMatch(card.model, vehicle.model), 'wrong model');
  if (card.bodyType) add(textMatch(card.bodyType, vehicle.bodyType), 'wrong body type');
  if (card.fuelType) add(textMatch(card.fuelType, vehicle.fuelType), 'wrong fuel type');
  if (card.transmission) add(textMatch(card.transmission, vehicle.transmission), 'wrong transmission');
  if (card.budgetMax) add(vehicle.price <= card.budgetMax, 'over budget');
  if (card.maxKilometres) add(vehicle.kilometres <= card.maxKilometres, 'kilometres too high');
  if (card.minYear) add(vehicle.year >= card.minYear, 'year outside range');
  if (card.maxYear) add(vehicle.year <= card.maxYear, 'year outside range');
  if (card.location) add(textMatch(card.location, vehicle.location) || (card.radiusKm ?? 0) >= 100, 'location too far');
  add(Boolean(vehicle.serviceHistory), 'missing service history');
  add(Boolean(vehicle.warrantyDetails), 'missing warranty details');
  add(Boolean(vehicle.price), 'missing price');

  const ratio = possible ? points / possible : 0.5;
  const matchScore: MatchScore = ratio >= 0.84 ? 'Strong match' : ratio >= 0.68 ? 'Good match' : ratio >= 0.42 ? 'Partial match' : 'Poor match';

  return {
    matchScore,
    warnings,
    percentage: Math.round(ratio * 100),
    matchSummary: summarizeOffer(card, vehicle, matchScore, warnings),
  };
}

export function summarizeOffer(card: BuyerWantedCard, vehicle: InventoryItem, score: MatchScore, warnings: string[]) {
  const car = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.badge}`.trim();
  if (warnings.length === 0) {
    return `${car} is a ${score.toLowerCase()} because it matches the buyer's budget, criteria and location.`;
  }
  const warningText = warnings.slice(0, 2).join(' and ');
  return `${car} is a ${score.toLowerCase()}. It matches key parts of the request, but note: ${warningText}.`;
}

function cardMatchesIntent(card: DealerMatchCard | BuyerWantedCard, intent: SearchIntent) {
  const haystack = [
    card.title,
    'description' in card ? card.description : card.aiSummary,
    card.make,
    card.model,
    card.bodyType,
    card.fuelType,
    card.location,
    'buyerUseCase' in card ? card.buyerUseCase : card.buyingTimeframe,
    'possibleMatches' in card ? card.possibleMatches.join(' ') : card.mustHaves.join(' '),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const tokens = [intent.make, intent.model, intent.bodyType, intent.fuelType, intent.location, intent.useCase]
    .filter(Boolean)
    .map((value) => value!.toLowerCase());
  const textHit = tokens.length === 0 || tokens.some((token) => haystack.includes(token));
  let budgetHit = true;
  if (intent.budgetMax) {
    budgetHit =
      'cardType' in card
        ? (card.priceMin ?? 0) <= intent.budgetMax + 3000
        : (card.budgetMax ?? intent.budgetMax) <= intent.budgetMax + 5000;
  }

  return textHit && budgetHit;
}

export function searchMarketplace(query: string) {
  const intent = parseSearchIntent(query);
  return {
    intent,
    dealerMatches: dealerMatchCards.filter((card) => card.status === 'published' && cardMatchesIntent(card, intent)),
    wantedCards: buyerWantedCards.filter((card) => card.publicVisibility && card.status === 'open' && cardMatchesIntent(card, intent)),
  };
}

export function createResponseFromInventory(card: BuyerWantedCard, inventoryItemId: string) {
  const vehicle = inventoryItems.find((item) => item.id === inventoryItemId);
  if (!vehicle) return undefined;
  const score = calculateMatchScore(card, vehicle);

  return {
    vehicle,
    ...score,
  };
}
