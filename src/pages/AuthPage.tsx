import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Container, SectionHeader } from '../components/Section';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import type { UserRole } from '../types';

const roleOptions: Array<{ role: UserRole; title: string; text: string }> = [
  { role: 'buyer', title: 'Buyer', text: 'Post the car you want and compare seller responses.' },
  { role: 'private_seller', title: 'Private Seller', text: 'Find public buyer demand and respond with your car.' },
  { role: 'dealer', title: 'Dealer', text: 'Upload inventory, publish Match Cards and respond to buyer demand.' },
];

export function AuthPage() {
  const { role, signInAs } = useAuth();
  const navigate = useNavigate();

  function selectRole(nextRole: UserRole) {
    signInAs(nextRole);
    navigate(nextRole === 'dealer' ? '/dealer/dashboard' : '/buyer/dashboard');
  }

  return (
    <section className="section-pad bg-ice">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Sign in"
          title="Choose how you want to use Reverse Car Market."
          description="Supabase Auth is wired for production. This demo lets you switch roles instantly while preserving role-based routing."
        />
        <div className="mx-auto mt-10 max-w-5xl rounded-lg bg-white p-6 shadow-card ring-1 ring-charcoal/10">
          <div className="grid gap-5 md:grid-cols-3">
            {roleOptions.map((option) => (
              <button
                type="button"
                key={option.role}
                onClick={() => selectRole(option.role)}
                className="rounded-lg border border-charcoal/10 bg-ice p-5 text-left transition hover:-translate-y-0.5 hover:border-blue/40"
              >
                <span className="rounded-md bg-blue/10 px-3 py-1 text-xs font-black uppercase text-blue">{option.role === role ? 'Current role' : 'Account role'}</span>
                <h2 className="mt-4 text-xl font-black text-navy">{option.title}</h2>
                <p className="mt-2 text-sm leading-6 text-charcoal/68">{option.text}</p>
              </button>
            ))}
          </div>
          <form className="mt-8 grid gap-4 border-t border-charcoal/10 pt-6">
            <h2 className="text-2xl font-black text-navy">Account details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-navy">
                Name
                <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal" placeholder="Ava Thompson" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy">
                Email
                <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal" placeholder="you@example.com" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy">
                Phone
                <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal" placeholder="0400 000 000" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy">
                Location
                <input className="rounded-lg border border-charcoal/15 px-3 py-3 font-normal" placeholder="Gold Coast" />
              </label>
            </div>
            <div className="rounded-lg bg-amber/10 p-4 text-sm leading-6 text-charcoal/70">
              Dealer accounts require dealer profile details, licence information and verification before they are shown as verified.
            </div>
            <Button type="button" onClick={() => selectRole(role)}>
              Continue as {role.replace('_', ' ')}
            </Button>
          </form>
          <p className="mt-6 text-xs font-semibold text-charcoal/50">
            Supabase status: {isSupabaseConfigured ? 'configured through environment variables' : 'demo mode, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect Auth.'}
          </p>
        </div>
      </Container>
    </section>
  );
}

export function RoleRedirect() {
  const { role } = useAuth();
  return <Navigate to={role === 'dealer' ? '/dealer/dashboard' : role === 'admin' ? '/admin/dashboard' : '/buyer/dashboard'} replace />;
}
