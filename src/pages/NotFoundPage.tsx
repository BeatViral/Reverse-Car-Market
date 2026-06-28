import { ButtonLink } from '../components/Button';
import { Container } from '../components/Section';

export function NotFoundPage() {
  return (
    <section className="section-pad bg-ice">
      <Container>
        <div className="rounded-lg bg-white p-10 text-center shadow-card ring-1 ring-charcoal/10">
          <h1 className="text-4xl font-black text-navy">Page not found</h1>
          <p className="mt-3 text-charcoal/65">That page is not part of the current Reverse Car Market demo.</p>
          <div className="mt-6">
            <ButtonLink to="/">Back home</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
