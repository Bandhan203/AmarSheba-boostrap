---
name: Home Service Marketplace Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#525657'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6e70'
  on-tertiary-container: '#eff1f3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The brand personality of this design system is built on **trust, reliability, and modern efficiency**. It is designed to bridge the gap between high-tech utility and human-centric service. The target audience includes busy professionals and homeowners who value their time and need a frictionless way to find vetted experts.

The visual style follows a **Corporate / Modern** aesthetic. It prioritizes clarity and high-quality "white space" to reduce cognitive load during the booking process. The emotional response should be one of confidence and calm—reassuring the user that their home is in professional hands.

## Colors

The palette is anchored by a **vibrant Indigo-Blue** (`#2563EB`) which serves as the primary signal for action and brand identity. This color is chosen for its psychological association with professionalism and security.

- **Primary:** Used for main CTAs, active states, and brand-critical elements.
- **Secondary:** A deep Navy used for headings and high-contrast text to provide a grounded, premium feel.
- **Surface/Neutral:** A sophisticated range of cool grays. Backgrounds utilize a near-white `Slate-50` to maintain a "clean" atmosphere, while borders and secondary text use softer grays to ensure the interface feels open rather than boxed-in.
- **Semantic:** Success (Green), Warning (Amber), and Error (Red) colors are desaturated slightly to fit the professional tone.

## Typography

This design system employs a pairing of two modern sans-serifs to balance personality with readability. 

**Manrope** is used for headings. Its geometric but slightly softened terminals provide a contemporary, approachable look that feels more "designed" than standard system fonts. 

**Inter** is used for all body copy, inputs, and UI labels. Its high x-height and exceptional legibility at small sizes make it perfect for dense service lists, pricing tables, and scheduling flows. 

Tight letter-spacing is applied to large headlines for a modern, editorial impact, while body text maintains standard spacing for maximum comfort during long reading sessions.

## Layout & Spacing

The design system utilizes a **12-column fixed grid** for desktop, centered within the viewport. The "Plenty of Whitespace" directive is achieved by utilizing generous vertical rhythms—sections are separated by `xxl` (80px) units to allow the content to breathe.

Padding within cards and containers follows a strict 8px (0.5rem) base scale. Layouts should prefer `flex-gap` or `grid-gap` over individual margins to maintain a consistent rhythm. Horizontal "Safe Zones" for mobile start at 16px, expanding to 24px on tablet and desktop to frame the content professionally.

## Elevation & Depth

Depth is established through **Ambient Shadows** rather than heavy borders. The system uses a multi-layered shadow approach to ensure elements look "lifted" but integrated into the surface.

- **Level 0 (Flat):** Used for the main background surface.
- **Level 1 (Low):** Used for cards in their rest state. A very subtle, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)) and a thin 1px border in `Slate-100`.
- **Level 2 (Medium):** Used for hover states and active dropdowns. The shadow becomes slightly more prominent (0px 10px 30px rgba(0,0,0,0.08)).
- **Level 3 (High):** Reserved for modals and primary conversion pop-ups. 

Avoid using shadows on buttons; use color shifts and slight scaling to indicate interactivity instead.

## Shapes

The shape language is **Rounded**, reflecting a friendly and modern service environment. Standard containers like cards and input fields use a `0.5rem` (8px) radius. Larger elements like hero sections or promotional banners use `1rem` (16px) to emphasize the soft, approachable nature of the brand. Small components like tags and badges use a full pill-shape (999px) to contrast against the structured grid.

## Components

### Buttons
Primary buttons use the Indigo-Blue background with white text. Secondary buttons use a light blue ghost style or a subtle gray outline. All buttons feature a `0.5rem` corner radius and medium font weight.

### Input Fields
Inputs are clean with a 1px `Slate-200` border that transforms to a 2px `Primary-500` border on focus. Labels sit clearly above the field in `label-md` style.

### Cards
Service cards are the primary vehicle for information. They feature a white background, Level 1 elevation, and generous internal padding (`lg`). Images within cards should always have a `0.5rem` top-corner radius to match the container.

### Chips & Badges
Used for categories (e.g., "Plumbing", "Cleaning") and status (e.g., "Verified"). These should be pill-shaped with low-saturation background tints of the primary or semantic colors to keep them from overwhelming the visual hierarchy.

### Progress Steppers
Essential for the booking flow. These should be minimalist, using the primary blue for completed/active steps and a light gray for pending steps, connected by thin 2px lines.