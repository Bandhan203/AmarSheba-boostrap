# AmarSheba Page-by-Page User Access Guide

Last updated: 2026-04-26

## 1) User Roles

- **Guest (Unauthenticated):** Public visitor, not logged in.
- **Customer:** Service consumer (books providers).
- **Provider:** Service provider/partner.
- **Resource:** Field resource or operational team member.
- **Admin:** Platform operations/admin user.

---

## 2) Website (Public + Customer Web)

These routes are defined in `src/app/routes.tsx` under the shared `WebLayout`.

| Route | Page | Primary User | Access |
|---|---|---|---|
| `/` | Home | Guest, Customer | Public |
| `/services` | Services | Guest, Customer | Public |
| `/find` | Providers Listing | Guest, Customer | Public |
| `/find/:id` | Provider Detail | Guest, Customer | Public |
| `/how-it-works` | How It Works | Guest, Customer, Provider | Public |
| `/about` | About | Guest, All | Public |
| `/contact` | Contact | Guest, All | Public |
| `/pricing` | Pricing | Guest, Customer, Provider | Public |
| `/emergency` | Emergency | Guest, Customer | Public |
| `/become-provider` | Become a Pro | Guest, Provider Candidate | Public |
| `/privacy` | Privacy Policy | Guest, All | Public |
| `/terms` | Terms | Guest, All | Public |
| `/dashboard` | Customer Dashboard | Customer | Protected (`customer`) |
| `/booking` | Customer Booking | Customer | Protected (`customer`) |
| `/booking-tracking` | Booking Tracking | Customer | Protected (`customer`) |
| `/wallet` | Customer Wallet | Customer | Protected (`customer`) |
| `/unauthorized` | Unauthorized | All | Public |
| `/session-expired` | Session Expired | All | Public |
| `*` | Web Not Found | All | Public |

Additional standalone website routes:

| Route | Page | Primary User | Access |
|---|---|---|---|
| `/auth` | Auth (Login/Register/Provider tab) | Guest, All | Public |
| `/access` | Role Access Selector | Guest, All | Public |

---

## 3) Mobile App Demo Routes

These are standalone demo flows outside `WebLayout`.

### Customer Flow

| Route | Page | User | Access |
|---|---|---|---|
| `/splash` | Splash | Guest | Public |
| `/login` | Login | Guest | Public |
| `/home` | Customer Home | Customer | Protected (`customer`) |
| `/providers` | Provider Listing | Customer | Protected (`customer`) |
| `/provider/:id` | Provider Profile | Customer | Protected (`customer`) |
| `/book` | Booking Form | Customer | Protected (`customer`) |
| `/payment` | Payment | Customer | Protected (`customer`) |
| `/confirmation` | Confirmation | Customer | Protected (`customer`) |
| `/bookings` | My Bookings | Customer | Protected (`customer`) |
| `/profile` | Customer Profile | Customer | Protected (`customer`) |
| `/more` | Customer More/Profile | Customer | Protected (`customer`) |

### Shared Functional Pages

| Route | Page | User | Access |
|---|---|---|---|
| `/claims` | Claims Center | Customer, Provider, Admin | Protected (`customer`,`provider`,`admin`) |
| `/messages` | Messages | Customer, Provider, Resource | Protected (`customer`,`provider`,`resource`) |

### Provider Portal

| Route | Page | User | Access |
|---|---|---|---|
| `/provider-app` | Provider Dashboard | Provider | Protected (`provider`) |
| `/provider/booking/:id` | Provider Booking Detail | Provider | Protected (`provider`) |
| `/provider/kyc` | Provider KYC | Provider | Protected (`provider`) |
| `/provider/team` | Provider Team Management | Provider | Protected (`provider`) |
| `/provider/assignment` | Provider Assignment | Provider | Protected (`provider`) |
| `/provider/earnings-report` | Provider Earnings Report | Provider | Protected (`provider`) |

### Resource Portal

| Route | Page | User | Access |
|---|---|---|---|
| `/resource-app` | Resource Home | Resource | Protected (`resource`) |
| `/resource/assignments` | Resource Assignments | Resource | Protected (`resource`) |
| `/resource/job/:id` | Resource Job Detail | Resource | Protected (`resource`) |
| `/resource/job/:id/proof` | Resource Proof Upload | Resource | Protected (`resource`) |
| `/resource/job/:id/issue` | Resource Issue Report | Resource | Protected (`resource`) |
| `/resource/profile` | Resource Profile | Resource | Protected (`resource`) |

### Admin Portal

| Route | Page | User | Access |
|---|---|---|---|
| `/admin` | Admin Dashboard | Admin | Protected (`admin`) |
| `/admin/disputes` | Admin Disputes | Admin | Protected (`admin`) |
| `/admin/commissions` | Admin Commissions | Admin | Protected (`admin`) |
| `/admin/settlements` | Admin Settlements | Admin | Protected (`admin`) |

---

## 4) Recommended Navigation by User Type

### Guest (Not logged in)
1. Start at `/`.
2. Explore `/services`, `/find`, `/pricing`, `/how-it-works`.
3. If wants to book: go to `/auth` and register as customer.
4. If wants to work as provider: go to `/become-provider` then `/auth?tab=provider`.

### Customer
1. Login via `/auth` or `/login`.
2. Discover providers from `/find` or `/providers`.
3. Complete booking flow: `/book` → `/payment` → `/confirmation`.
4. Track in `/booking-tracking` or `/bookings`.
5. Use `/wallet`, `/messages`, and `/claims` when needed.

### Provider
1. Join from `/become-provider` and apply in `/auth?tab=provider`.
2. After onboarding, work from `/provider-app`.
3. Manage KYC/team/assignments and booking details in provider routes.
4. Use `/messages` for communication and `/claims` for disputes.

### Resource
1. Use `/resource-app` as operational home.
2. Track tasks via `/resource/assignments`.
3. Complete field updates through `/resource/job/:id`, proof upload, and issue reporting.
4. Communicate via `/messages`.

### Admin
1. Start at `/admin` for oversight.
2. Handle disputes and payouts via `/admin/disputes`, `/admin/commissions`, `/admin/settlements`.
3. Access `/claims` for cross-role claim handling.

---

## 5) Notes for Next Iteration

- This guide mirrors current route protection in `src/app/routes.tsx`.
- If role permissions change, update this document with route-level access immediately.
- For future work, we can add: sequence diagrams, role-based sitemap, and journey test checklist.
