import { createBrowserRouter } from 'react-router-dom';

// Website (public-facing)
import { RoleAccessPage } from './website/RoleAccessPage';
import { WebAboutPage } from './website/WebAboutPage';
import { WebAuthPage } from './website/WebAuthPage';
import { WebBecomeProviderPage } from './website/WebBecomeProviderPage';
import { WebBookingPage } from './website/WebBookingPage';
import { WebBookingTrackingPage } from './website/WebBookingTrackingPage';
import { WebContactPage } from './website/WebContactPage';
import { WebDashboardPage } from './website/WebDashboardPage';
import { WebEmergencyPage } from './website/WebEmergencyPage';
import { WebHomePage } from './website/WebHomePage';
import { WebHowItWorksPage } from './website/WebHowItWorksPage';
import { WebLayout } from './website/WebLayout';
import { WebNotFoundPage } from './website/WebNotFoundPage';
import { WebPricingPage } from './website/WebPricingPage';
import { WebPrivacyPolicyPage } from './website/WebPrivacyPolicyPage';
import { WebProviderDetailPage } from './website/WebProviderDetailPage';
import { WebProvidersPage } from './website/WebProvidersPage';
import { WebServicesPage } from './website/WebServicesPage';
import { WebSessionExpiredPage } from './website/WebSessionExpiredPage';
import { WebTermsPage } from './website/WebTermsPage';
import { WebUnauthorizedPage } from './website/WebUnauthorizedPage';
import { WebWalletPage } from './website/WebWalletPage';

// Mobile / App pages (standalone)
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminCommissionsPage } from './pages/AdminCommissionsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminDisputesPage } from './pages/AdminDisputesPage';
import { AdminSettlementsPage } from './pages/AdminSettlementsPage';
import { BookingFormPage } from './pages/BookingFormPage';
import { ClaimsCenterPage } from './pages/ClaimsCenterPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { CustomerProfilePage } from './pages/CustomerProfilePage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { MessagesPage } from './pages/MessagesPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProviderAssignmentPage } from './pages/ProviderAssignmentPage';
import { ProviderBookingDetailPage } from './pages/ProviderBookingDetailPage';
import { ProviderDashboardPage } from './pages/ProviderDashboardPage';
import { ProviderEarningsReportPage } from './pages/ProviderEarningsReportPage';
import { ProviderKYCPage } from './pages/ProviderKYCPage';
import { ProviderListingPage } from './pages/ProviderListingPage';
import { ProviderProfilePage } from './pages/ProviderProfilePage';
import { ProviderTeamManagementPage } from './pages/ProviderTeamManagementPage';
import { ResourceAssignmentsPage } from './pages/ResourceAssignmentsPage';
import { ResourceHomePage } from './pages/ResourceHomePage';
import { ResourceIssueReportPage } from './pages/ResourceIssueReportPage';
import { ResourceJobDetailPage } from './pages/ResourceJobDetailPage';
import { ResourceProfilePage } from './pages/ResourceProfilePage';
import { ResourceProofUploadPage } from './pages/ResourceProofUploadPage';
import { SplashPage } from './pages/SplashPage';

export const router = createBrowserRouter([
  // ========================
  // WEBSITE ROUTES (with shared layout)
  // ========================
  {
    path: '/',
    Component: WebLayout,
    children: [
      { index: true, Component: WebHomePage },
      { path: 'services', Component: WebServicesPage },
      { path: 'find', Component: WebProvidersPage },
      { path: 'find/:id', Component: WebProviderDetailPage },
      { path: 'how-it-works', Component: WebHowItWorksPage },
      { path: 'about', Component: WebAboutPage },
      { path: 'contact', Component: WebContactPage },
      { path: 'pricing', Component: WebPricingPage },
      { path: 'emergency', Component: WebEmergencyPage },
      { path: 'become-provider', Component: WebBecomeProviderPage },
      { path: 'privacy', Component: WebPrivacyPolicyPage },
      { path: 'terms', Component: WebTermsPage },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allow={['customer']}>
            <WebDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking',
        element: (
          <ProtectedRoute allow={['customer']}>
            <WebBookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking-tracking',
        element: (
          <ProtectedRoute allow={['customer']}>
            <WebBookingTrackingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'wallet',
        element: (
          <ProtectedRoute allow={['customer']}>
            <WebWalletPage />
          </ProtectedRoute>
        ),
      },
      { path: 'unauthorized', Component: WebUnauthorizedPage },
      { path: 'session-expired', Component: WebSessionExpiredPage },
      { path: '*', Component: WebNotFoundPage },
    ],
  },

  // Auth page (standalone, no shared header/footer)
  { path: '/auth', Component: WebAuthPage },
  { path: '/access', Component: RoleAccessPage },

  // ========================
  // MOBILE APP DEMO ROUTES (standalone)
  // ========================
  { path: '/splash', Component: SplashPage },
  { path: '/login', Component: LoginPage },
  {
    path: '/home',
    element: (
      <ProtectedRoute allow={['customer']}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/providers',
    element: (
      <ProtectedRoute allow={['customer']}>
        <ProviderListingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/:id',
    element: (
      <ProtectedRoute allow={['customer']}>
        <ProviderProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/book',
    element: (
      <ProtectedRoute allow={['customer']}>
        <BookingFormPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/payment',
    element: (
      <ProtectedRoute allow={['customer']}>
        <PaymentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/confirmation',
    element: (
      <ProtectedRoute allow={['customer']}>
        <ConfirmationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/bookings',
    element: (
      <ProtectedRoute allow={['customer']}>
        <MyBookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/claims',
    element: (
      <ProtectedRoute allow={['customer', 'provider', 'admin']}>
        <ClaimsCenterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute allow={['customer', 'provider', 'resource']}>
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute allow={['customer']}>
        <CustomerProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/more',
    element: (
      <ProtectedRoute allow={['customer']}>
        <CustomerProfilePage />
      </ProtectedRoute>
    ),
  },

  // ========================
  // PROVIDER & ADMIN PORTALS
  // ========================
  {
    path: '/provider-app',
    element: (
      <ProtectedRoute allow={['provider']}>
        <ProviderDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/booking/:id',
    element: (
      <ProtectedRoute allow={['provider']}>
        <ProviderBookingDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/kyc',
    element: (
      <ProtectedRoute allow={['provider']}>
        <ProviderKYCPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/team',
    element: (
      <ProtectedRoute allow={['provider']}>
        <ProviderTeamManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/assignment',
    element: (
      <ProtectedRoute allow={['provider']}>
        <ProviderAssignmentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/earnings-report',
    element: (
      <ProtectedRoute allow={['provider']}>
        <ProviderEarningsReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resource-app',
    element: (
      <ProtectedRoute allow={['resource']}>
        <ResourceHomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resource/assignments',
    element: (
      <ProtectedRoute allow={['resource']}>
        <ResourceAssignmentsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resource/job/:id',
    element: (
      <ProtectedRoute allow={['resource']}>
        <ResourceJobDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resource/job/:id/proof',
    element: (
      <ProtectedRoute allow={['resource']}>
        <ResourceProofUploadPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resource/job/:id/issue',
    element: (
      <ProtectedRoute allow={['resource']}>
        <ResourceIssueReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resource/profile',
    element: (
      <ProtectedRoute allow={['resource']}>
        <ResourceProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allow={['admin']}>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/disputes',
    element: (
      <ProtectedRoute allow={['admin']}>
        <AdminDisputesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/commissions',
    element: (
      <ProtectedRoute allow={['admin']}>
        <AdminCommissionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/settlements',
    element: (
      <ProtectedRoute allow={['admin']}>
        <AdminSettlementsPage />
      </ProtectedRoute>
    ),
  },
  { path: '*', Component: WebNotFoundPage },
]);