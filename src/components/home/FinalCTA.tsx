import { ButtonLink } from '../Button';
import { Container } from '../Section';

export function FinalCTA() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mx-auto max-w-4xl rounded-2xl bg-blue p-8 text-center text-white shadow-card md:p-12">
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-6xl">Post it. Match it. Drive it.</h2>
          <p className="mt-5 text-lg font-semibold text-white/78">Reverse Car Market starts with what buyers actually want.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/buyer/create-wanted-card" variant="dark" className="min-h-14 px-7 text-base">
              Post What You Want
            </ButtonLink>
            <ButtonLink to="/sellers" variant="secondary" className="min-h-14 px-7 text-base">
              I Have a Car
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
