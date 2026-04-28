export type AccessRole = 'customer' | 'provider' | 'resource' | 'admin';
export type AccessIconKey = 'user' | 'briefcase' | 'wrench' | 'shield';

export interface RoleAccessOptionDto {
  role: AccessRole;
  label: string;
  path: string;
  color: string;
  icon: AccessIconKey;
}

export interface BookingTrackingDto {
  orderId: string;
  steps: string[];
  currentStepIndex: number;
}

export interface WalletSummaryDto {
  currentBalance: number;
  pendingRefund: number;
}

export interface WalletTransactionDto {
  id: string;
  method: string;
  amount: number;
}

export interface WalletContractDto {
  summary: WalletSummaryDto;
  transactions: WalletTransactionDto[];
}

export interface ProviderBookingDetailDto {
  customerName: string;
  service: string;
  slot: string;
  address: string;
}

export interface ProviderResourceCandidateDto {
  id: string;
  name: string;
  proximity: string;
  availability: string;
}

export interface ProviderTeamMemberDto {
  id: string;
  name: string;
  skill: string;
  status: string;
}

export interface ProviderKycFieldDto {
  id: string;
  placeholder: string;
}

export interface ProviderEarningsDto {
  grossMonth: number;
  netAfterCommission: number;
  commissionPercent: number;
  completedJobs: number;
  pendingSettlement: number;
}

export interface ResourceQuickStatDto {
  label: string;
  value: string;
}

export interface ResourceAssignmentDto {
  id: string;
  service: string;
  address: string;
  time: string;
  status: string;
}

export interface ResourceJobDetailDto {
  service: string;
  customer: string;
  address: string;
  slot: string;
}

export interface ResourceProfileDto {
  name: string;
  roleTitle: string;
  technicianId: string;
  availability: string;
  zone: string;
  completedJobs: number;
  averageRating: number;
}

export interface AdminDisputeTicketDto {
  id: string;
  summary: string;
}

export interface AdminCommissionRuleDto {
  category: string;
  percent: number;
}

export interface AdminSettlementDto {
  pending: number;
  released: number;
  payoutSchedule: string;
}

export const ROLE_ACCESS_OPTIONS: RoleAccessOptionDto[] = [
  { role: 'customer', label: 'Continue as Customer', icon: 'user', path: '/dashboard', color: '#1E88E5' },
  { role: 'provider', label: 'Continue as Provider (Manager)', icon: 'briefcase', path: '/provider-app', color: '#4CAF50' },
  { role: 'resource', label: 'Continue as Field Technician (Worker)', icon: 'wrench', path: '/resource-app', color: '#FF9800' },
  { role: 'admin', label: 'Continue as Admin', icon: 'shield', path: '/admin', color: '#7B1FA2' },
];

import { 
  LayoutDashboard, Users, ShoppingBag, Shield, BarChart2, Settings, 
  Calendar, DollarSign, User, MapPin, ClipboardList, Briefcase, 
  MessageSquare, Wallet, HelpCircle, HardHat, CheckCircle
} from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users',     label: 'Users',     icon: Users },
  { id: 'bookings',  label: 'Bookings',  icon: ShoppingBag },
  { id: 'verification', label: 'Verify', icon: Shield, badge: 28 },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'settings',  label: 'Settings',  icon: Settings },
];

export const PROVIDER_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings',  label: 'Live Bookings', icon: Calendar, badge: 3 },
  { id: 'earnings',  label: 'Earnings', icon: DollarSign },
  { id: 'team',      label: 'Team', icon: Users },
  { id: 'kyc',       label: 'Verification', icon: Shield },
  { id: 'profile',   label: 'Profile', icon: User },
];

export const CUSTOMER_NAV_ITEMS = [
  { id: 'dashboard', label: 'My Stats', icon: LayoutDashboard },
  { id: 'find',      label: 'Find Services', icon: MapPin },
  { id: 'bookings',  label: 'My Bookings', icon: ClipboardList, badge: 1 },
  { id: 'wallet',    label: 'My Wallet', icon: Wallet },
  { id: 'claims',    label: 'Help Center', icon: HelpCircle },
  { id: 'profile',   label: 'Settings', icon: User },
];

export const RESOURCE_NAV_ITEMS = [
  { id: 'dashboard', label: 'Active Jobs', icon: Briefcase, badge: 2 },
  { id: 'history',   label: 'Completed', icon: CheckCircle },
  { id: 'messages',  label: 'Messages', icon: MessageSquare },
  { id: 'profile',   label: 'My Profile', icon: User },
];

export const BOOKING_TRACKING_CONTRACT: BookingTrackingDto = {
  orderId: 'BK-2026-00192',
  steps: ['Pending', 'Assigned', 'In-Progress', 'Completed'],
  currentStepIndex: 1,
};

export const WALLET_CONTRACT: WalletContractDto = {
  summary: {
    currentBalance: 3420,
    pendingRefund: 850,
  },
  transactions: [
    { id: 'BK-1029', method: 'bKash', amount: 1200 },
    { id: 'BK-1033', method: 'Card EMI', amount: 7500 },
    { id: 'BK-1048', method: 'Cash', amount: 650 },
  ],
};

export const PROVIDER_BOOKING_DETAIL_CONTRACT: ProviderBookingDetailDto = {
  customerName: 'Nusrat Jahan',
  service: 'Deep Cleaning',
  slot: '10:30 AM - 12:30 PM',
  address: 'Uttara Sector 7',
};

export const PROVIDER_ASSIGNMENT_RESOURCES: ProviderResourceCandidateDto[] = [
  { id: 'R01', name: 'Arif Hossain', proximity: '1.2 km', availability: 'Free' },
  { id: 'R02', name: 'Mina Akter', proximity: '2.8 km', availability: 'Busy' },
  { id: 'R03', name: 'Rakib Hasan', proximity: '3.1 km', availability: 'Free' },
];

export const PROVIDER_TEAM_CONTRACT: ProviderTeamMemberDto[] = [
  { id: 'R01', name: 'Arif Hossain', skill: 'Electrician', status: 'Active' },
  { id: 'R02', name: 'Mina Akter', skill: 'Cleaner', status: 'Active' },
  { id: 'R03', name: 'Rakib Hasan', skill: 'Plumber', status: 'Offline' },
];

export const PROVIDER_KYC_FIELDS: ProviderKycFieldDto[] = [
  { id: 'business-name', placeholder: 'Business Name' },
  { id: 'trade-license', placeholder: 'Trade License Number' },
];

export const PROVIDER_EARNINGS_CONTRACT: ProviderEarningsDto = {
  grossMonth: 84000,
  netAfterCommission: 73920,
  commissionPercent: 12,
  completedJobs: 54,
  pendingSettlement: 9500,
};

export const RESOURCE_HOME_STATS: ResourceQuickStatDto[] = [
  { label: 'Today Jobs', value: '3' },
  { label: 'Completed', value: '18' },
  { label: 'Distance', value: '22km' },
  { label: 'Rating', value: '4.8★' },
];

export const RESOURCE_ASSIGNMENTS_CONTRACT: ResourceAssignmentDto[] = [
  { id: 'RS001', service: 'AC Servicing', address: 'Gulshan 2', time: '11:00 AM', status: 'Assigned' },
  { id: 'RS002', service: 'Plumbing', address: 'Banani', time: '1:30 PM', status: 'In-Progress' },
  { id: 'RS003', service: 'Electrical Repair', address: 'Dhanmondi', time: '4:00 PM', status: 'Pending Start' },
];

export const RESOURCE_NEXT_JOB: ResourceAssignmentDto = RESOURCE_ASSIGNMENTS_CONTRACT[0];

export const RESOURCE_JOB_DETAIL_CONTRACT: ResourceJobDetailDto = {
  service: 'AC Servicing',
  customer: 'Rahim Ahmed',
  address: 'House 24, Road 11, Gulshan 2',
  slot: '11:00 AM - 12:00 PM',
};

export const RESOURCE_ISSUE_REASONS = [
  'Customer unavailable',
  'Safety concern',
  'Tools/parts unavailable',
  'Address mismatch',
];

export const RESOURCE_PROFILE_CONTRACT: ResourceProfileDto = {
  name: 'Arif Hossain',
  roleTitle: 'Electrical Technician',
  technicianId: 'RS-1920',
  availability: 'Online',
  zone: 'Gulshan / Banani',
  completedJobs: 240,
  averageRating: 4.8,
};

export const ADMIN_DISPUTES_CONTRACT: AdminDisputeTicketDto[] = [
  { id: 'DSP-001', summary: 'Late arrival complaint • Pending review' },
  { id: 'DSP-002', summary: 'Service quality mismatch • Under review' },
  { id: 'DSP-003', summary: 'Settlement delay escalation • Pending review' },
];

export const ADMIN_COMMISSION_RULES: AdminCommissionRuleDto[] = [
  { category: 'Maid', percent: 10 },
  { category: 'Electrician', percent: 12 },
  { category: 'Nursing', percent: 14 },
];

export const ADMIN_SETTLEMENT_CONTRACT: AdminSettlementDto = {
  pending: 124000,
  released: 388000,
  payoutSchedule: 'Friday 6:00 PM',
};
