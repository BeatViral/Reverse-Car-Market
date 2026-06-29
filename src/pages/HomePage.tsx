import { BenefitsSection } from '../components/home/BenefitsSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { MarketFlippedSection } from '../components/home/MarketFlippedSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MarketFlippedSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BenefitsSection />
      <FinalCTA />
    </>
  );
}
