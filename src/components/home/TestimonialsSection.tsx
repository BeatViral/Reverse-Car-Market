import { Container } from '../Section';

const testimonials = [
  {
    title: 'Saved me so much browsing time.',
    text: 'I posted the kind of car I wanted and got replies instead of spending days searching listings.',
    role: 'Buyer',
  },
  {
    title: 'Sellers were quick to respond.',
    text: 'Once I posted what I wanted, I started hearing back much faster than I expected.',
    role: 'Buyer',
  },
  {
    title: 'It felt more targeted.',
    text: 'Instead of guessing which listings might suit me, I got responses from sellers who actually had what I was looking for.',
    role: 'Buyer',
  },
  {
    title: 'I could compare options in one place.',
    text: 'It was easier to look at offers side by side than jumping between ads.',
    role: 'Buyer',
  },
  {
    title: 'The buyer was already serious.',
    text: 'As a seller, it felt better responding to someone who had already said what they wanted and their budget.',
    role: 'Seller',
  },
  {
    title: 'A smarter way to use our inventory.',
    text: 'We could turn stock into buyer interest without relying only on standard listing behaviour.',
    role: 'Dealer',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue">Real outcomes</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-5xl">Why people like buying this way.</h2>
          <p className="mt-4 text-lg leading-8 text-charcoal/70">
            Reverse Car Market helps buyers skip endless browsing and helps sellers connect with people already looking.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.title} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-md bg-ice px-3 py-1 text-xs font-black text-charcoal/60">{item.role}</span>
                <span className="h-2 w-2 rounded-full bg-blue" />
              </div>
              <h3 className="mt-6 text-2xl font-black leading-tight text-navy">"{item.title}"</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-charcoal/70">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
