export const REQUIRED_SERVICE_CATEGORIES = [
  'Carpenters',
  'Plasterers',
  'Tilers (Tile Specialists)',
  'Painters & Decorators',
  'Brick Layers',
  'Flooring Specialists/Agency',
] as const;

export type VerificationBadgeKey =
  | 'policeCleared'
  | 'insuranceVerified'
  | 'idVerified'
  | 'businessRegistered'
  | 'certifiedProfessional';

export interface VerificationBadge {
  key: VerificationBadgeKey;
  label: string;
  active: boolean;
}

export const VERIFICATION_BADGES: VerificationBadge[] = [
  { key: 'policeCleared', label: 'Police Cleared', active: true },
  { key: 'insuranceVerified', label: 'Insurance Verified', active: true },
  { key: 'idVerified', label: 'ID Verified', active: true },
  { key: 'businessRegistered', label: 'Business Registered', active: false },
  { key: 'certifiedProfessional', label: 'Certified Professional', active: true },
];

export interface VerificationChannelItem {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  lastUpdated: string;
}

export interface VerificationChannel {
  channel: 'background' | 'insurance';
  title: string;
  items: VerificationChannelItem[];
}

export const VERIFICATION_CHANNELS: VerificationChannel[] = [
  {
    channel: 'background',
    title: 'Channel 1 - Background Checks',
    items: [
      { id: 'dbs', title: 'Police clearance / DBS check', status: 'approved', lastUpdated: '2026-04-05' },
      { id: 'nid', title: 'Identity verification (NID/Passport)', status: 'approved', lastUpdated: '2026-04-03' },
      { id: 'business', title: 'Business registration verification', status: 'pending', lastUpdated: '2026-04-20' },
      { id: 'certs', title: 'Professional certifications', status: 'approved', lastUpdated: '2026-04-01' },
      { id: 'history', title: 'Work history verification', status: 'approved', lastUpdated: '2026-04-02' },
    ],
  },
  {
    channel: 'insurance',
    title: 'Channel 2 - Insurance & Liability',
    items: [
      { id: 'public-liability', title: 'Public Liability Insurance', status: 'approved', lastUpdated: '2026-04-08' },
      { id: 'indemnity', title: 'Professional Indemnity Insurance', status: 'approved', lastUpdated: '2026-04-08' },
      { id: 'document-upload', title: 'Insurance document upload & validation', status: 'approved', lastUpdated: '2026-04-08' },
      { id: 'expiry-tracking', title: 'Insurance expiry tracking & notifications', status: 'approved', lastUpdated: '2026-04-23' },
      { id: 'coverage', title: 'Minimum coverage requirements', status: 'pending', lastUpdated: '2026-04-24' },
    ],
  },
];

export interface ClaimCase {
  id: string;
  reason: 'poor-workmanship' | 'damage' | 'incomplete-work';
  bookingId: string;
  responseDeadlineHours: number;
  stage: 'submitted' | 'provider-response' | 'mediation' | 'insurance-routed' | 'settled';
  createdAt: string;
}

export const CLAIM_CASES: ClaimCase[] = [
  {
    id: 'CLM-401',
    reason: 'poor-workmanship',
    bookingId: 'BK-2026-00192',
    responseDeadlineHours: 48,
    stage: 'provider-response',
    createdAt: '2026-04-24 10:20',
  },
  {
    id: 'CLM-402',
    reason: 'damage',
    bookingId: 'BK-2026-00174',
    responseDeadlineHours: 48,
    stage: 'insurance-routed',
    createdAt: '2026-04-22 14:05',
  },
];

export interface EscrowMilestone {
  id: string;
  title: string;
  amount: number;
  releasePolicy: string;
  released: boolean;
}

export const ESCROW_MILESTONES: EscrowMilestone[] = [
  { id: 'm1', title: 'Deposit', amount: 3000, releasePolicy: 'Release at job start confirmation', released: true },
  { id: 'm2', title: 'Midway', amount: 5000, releasePolicy: 'Release after midpoint photo proof', released: false },
  { id: 'm3', title: 'Final', amount: 4000, releasePolicy: 'Auto release after customer approval/timeout', released: false },
];

export interface MessageThread {
  id: string;
  bookingId: string;
  participants: string[];
  lastMessage: string;
  unreadCount: number;
}

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: 'TH-101',
    bookingId: 'BK-2026-00192',
    participants: ['Customer: Rahim', 'Provider: Ruksana'],
    lastMessage: 'Shared wall measurement photo and preferred paint finish.',
    unreadCount: 2,
  },
  {
    id: 'TH-102',
    bookingId: 'BK-2026-00174',
    participants: ['Customer: Shirin', 'Provider: Delwar'],
    lastMessage: 'Quote updated with material + labor split.',
    unreadCount: 0,
  },
];

export interface AdminFraudAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export const ADMIN_FRAUD_ALERTS: AdminFraudAlert[] = [
  { id: 'FRD-9', title: 'Repeated payment-method swaps on active escrow job', severity: 'medium', timestamp: '2026-04-25 11:15' },
  { id: 'FRD-10', title: 'Unusual quote inflation (>40%) in same district cluster', severity: 'high', timestamp: '2026-04-25 15:40' },
];

export interface ProviderPerformanceSnapshot {
  providerName: string;
  completionRate: number;
  onTimeRate: number;
  avgRating: number;
}

export const PROVIDER_PERFORMANCE: ProviderPerformanceSnapshot[] = [
  { providerName: 'Ruksana Akter', completionRate: 96, onTimeRate: 93, avgRating: 4.9 },
  { providerName: 'Delwar Hossain', completionRate: 92, onTimeRate: 89, avgRating: 4.7 },
  { providerName: 'Rafiqul Islam', completionRate: 95, onTimeRate: 90, avgRating: 4.8 },
];
