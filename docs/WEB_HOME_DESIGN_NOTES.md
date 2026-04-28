# Web Home Design Notes (AmarSheba)

This document captures the design language from `WebHomePage.tsx` and is now applied to `WebServicesPage.tsx`.

## 1) Visual Identity

- **Primary page background:** `#F8F9FF`
- **Primary brand color:** `#004AC6`
- **Primary text color:** `#0B1C30`
- **Secondary text color:** `#434655`
- **Muted text color:** `#737686`
- **Soft section background:** `#F8FAFF`, `#EFF4FF`
- **Border tone:** `#E8EDF6`

## 2) Typography System

- Main headlines use **Manrope/Inter fallback**.
- Hero heading scale is large (`text-5xl` to `text-7xl`) with strong contrast on image overlays.
- Section headings follow a bold `text-[32px]` pattern.
- Supporting copy uses smaller readable sizes with soft contrast (`text-sm`, `text-lg`).

## 3) Layout & Spacing Pattern

- Content uses `max-w-7xl` centered container blocks.
- Major vertical rhythm uses large spacing (`py-20`) on sections.
- Sections frequently combine:
  - strong visual block (hero/image)
  - explanatory text block
  - action CTA

## 4) Reusable Section Patterns from Home

### 4.1 Hero Block
- Full-width image background with dark overlay.
- Badge pill above headline.
- Large hero headline + short support paragraph.
- Primary and secondary CTA buttons.

### 4.2 Category Tiles
- Rounded image tiles (`rounded-2xl`) with gradient overlay.
- Bottom-left title text in white.
- Subtle hover scale animation for image.

### 4.3 Why/Trust Section
- Two-column layout (image + reason list).
- Circular icon chips + title + explanatory paragraph.
- Optional floating metric badge on image.

### 4.4 Offer/Promotion Strip
- Solid brand background (`#004AC6`).
- Left-aligned promo message + right icon accent.
- Rounded white CTA button.

### 4.5 FAQ Accordion
- Card-style FAQ rows with rounded corners and border.
- Chevron rotation for open/close state.
- Soft body text reveal under question.

## 5) Interaction Language

- Primary buttons: strong blue background with clear hover darkening.
- Image cards: scale-up hover with preserved rounded clipping.
- Arrow/Chevron icon motion used to communicate navigation.
- Transparent/glass badge treatment on top of hero imagery.

## 6) Services Page Alignment Implementation

`WebServicesPage.tsx` now mirrors Home design in:

- Hero treatment (overlay image + headline + CTA pattern)
- Category exploration tile style
- Trust section style and icon list pattern
- Promo strip style
- FAQ accordion style
- CTA ending block consistency

## 7) Category Coverage Safety

To avoid broken images, services category imagery now includes all categories currently present in `mockData`:

- maid, driver, chef, plumber, electrician, nursing, physiotherapy, ambulance
- carpenter, plasterer, tiler, painter, bricklayer, flooring

A fallback image is used when a category-specific image is unavailable.
