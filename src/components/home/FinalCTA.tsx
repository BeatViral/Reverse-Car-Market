import { ArrowRight, Car } from 'lucide-react';
import { ButtonLink } from '../Button';
import { Container } from '../Section';

export function FinalCTA() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mx-auto max-w-4xl rounded-2xl border border-charcoal/10 bg-ice p-8 text-center shadow-soft md:p-12">
          <h2 className="text-3xl font-black leading-tight text-navy sm:text-5xl">Ready to try it?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-charcoal/70">
            Post the car you want and let sellers come to you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/buyer/create-wanted-card" className="min-h-14 px-7 text-base">
              Post What You Want <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink to="/sellers" variant="secondary" className="min-h-14 px-7 text-base">
              <Car size={17} /> I Have a Car
            </ButtonLink>
            <ButtonLink to="/dealer-inventory" variant="ghost" className="min-h-14 px-7 text-base">
              Dealer Inventory
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
