# AmarSheba Bootstrap Route Matrix

This folder mirrors the TypeScript app routes with static HTML entry files plus a shared JS renderer.

## Public website

- `/` -> `index.html`
- `/services` -> `services.html`
- `/find` -> `find.html`
- `/find/:id` -> `provider-detail.html?id=...`
- `/how-it-works` -> `how-it-works.html`
- `/about` -> `about.html`
- `/contact` -> `contact.html`
- `/pricing` -> `pricing.html`
- `/emergency` -> `emergency.html`
- `/become-provider` -> `become-provider.html`
- `/privacy` -> `privacy.html`
- `/terms` -> `terms.html`
- `/dashboard` -> `customer-dashboard.html`
- `/booking` -> `booking.html`
- `/booking-tracking` -> `booking-tracking.html`
- `/wallet` -> `wallet.html`
- `/unauthorized` -> `unauthorized.html`
- `/session-expired` -> `session-expired.html`
- `*` -> `404.html`

## Auth and access

- `/auth` -> `auth.html`
- `/access` -> `access.html`

## Customer app

- `/splash` -> `splash.html`
- `/login` -> `login.html`
- `/home` -> `home.html`
- `/providers` -> `providers.html`
- `/provider/:id` -> `provider-profile.html?id=...`
- `/book` -> `book.html`
- `/payment` -> `payment.html`
- `/confirmation` -> `confirmation.html`
- `/bookings` -> `my-bookings.html`
- `/claims` -> `claims-center.html`
- `/messages` -> `messages.html`
- `/profile` -> `customer-profile.html`
- `/more` -> `more.html` (same Bootstrap mirror as `CustomerProfilePage`)

## Provider app

- `/provider-app` -> `provider-app.html`
- `/provider/booking/:id` -> `provider-booking-detail.html?id=...`
- `/provider/kyc` -> `provider-kyc.html`
- `/provider/team` -> `provider-team.html`
- `/provider/assignment` -> `provider-assignment.html`
- `/provider/earnings-report` -> `provider-earnings-report.html`

## Resource app

- `/resource-app` -> `resource-app.html`
- `/resource/assignments` -> `resource-assignments.html`
- `/resource/job/:id` -> `resource-job-detail.html?id=...`
- `/resource/job/:id/proof` -> `resource-proof-upload.html?id=...`
- `/resource/job/:id/issue` -> `resource-issue-report.html?id=...`
- `/resource/profile` -> `resource-profile.html`

## Admin app

- `/admin` -> `admin.html`
- `/admin/users` -> `admin-users.html`
- `/admin/bookings` -> `admin-bookings.html`
- `/admin/verification` -> `admin-verification.html`
- `/admin/analytics` -> `admin-analytics.html`
- `/admin/settings` -> `admin-settings.html`
- `/admin/disputes` -> `admin-disputes.html`
- `/admin/commissions` -> `admin-commissions.html`
- `/admin/settlements` -> `admin-settlements.html`
