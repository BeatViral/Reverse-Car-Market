import { Container } from '../Section';

const steps = [
  ['Post the car you want', 'Tell us your budget, location and must-haves.'],
  ['Sellers respond', 'Verified sellers reply only when they have a matching car.'],
  ['Compare clearly', 'Price, kilometres, warranty, warnings and match score in one place.'],
];

export function HowItWorksSection() {
  return (
    <section className="bg-ice py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue">How it works</p>
          <h2 className="mt-3 text-4xl font-black leading-none text-navy sm:text-6xl">Three moves. No maze.</h2>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {steps.map(([title, text], index) => (
            <div key={title} className="group rounded-xl bg-white p-6 ring-1 ring-charcoal/10 transition hover:-translate-y-1 hover:bg-navy hover:text-white hover:shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-base font-black text-white group-hover:bg-blue">{index + 1}</span>
              <h3 className="mt-6 text-2xl font-black text-navy group-hover:text-white">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-charcoal/68 group-hover:text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
