import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { users } from '../data/demo';
import type { UserProfile, UserRole } from '../types';

interface AuthContextValue {
  user: UserProfile;
  role: UserRole;
  signInAs: (role: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const roleDefaults: Record<UserRole, string> = {
  buyer: 'buyer-ava',
  private_seller: 'buyer-liam',
  dealer: 'dealer-sam',
  admin: 'admin-mahmood',
};

function getInitialRole(): UserRole {
  const stored = localStorage.getItem('reverse-car-market-role') as UserRole | null;
  if (stored && Object.keys(roleDefaults).includes(stored)) return stored;
  return 'buyer';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(getInitialRole);

  const value = useMemo<AuthContextValue>(() => {
    const selectedUser = users.find((item) => item.id === roleDefaults[role]) ?? users[0];
    return {
      user: selectedUser,
      role,
      signInAs: (nextRole) => {
        localStorage.setItem('reverse-car-market-role', nextRole);
        setRole(nextRole);
      },
      signOut: () => {
        localStorage.removeItem('reverse-car-market-role');
        setRole('buyer');
      },
    };
  }, [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
