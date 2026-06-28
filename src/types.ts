export type UserRole = 'buyer' | 'private_seller' | 'dealer' | 'admin';

export type CardStatus = 'open' | 'paused' | 'closed';
export type DealerCardStatus = 'draft' | 'published' | 'paused' | 'archived';
export type SellerTypePreference = 'dealer only' | 'private only' | 'both';
export type MatchScore = 'Strong match' | 'Good match' | 'Partial match' | 'Poor match';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
}

export interface DealerProfile {
  id: string;
  userId: string;
  businessName: string;
  dealerLicense: string;
  abn: string;
  address: string;
  website?: string;
  phone: string;
  location: string;
  region: string;
  verifiedStatus: 'pending' | 'verified' | 'rejected';
  subscriptionTier: 'founding' | 'starter' | 'pro' | 'dealer_plus';
  subscriptionStatus: 'pilot' | 'trialing' | 'active' | 'past_due' | 'cancelled';
  foundingDealer: boolean;
}

export interface InventoryItem {
  id: string;
  dealerId: string;
  make: string;
  model: string;
  badge: string;
  year: number;
  price: number;
  kilometres: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  colour: string;
  location: string;
  regoStatus: string;
  vinOptional?: string;
  stockNumber: string;
  serviceHistory: string;
  warrantyDetails: string;
  description: string;
  photoUrls: string[];
  status: 'active' | 'sold' | 'hidden' | 'draft';
}

export interface BuyerWantedCard {
  id: string;
  buyerId: string;
  title: string;
  naturalLanguageRequest: string;
  make?: string;
  model?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  minYear?: number;
  maxYear?: number;
  maxKilometres?: number;
  budgetMin?: number;
  budgetMax?: number;
  location?: string;
  radiusKm?: number;
  sellerTypePreference: SellerTypePreference;
  mustHaves: string[];
  dealbreakers: string[];
  buyingTimeframe: string;
  contactPreference: string;
  maxSellerResponses: number;
  publicVisibility: boolean;
  status: CardStatus;
  aiSummary: string;
  createdAt: string;
}

export interface DealerMatchCard {
  id: string;
  dealerId: string;
  title: string;
  cardType: 'dealer_match';
  generatedFromInventoryIds: string[];
  make?: string;
  model?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  kmMin?: number;
  kmMax?: number;
  location: string;
  radiusKm: number;
  buyerUseCase: string;
  description: string;
  possibleMatches: string[];
  ctaText: string;
  status: DealerCardStatus;
  visibility: 'public' | 'private';
  viewsCount: number;
  interestsCount: number;
  createdAt: string;
}

export interface BuyerInterest {
  id: string;
  dealerMatchCardId: string;
  buyerId?: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  budget: number;
  timeframe: string;
  requirements: string;
  permissionToContact: boolean;
  createWantedCard: boolean;
  generatedWantedCardId?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
}

export interface DealerResponse {
  id: string;
  buyerWantedCardId: string;
  dealerId: string;
  inventoryItemId?: string;
  price: number;
  message: string;
  availability: string;
  warrantyDetails: string;
  serviceHistory: string;
  inspectionAvailable: boolean;
  matchScore: MatchScore;
  matchSummary: string;
  warnings: string[];
  status: 'submitted' | 'viewed' | 'accepted' | 'rejected' | 'withdrawn';
}

export interface SearchIntent {
  raw: string;
  make?: string;
  model?: string;
  bodyType?: string;
  fuelType?: string;
  budgetMax?: number;
  location?: string;
  useCase?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}
