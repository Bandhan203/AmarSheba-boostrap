# AmarSheba System Activity Workflow

This document describes how the current frontend AmarSheba system works, starting with Admin activities, then customer activities, then provider and shared system behavior.

## 1) Admin Activity Flow (Starts First)

1. Admin opens `/admin`.
2. Admin directly enters the Admin Dashboard (no dedicated admin login gate yet).
3. Admin navigates sidebar modules:
   - Dashboard: platform KPI cards, booking/revenue/category charts, recent users.
   - Users: search users, filter by verification status (`all`, `pending`, `verified`).
   - Bookings: live booking monitor with booking status view.
   - Verification: review expert providers and trigger approve/reject UI actions.
   - Analytics: revenue trend + category/area performance widgets.
   - Settings: commission sliders (local/expert) + platform toggle controls.
4. Admin can return to landing via “Back to Landing”.

### Admin Outputs to System

- Updates admin UI state (`activeNav`, filters, search terms).
- Adjusts in-memory commission settings (`commissionLocal`, `commissionExpert`).
- Approve/reject/monitor actions are currently UI-level (no persistent backend write).

---

## 2) Customer Activity Flow (Web)

1. Customer lands on Home (`/`).
2. Customer browses:
   - Services (`/services`)
   - Providers (`/find`)
   - Provider details (`/find/:id`)
   - Pricing / How it works / Emergency / About / Contact
3. Customer can open Auth (`/auth`) for:
   - Login flow
   - 3-step register flow
   - Provider registration flow
4. Auth success routes:
   - Customer → `/dashboard`
   - Provider signup → `/provider-app`
5. Customer books service via `/booking?provider=...&service=...`:
   - Step 1: Service
   - Step 2: Schedule
   - Step 3: Address
   - Step 4: Payment (+ promo flow `AMARSHEBA20`)
   - Step 5: Confirmation
6. Customer continues from confirmation to dashboard or book another service.

### Customer Outputs to System (Web)

- Booking form state is updated per step (service/date/time/address/payment/promo/amount).
- Booking confirmation ID is generated client-side.
- Dashboard interactions update local UI state (filters, tab selection, rating modal).

---

## 3) Customer Activity Flow (Mobile Demo)

1. Customer starts from Splash (`/splash`) onboarding.
2. Customer goes to OTP login (`/login`) and enters app home (`/home`).
3. Customer selects category/provider (`/providers` → `/provider/:id`).
4. Customer books through app flow (`/book` → `/payment` → `/confirmation`).
5. Customer manages post-purchase screens:
   - My Bookings (`/bookings`)
   - Profile (`/profile` or `/more`)
6. Customer can rebook, cancel (UI), and rate completed services.

---

## 4) Provider Activity Flow

1. Provider signs up from Auth provider tab (`/auth`, provider mode).
2. Provider enters Provider App (`/provider-app`).
3. Provider uses tabs:
   - Dashboard: incoming requests + schedule + earnings chart.
   - Bookings: booking list by status.
   - Earnings: daily/weekly/monthly breakdown.
   - Profile: service, availability, verification shortcuts.
4. Provider accepts/declines pending requests in UI.

### Provider Outputs to System

- Request accept/decline changes local dashboard state.
- Tab/state changes are UI-only; no persistent API sync yet.

---

## 5) Shared System Logic

- Routing is client-side with `react-router-dom`.
- Global app state is managed in `AppContext`:
  - `language`, `providerFilter`, `selectedCategory`, `selectedProvider`, `selectedArea`, `bookingData`.
- Booking pipeline shares `bookingData` across booking, payment, and confirmation screens.
- Most lists (providers/bookings/stats/users) come from mock/constants data.
- No localStorage persistence is currently implemented in this codebase.

---

## 6) Current Technical Note

This is a frontend mock system (no real backend/auth/payment integration yet):

- Login/register/admin/provider actions are simulated flows.
- Booking/payment/tracking behaviors are UI-driven.
- Data updates are in-memory and reset on reload.

---

## 7) Role Summary

### Admin
- Monitors platform health, users, bookings, verification, and commission settings.

### Customer
- Discovers services/providers, books, pays (simulated), and manages bookings/profile.

### Provider
- Receives booking requests, tracks schedule/earnings, manages profile availability.

### System
- Coordinates route transitions, shared context state, and mock workflow simulation.