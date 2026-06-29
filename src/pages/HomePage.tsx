import { CardTypesSection } from '../components/home/CardTypesSection';
import { DealerSection } from '../components/home/DealerSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { MarketFlippedSection } from '../components/home/MarketFlippedSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MarketFlippedSection />
      <HowItWorksSection />
      <CardTypesSection />
      <DealerSection />
      <FinalCTA />
    </>
  );
}
