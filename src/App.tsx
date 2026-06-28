import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthPage, RoleRedirect } from './pages/AuthPage';
import { BrowsePage } from './pages/BrowsePage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { BuyersPage } from './pages/BuyersPage';
import { CreateWantedCardPage } from './pages/CreateWantedCardPage';
import { DealerDashboardPage } from './pages/DealerDashboardPage';
import { DealerRespondPage } from './pages/DealerRespondPage';
import { DealersPage, FoundingDealerPage } from './pages/DealersPage';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { InterestPage } from './pages/InterestPage';
import { InventoryUploadPage } from './pages/InventoryUploadPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PricingPage } from './pages/PricingPage';
import { SearchPage } from './pages/SearchPage';
import { TrustPage } from './pages/TrustPage';
import { WantedDetailPage } from './pages/WantedDetailPage';
import type { UserRole } from './types';

function RequireRole({ allowed, children }: { allowed: UserRole[]; children: ReactNode }) {
  const { role } = useAuth();
  if (allowed.includes(role) || role === 'admin') return <>{children}</>;
  return <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="buyers" element={<BuyersPage />} />
          <Route path="dealers" element={<DealersPage />} />
          <Route path="dealers/founding" element={<FoundingDealerPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="trust" element={<TrustPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="dashboard" element={<RoleRedirect />} />
          <Route
            path="buyer/dashboard"
            element={
              <RequireRole allowed={['buyer']}>
                <BuyerDashboardPage />
              </RequireRole>
            }
          />
          <Route
            path="buyer/create-wanted-card"
            element={
              <RequireRole allowed={['buyer']}>
                <CreateWantedCardPage />
              </RequireRole>
            }
          />
          <Route
            path="buyer/wanted/:id"
            element={
              <RequireRole allowed={['buyer']}>
                <WantedDetailPage />
              </RequireRole>
            }
          />
          <Route
            path="dealer/dashboard"
            element={
              <RequireRole allowed={['dealer']}>
                <DealerDashboardPage />
              </RequireRole>
            }
          />
          <Route
            path="dealer/inventory/upload"
            element={
              <RequireRole allowed={['dealer']}>
                <InventoryUploadPage />
              </RequireRole>
            }
          />
          <Route
            path="dealer/respond/:wantedCardId"
            element={
              <RequireRole allowed={['dealer']}>
                <DealerRespondPage />
              </RequireRole>
            }
          />
          <Route path="interest/:dealerMatchCardId" element={<InterestPage />} />
          <Route
            path="admin/dashboard"
            element={
              <RequireRole allowed={['admin']}>
                <AdminDashboardPage />
              </RequireRole>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
