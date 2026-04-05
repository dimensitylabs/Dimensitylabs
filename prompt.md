# Dimensity Labs — Full Website Build Prompt
**Framework:** Next.js 16 (App Router) · **Version:** 1.0 · 2025
**Studio:** Dimensity Labs · Mumbai, India · dimensitylabs.dev

---

## 0. PROJECT OVERVIEW

Build a complete, production-ready multi-page website for **Dimensity Labs** — a Mumbai-based digital product studio that designs and builds websites, mobile apps, and AI-powered systems. The site must feel premium, minimal, and intentional — reflecting the brand's core personality: *Earthy · Refined · Considered · Quiet authority · Warm minimalism.*

**Pages to build:**
1. `/` — Landing Page
2. `/works` — Works Index
3. `/works/[slug]` — Single Work (Case Study)
4. `/services` — Services Index
5. `/services/[slug]` — Single Service
6. `/contact` — Contact
7. `/about` — About / Story *(optional but included)*
8. `/process` — Process *(optional but included)*
9. `404` — Custom Not Found

---

## 1. TECH STACK

```
Next.js        16 (App Router, Server Components by default)
TypeScript     5.x — strict mode
Tailwind CSS   4.x — configured with brand tokens
Framer Motion  latest — page transitions + micro-interactions
next/font      — Cormorant Garamond + Syne via Google Fonts
next/image     — all images optimised
next/link      — all navigation
Zod            — form validation
react-hook-form — contact form
Vercel         — deployment target
```

**No UI libraries (shadcn, MUI, Chakra, etc.) — build all components from scratch.**
**No CSS-in-JS — Tailwind only, with CSS custom properties for theming.**

---

## 2. COLOR SYSTEM

Define all colors as CSS custom properties in `globals.css`. Implement light/dark via `[data-theme="dark"]` on `<html>`.

```css
/* globals.css */
:root {
  /* Raw palette */
  --smoky-black:   #11120D;
  --olive-drab:    #565449;
  --bone:          #D8CFBC;
  --floral-white:  #FFFBF4;

  /* Semantic tokens — Light (default) */
  --color-bg:            #FFFBF4;
  --color-surface:       #FFFBF4;
  --color-surface-alt:   #F0EBE0;
  --color-text-primary:  #11120D;
  --color-text-secondary:#565449;
  --color-text-muted:    #D8CFBC;
  --color-accent:        #11120D;
  --color-accent-text:   #FFFBF4;
  --color-border:        rgba(86, 84, 73, 0.15);
  --color-border-strong: #565449;
  --color-divider:       rgba(216, 207, 188, 0.5);
}

[data-theme="dark"] {
  --color-bg:            #11120D;
  --color-surface:       #1C1D18;
  --color-surface-alt:   #222318;
  --color-text-primary:  #FFFBF4;
  --color-text-secondary:#D8CFBC;
  --color-text-muted:    #565449;
  --color-accent:        #FFFBF4;
  --color-accent-text:   #11120D;
  --color-border:        rgba(216, 207, 188, 0.10);
  --color-border-strong: rgba(216, 207, 188, 0.30);
  --color-divider:       rgba(216, 207, 188, 0.08);
}

/* Transitions */
*, *::before, *::after {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

**60-30-10 Rule:** In every layout — 60% dominant (Floral White or Smoky Black), 30% secondary (Bone or Olive Drab), 10% accent.

**Color pairing rules (strictly enforced):**
- Olive Drab text on Bone bg → NEVER (insufficient contrast for body copy)
- Smoky Black bg → always use Floral White or Bone text
- Floral White/Bone bg → always use Smoky Black text
- Olive Drab surfaces → Floral White text at full opacity

---

## 3. TYPOGRAPHY

```ts
// app/fonts.ts
import { Cormorant_Garamond, Syne } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})
```

| Role | Family | Weight | Size | Tracking |
|---|---|---|---|---|
| Display / Hero | Cormorant Garamond | 300 | clamp(48px, 8vw, 80px) | -0.01em |
| H1 | Cormorant Garamond | 400 | clamp(40px, 6vw, 64px) | 0 |
| H2 | Cormorant Garamond | 400 | clamp(28px, 4vw, 48px) | 0 |
| H3 | Cormorant Garamond | 400 italic | clamp(20px, 3vw, 32px) | 0 |
| H4 / Section Label | Syne | 600 | 18px | +0.01em |
| Body | Syne | 400 | 15px | 0 |
| UI Label / Nav | Syne | 500 | 11px | +0.18em, UPPERCASE |
| Caption | Syne | 400 | 12px | +0.06em |
| Mono | Courier New | 400 | 13px | 0 |

**Rules:**
- Cormorant Garamond = emotional weight, headlines, pull quotes
- Syne = UI, body copy, navigation, labels
- Never mix more than two typefaces
- Italic in Cormorant Garamond = emotional emphasis, never bold-italic
- Never set Cormorant below 16px digital
- UI labels + nav items = uppercase + 0.18em tracking always

---

## 4. SPACING SYSTEM

All spacing from 8px base unit. Tailwind config extended:

```js
// tailwind.config.ts
spacing: {
  'xs':  '4px',
  'sm':  '8px',
  'md':  '16px',
  'lg':  '24px',
  'xl':  '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
  '5xl': '96px',
}
```

Container max-width: 1160px, centered. Section vertical rhythm: `clamp(64px, 8vw, 96px)`.

---

## 5. BORDER RADIUS & BORDERS

- Default / cards: `3px` (sharp brand voice)
- Inputs: `4px`
- Pills / tags only: `100px`
- **Never** use large border-radius (>6px on structural elements) — it softens the brand
- Default border: `0.5px` — not 1px, not 2px
- Emphasis border: `1px`
- Feature/heavy: `2px` (one per layout max)

---

## 6. COMPONENT LIBRARY (build these from scratch)

### 6.1 `<Button>`
```tsx
// Props: variant ('primary' | 'secondary' | 'ghost' | 'ghost-dark' | 'text-link')
// Props: size ('sm' | 'default' | 'lg')
// Props: asChild (boolean) — for next/link wrapping

// Primary:  bg #11120D, text #FFFBF4, no border
// Secondary: bg #D8CFBC, text #11120D, no border
// Ghost light: transparent, 0.5px border #11120D, text #11120D
// Ghost dark: transparent, 0.5px border rgba(216,207,188,0.4), text #D8CFBC
// Text link: no bg, no border, text #565449, underline on hover

// ALL button labels: Syne, 11px, UPPERCASE, 0.14em tracking
// Hover: transform: scale(1.02), 150ms ease
// Sizes:
//   sm:      padding 9px 20px, font 10px
//   default: padding 13px 28px, font 11px
//   lg:      padding 17px 40px, font 12px
// Touch target minimum: 44px height
// border-radius: 3px
```

### 6.2 `<Card>`
```tsx
// Tier 1 Default:  bg Floral White, 0.5px Bone border, 3px radius
// Tier 2 Dark:     bg Smoky Black, same border spec
// Tier 3 Tinted:   bg Bone, no border, 3px radius

// Anatomy:
//  - Image block: 160px min height, width 100%
//  - Tag/category: Syne 10px uppercase, Olive Drab
//  - Title: Cormorant Garamond 22px
//  - Body: Syne 13px, Olive Drab, 1.65 line-height
//  - CTA: Ghost or Primary, small size

// Hover: border-color shifts to Olive Drab, 200ms ease
// No drop shadows — flat surfaces only
```

### 6.3 `<Input>` / `<Textarea>`
```tsx
// Height: 42px (input), auto (textarea)
// Border: 0.5px solid #b8b2a5 (resting)
// Focus: 0.5px solid #565449 — NO box-shadow, border shift only
// Label: Syne 10px uppercase, Olive Drab, 7px gap below
// Placeholder: Olive Drab at 40% opacity
// bg: transparent
// border-radius: 4px
// Error: border #8B3A3A
// Success: border #3A6B4A
```

### 6.4 `<Navbar>`
```tsx
// Dark nav variant (dark-surface pages)
// Light nav variant (light-surface pages) — border-bottom 0.5px Bone

// Structure:
//   Left: Wordmark (Brand + mark italic)
//   Center: Nav links (desktop) — Syne 10px uppercase, 0.18em tracking
//   Right: Theme toggle (sun/moon) + CTA button

// Mobile (< 768px):
//   Hamburger icon (line icon, 24px, stroke 1px)
//   Full-screen slide-in menu, links stacked vertically with 24px gap
//   Animate: translateX(100%) → translateX(0), 300ms ease
//   No blur effects — solid surface color only

// Scroll behaviour:
//   Hide on scroll-down (mobile), show on scroll-up
//   On desktop: always sticky
//   Height: 56px mobile / 64px desktop

// Active link: 100% opacity; inactive: 60% opacity on dark, Olive Drab on light
```

### 6.5 `<ThemeToggle>`
```tsx
// Sun icon (light mode) / Moon icon (dark mode)
// Line icon, 16px, stroke 1px, round caps
// Click: toggle data-theme on <html>
// Persist to localStorage as 'dimensity-theme'
// Respect prefers-color-scheme on first load
// Smooth 300ms transition on all color properties
```

### 6.6 `<Logo>` / `<Wordmark>`
```tsx
// "Brand" → Cormorant Garamond 300, color: primary text
// "mark"  → Cormorant Garamond 300 Italic, color: Olive Drab (light) / Bone (dark)
// Below: tagline "DIGITAL PRODUCT STUDIO" — Syne 400, 9px, uppercase, 0.22em tracking
// Variants: dark / light (auto from theme)
// Min width: 120px digital
// Clear space = cap-height of 'D' on all sides
```

### 6.7 `<SectionLabel>`
```tsx
// Syne 11px, UPPERCASE, 0.18em tracking
// Color: Olive Drab (light) / Bone 60% opacity (dark)
// Optional left accent bar: 2px solid Olive Drab, 16px height
// Used above section headings to set context
```

### 6.8 `<Divider>`
```tsx
// Standard: 0.5px solid rgba(216,207,188,0.5)
// Dark: 0.5px solid rgba(216,207,188,0.15)
// Accent (left-border on blockquotes): 2px solid Olive Drab
```

### 6.9 `<Badge>` / `<Tag>`
```tsx
// Variants: filled-black | filled-olive | filled-bone | outline | ghost-light
// Text: Syne 10px uppercase, 0.12em tracking
// Padding: 5px 12px
// border-radius: 3px (default) / 100px (pill — use sparingly)
```

### 6.10 `<AnimatedCounter>`
```tsx
// Count-up animation on scroll into view
// Use Intersection Observer
// Duration: 1.5s ease-out
// Used in stats bar
```

### 6.11 `<PageTransition>`
```tsx
// Framer Motion layout transition between pages
// Fade + subtle translateY(8px) → translateY(0)
// Duration: 0.4s ease
// Wrap all page content in this component
```

### 6.12 `<ProcessStep>`
```tsx
// 01 / 02 / 03 / 04 numbered step card
// Number: Cormorant Garamond 300 italic, very large (80px), Bone color, absolute positioned
// Title: Syne 600 18px, Smoky Black
// Description: Syne 400 15px, Olive Drab
// Arrow connector between steps on desktop
```

### 6.13 `<ServiceCard>`
```tsx
// Service number: 01 — 06 (Syne 10px uppercase, Olive Drab)
// Title: Cormorant Garamond 26px
// Description: Syne 14px, 1.7 line-height
// Tech stack tags: <Badge> filled-bone
// Hover: border-color Olive Drab, 200ms
// Link to /services/[slug]
```

### 6.14 `<WorkCard>`
```tsx
// Full-bleed image top (CSS background-color placeholder if no image)
// Category tag top-left overlay: <Badge> ghost-light
// Title: Cormorant Garamond 22px
// Type: Syne 11px uppercase, Olive Drab
// Hover: scale(1.01) on image, 300ms ease
// Links to /works/[slug]
```

### 6.15 `<TestimonialCard>`
```tsx
// Opening quote mark: Cormorant Garamond 300, 80px, Bone, decorative
// Quote: Cormorant Garamond 400 italic, 22px, Smoky Black
// Attribution: initials avatar (40px circle, Olive Drab bg, Floral White text)
// Name: Syne 600 15px
// Role + Company: Syne 400 13px, Olive Drab
// Border: 0.5px Bone border
```

---

## 7. PAGE SPECIFICATIONS

---

### 7.1 LANDING PAGE `/`

**Meta:** title="Dimensity Labs — Digital Product Studio" | description="We build websites, mobile apps, and AI-powered systems for startups and businesses ready to scale."

#### Section 1: Hero
```
Layout: Full viewport height (100svh), centered vertically
Background: --color-bg
Content:
  - SectionLabel: "Mumbai, India · Est. 2025"
  - H1 (Cormorant Garamond 300, Display): "We don't just build websites."
  - H1 italic continuation: "We build digital businesses."
  - Body (Syne 15px, Olive Drab, max-width 520px):
    "One team. Full-service. From concept to launch — and everything that happens after."
  - CTA row:
    - Primary button: "View Our Work" → /works
    - Ghost button: "Talk to Us" → /contact
  - Scroll indicator: animated dot bouncing in chevron-down, Syne 10px uppercase "Scroll"
Animation: Hero text staggered fade-in + translateY(16px → 0), 0.6s each with 0.1s delay between lines
```

#### Section 2: Marquee / Ticker
```
Full-width horizontal scroll, infinite loop (CSS animation, no JS library)
Background: #11120D (Smoky Black)
Content: "Web Design  ·  Mobile Apps  ·  AI Solutions  ·  Automation  ·  Branding  ·  Strategy  ·"
Typography: Cormorant Garamond 400 italic, 24px, Floral White
Speed: 40s linear infinite, pause on hover
```

#### Section 3: Services Overview
```
SectionLabel: "What We Do"
H2: "Every digital need. Under one roof."
Grid: 3-col desktop, 2-col tablet, 1-col mobile
Show 6 <ServiceCard> components (all services)
Below grid: Ghost button "Explore All Services" → /services
```

#### Section 4: Stats Bar
```
Background: --color-surface
Border-top + border-bottom: 0.5px divider
3-col layout (flex, centered):
  - <AnimatedCounter> "10+" + label "Projects Delivered"
  - <AnimatedCounter> "6" + label "Services Offered"
  - <AnimatedCounter> "100%" + label "Client Satisfaction"
Numbers: Cormorant Garamond 300 italic, clamp(40px, 6vw, 64px), Smoky Black
Labels: Syne 11px uppercase, Olive Drab
Dividers between stats: vertical 0.5px Bone
```

#### Section 5: Selected Works
```
SectionLabel: "Our Work"
H2: "Case studies worth reading."
Layout:
  - Row 1: large card (2/3 width) + small card (1/3 width) — desktop
  - Row 2: 2 equal cards
  - Mobile: single column
Show 4 <WorkCard> components
Below: Primary button "See All Work" → /works
```

#### Section 6: Process (abbreviated)
```
SectionLabel: "How We Work"
H2: "Four phases. No filler."
Horizontal stepper on desktop, vertical on mobile:
  01 Discovery & Immersion
  02 Strategy & Direction
  03 Design & Develop
  04 Refine & Deliver
Each step: number + title + one-line description
Ghost button below: "See Full Process" → /process
```

#### Section 7: Testimonial
```
Full-width, bg --color-surface, centered max-width 720px
<TestimonialCard> — single large testimonial
Quote: "Dimensity Labs delivered more than we expected — fast, clear, and honest throughout."
Attribution: Client initial + name + role
```

#### Section 8: CTA Band
```
Full-width section
Background: #11120D
Color: Floral White
H2 (Cormorant Garamond 400, 48px): "Ready to build something that lasts?"
Body (Syne 15px, Bone): "Tell us about your project. Free 30-minute scoping call."
Primary button (inverted — bg Floral White, text Smoky Black): "Start a Project" → /contact
Ghost button (light on dark): "View Pricing" → /#pricing
```

#### Section 9: Footer
```
Background: #11120D
Text: Floral White / Bone
Columns (desktop 4-col, tablet 2-col, mobile 1-col stacked):
  Col 1: Wordmark + tagline + "Mumbai, India"
  Col 2: Navigate — Home / Works / Services / About / Process
  Col 3: Services — Web / Mobile / AI / Automation / Branding / Consulting
  Col 4: Connect — Social icons (Instagram, Twitter/X, LinkedIn, Dribbble, Behance) + email
Bottom bar: divider + "© 2025 Dimensity Labs. All rights reserved." + "Currently Taking Projects ●" (pulsing green dot)
All footer links: Syne 13px, Bone 60% opacity, hover 100% opacity
```

---

### 7.2 WORKS PAGE `/works`

**Meta:** title="Works — Dimensity Labs" | description="Case studies across web, mobile, AI, and branding from Dimensity Labs."

```
Hero: compact (not full-height)
  SectionLabel: "Selected Work"
  H1: "Things we've built."
  Body: "From early-stage startups to growing businesses — every project in here taught us something."

Filter bar:
  Category filter: All / Web / Mobile / AI / Branding / Automation
  Syne 11px uppercase buttons, ghost variant
  Active: filled-black badge
  Animate filter transitions: cards fade + rearrange, 250ms ease

Works Grid:
  Masonry-style or uniform grid, 3-col desktop / 2-col tablet / 1-col mobile
  Each <WorkCard>:
    - Square or 4:3 image placeholder (CSS bg color based on category)
    - Category badge top-left
    - Project title (Cormorant Garamond 22px)
    - Type (Syne 11px uppercase, Olive Drab)
    - Hover: subtle scale + border shift

After grid: "Currently taking new projects —" + CTA button → /contact
```

**Work data type:**
```ts
type Work = {
  slug: string
  title: string
  type: string
  category: 'web' | 'mobile' | 'ai' | 'branding' | 'automation'
  year: number
  coverColor: string  // CSS color for placeholder
  tags: string[]
  shortDesc: string
  challenge: string
  solution: string
  outcome: string
  services: string[]
  techStack: string[]
  testimonial?: { quote: string; name: string; role: string }
}
```

**Initial seed data (5 projects):**
```ts
const works: Work[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    type: 'Full Stack Web Development',
    category: 'web',
    year: 2025,
    coverColor: '#D8CFBC',
    tags: ['Next.js', 'E-Commerce', 'CMS'],
    shortDesc: 'End-to-end storefront with CMS, checkout, and analytics dashboard.',
    challenge: 'Client had a fragmented setup — three separate tools for inventory, orders, and marketing. Operational overhead was killing growth.',
    solution: 'Built a unified Next.js storefront connected to a headless CMS, custom checkout flow, and a real-time admin dashboard. Single source of truth.',
    outcome: 'Reduced operational overhead by 60%. Checkout conversion up 23% in first 30 days.',
    services: ['Web Design & Development', 'Consulting & Strategy'],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'Sanity CMS'],
  },
  {
    slug: 'ai-customer-support-chatbot',
    title: 'AI Support Chatbot',
    type: 'Customer Support Automation',
    category: 'ai',
    year: 2025,
    coverColor: '#565449',
    tags: ['Claude API', 'AI', 'Automation'],
    shortDesc: 'Context-aware AI chatbot integrated into a SaaS product support workflow.',
    challenge: 'Support team was drowning in repetitive tickets. Average response time was 6 hours.',
    solution: 'Integrated Claude API with the client\'s knowledge base. Built a custom handoff flow to human agents for edge cases.',
    outcome: '78% of tickets resolved autonomously. Average response time dropped to under 90 seconds.',
    services: ['AI Solutions', 'AI Automation'],
    techStack: ['Claude API', 'Next.js', 'Vercel AI SDK', 'Supabase'],
  },
  {
    slug: 'fintech-mobile-app',
    title: 'FinTech Mobile App',
    type: 'React Native',
    category: 'mobile',
    year: 2025,
    coverColor: '#11120D',
    tags: ['React Native', 'iOS', 'Android'],
    shortDesc: 'Cross-platform personal finance app with transaction tracking and goal setting.',
    challenge: 'MVP existed as a web app only. Target users were 90% mobile — engagement was low.',
    solution: 'Rebuilt core flows as a React Native app. Designed a new IA focused on daily check-ins rather than passive dashboards.',
    outcome: 'Launched to App Store and Google Play. Daily active usage up 3x vs the web product.',
    services: ['Mobile App Development', 'Digital Branding'],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Plaid API'],
  },
  {
    slug: 'lead-gen-automation',
    title: 'Lead Gen Pipeline',
    type: 'Workflow Automation',
    category: 'automation',
    year: 2025,
    coverColor: '#FFFBF4',
    tags: ['n8n', 'Make', 'CRM'],
    shortDesc: 'Automated outbound lead generation and CRM enrichment pipeline.',
    challenge: 'Sales team spending 4+ hours/day manually qualifying and enriching leads from multiple sources.',
    solution: 'Built an n8n pipeline that scrapes, scores, enriches, and routes leads directly to the right rep in HubSpot — zero manual input.',
    outcome: 'Reclaimed 20+ hours/week for the sales team. Lead response time cut from 4 hours to 8 minutes.',
    services: ['AI Automation', 'Consulting & Strategy'],
    techStack: ['n8n', 'HubSpot API', 'OpenAI', 'Airtable'],
  },
  {
    slug: 'saas-brand-identity',
    title: 'SaaS Brand Identity',
    type: 'Brand Identity',
    category: 'branding',
    year: 2025,
    coverColor: '#D8CFBC',
    tags: ['Branding', 'Logo', 'Style Guide'],
    shortDesc: 'Complete visual identity for a B2B SaaS startup from zero to launch.',
    challenge: 'Founding team was technical — strong product, weak brand. Pitching to enterprise clients without credible visual identity.',
    solution: 'Strategy-first: defined positioning and voice before touching visuals. Delivered full brand system — logo, palette, type, components, pitch deck.',
    outcome: 'Closed Series A round two months after brand launch. Founder cited brand credibility as a key trust signal.',
    services: ['Digital Branding', 'Consulting & Strategy'],
    techStack: ['Figma', 'Adobe Illustrator'],
  },
]
```

---

### 7.3 SINGLE WORK PAGE `/works/[slug]`

**Meta:** Dynamic — title=`{work.title} — Dimensity Labs`

```
Generate: export async function generateStaticParams()

Layout:
  Breadcrumb: Works / {title} — Syne 11px uppercase, Olive Drab
  
  Hero block:
    Category badge
    H1: project title (Cormorant Garamond 300, Display size)
    Type + Year (Syne 11px uppercase, Olive Drab)
    Services tags (<Badge> filled-bone)
  
  Cover visual:
    Full-width block, 480px height desktop / 240px mobile
    Background: coverColor CSS var
    CSS geometric shape (e.g. centered rectangle, offset lines) — no stock images
  
  Two-column body (desktop: 2/3 content + 1/3 sidebar — sticky sidebar)
  
  Content col:
    Section: "The Challenge"
      SectionLabel + body text (challenge)
    Section: "The Solution"
      SectionLabel + body text (solution)
    Section: "The Outcome"
      SectionLabel + body text (outcome) + metric callouts (Cormorant Garamond italic large number)
  
  Sidebar (sticky):
    Services used (list)
    Tech stack (badge list)
    Year
    Category
    Optional: Testimonial <TestimonialCard>
  
  Mobile: sidebar collapses to accordion below content

  Bottom CTA:
    "Interested in a similar project?" + CTA button → /contact

  Next/Prev navigation:
    ← Previous Work | Next Work →
    Cormorant Garamond 400 italic for project names
```

---

### 7.4 SERVICES PAGE `/services`

**Meta:** title="Services — Dimensity Labs" | description="Web, mobile, AI, automation, branding, and strategy — everything your business needs to scale digitally."

```
Hero (compact):
  SectionLabel: "What We Offer"
  H1: "One studio. Everything you need."
  Body: "From your first landing page to a full AI-powered backend — we handle every layer of the digital stack."

Services grid:
  2-col desktop, 1-col mobile
  Each service card (large format):
    Number: 01–06 (Cormorant Garamond 300 italic, 64px, Bone — decorative, behind content)
    Title: Cormorant Garamond H2
    Description: Syne 15px body
    Tech stack badges
    Scope bullets: Syne 13px, Olive Drab, preceded by "—"
    CTA: Ghost button "Learn More" → /services/[slug]
    Hover: border Olive Drab

Pricing section:
  SectionLabel: "Pricing"
  H2: "Clear. Honest. No surprises."
  3 pricing cards:
    Starter: ₹25,000/project
    Growth: ₹75,000/project
    Custom: Let's Talk
  Card structure:
    Plan name (Syne 600 18px)
    Price (Cormorant Garamond 300 italic, 48px)
    Per period label (Syne 11px uppercase)
    Description (Syne 13px, Olive Drab)
    Feature list (Syne 13px, line icons ✓)
    CTA button
  Featured card (Growth): 1px Olive Drab border, "Most Popular" badge top-right
  Note: "Min project cost ₹15,000. International clients welcome."

FAQ section:
  SectionLabel: "Questions"
  H2: "Things people ask."
  Accordion (no animation library — CSS max-height transition):
    4 FAQs from brand doc
    Q: Syne 600 15px | A: Syne 400 15px, Olive Drab
    Expand icon: + / − (line icon)
    Border: 0.5px Bone between items
```

**Services data type:**
```ts
type Service = {
  slug: string
  number: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  scope: string[]
  icon: string // SVG path string
  relatedWorks: string[] // work slugs
}
```

---

### 7.5 SINGLE SERVICE PAGE `/services/[slug]`

```
Generate: export async function generateStaticParams()

Hero:
  Service number (decorative background)
  SectionLabel: category
  H1: service title
  Body: longDescription
  CTA: "Start a Project" → /contact

How we approach this:
  3 numbered steps specific to this service
  Each: Syne 600 title + Syne 400 body

Tech stack:
  H3: "Technologies We Use"
  Badge grid: filled-bone badges
  
Scope:
  H3: "What's Included"
  Clean list, Syne 15px, with — prefix

Related works:
  H3: "Work in this category"
  2–3 WorkCards filtered by service

Pricing callout:
  Card: relevant pricing tier highlighted
  CTA: "Start a Project" → /contact
```

---

### 7.6 CONTACT PAGE `/contact`

**Meta:** title="Contact — Dimensity Labs" | description="Start a project, ask a question, or just say hello."

```
Two-column layout (desktop): Form col (60%) + Info col (40%)
Mobile: stacked (info first, form below)

Left col — Form:
  H1: "Let's build something."
  Subtext: "Fill out the form. We'll reply within one business day."
  
  Form fields (react-hook-form + Zod):
    Name* (Input, placeholder "Your name")
    Email* (Input, placeholder "your@email.com")
    Company (Input, optional, placeholder "Company name")
    Service* (Select: Web / Mobile / AI / Automation / Branding / Strategy / Not sure yet)
    Budget (Select: Under ₹25K / ₹25K–₹75K / ₹75K–₹2L / Above ₹2L / International)
    Message* (Textarea, 5 rows, placeholder "Tell us about your project...")
    Submit: Primary button "Send Message" (full width)
  
  Success state:
    Replace form with:
    Cormorant Garamond italic 32px: "Message received."
    Syne 15px: "We'll be in touch within one business day."
    Ghost button: "Back to Home" → /
  
  Validation: inline error messages below fields, Syne 12px, warm red #8B3A3A

Right col — Info:
  Background: --color-surface
  Border: 0.5px Bone
  Padding: 32px
  border-radius: 3px

  Sections:
    "Response Time"
    Syne 13px: Within 1 business day
    
    "Scoping Call"
    Syne 13px: Free 30-minute call, no commitment
    
    "Based In"
    Syne 13px: Mumbai, India
    Syne 11px uppercase, Olive Drab: "Remote-first · Async-friendly"
    
    "Currently Taking Projects"
    Pulsing green dot (CSS animation) + "Open" label
    
    Divider
    
    Social links (icon + Syne 13px label):
      Instagram / Twitter/X / LinkedIn / Dribbble / Behance
      Each: line icon (16px) + label, hover Olive Drab
    
    Email:
      Syne 13px: hello@dimensitylabs.dev
      (clickable mailto:)
```

---

### 7.7 ABOUT PAGE `/about`

```
Hero:
  SectionLabel: "About"
  H1: "Built by people who care about the work."
  Body: Mission statement from brand doc

Story timeline:
  H2: "Our Story"
  Vertical timeline with year + milestone (from brand data table)
  Left border: 2px Olive Drab accent line
  Each milestone: Syne 11px year (uppercase) + Cormorant Garamond 26px italic description

Values section:
  H2: "What we believe."
  Grid: 2-col desktop, 1-col mobile
  Each value: symbol + Syne 600 title + Syne 400 description
  6 values from the content doc

Vision + Mission:
  Two-column split layout
  Left: Vision (Cormorant Garamond italic large)
  Right: Mission (Syne body)

CTA: "Work with us" → /contact
```

---

### 7.8 PROCESS PAGE `/process`

```
Hero:
  SectionLabel: "Process"
  H1: "Four phases. No filler."
  Body: "Clear scope, regular check-ins, and nothing ships without sign-off. Here's exactly how we work."

Four phase sections:
  Each phase = full section (alternating layout left/right on desktop)
  
  Phase structure:
    Large number (Cormorant Garamond 300 italic, 120px, Bone — background)
    Phase label (Syne 11px uppercase, Olive Drab)
    H2: Phase name
    Body: Expanded description (3–5 sentences)
    What you get: bullet list (Syne 13px)
    Estimated duration: badge

Timeline bar:
  Full-width horizontal connector (desktop) showing phase flow
  01 → 02 → 03 → 04
  Active state on hover

CTA: "Ready to start?" → /contact
```

---

### 7.9 404 PAGE

```
Background: #11120D
Color: Floral White

Centered content:
  Cormorant Garamond 300 italic, 120px: "404"
  Syne 11px uppercase, Bone 60%: "Page Not Found"
  Divider (Bone 15% opacity)
  Syne 15px, Bone: "This page doesn't exist. That's fine — start from the beginning."
  Primary button (inverted): "Go Home" → /
```

---

## 8. ANIMATIONS & TRANSITIONS

All animations via **Framer Motion**. Keep them minimal — this brand is "unhurried."

```ts
// Reusable motion variants
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
}
```

**Rules:**
- All animations trigger on scroll into view (`useInView` from Framer Motion, `once: true`)
- Page transitions: fade + subtle translateY, 0.4s
- No bounce, spring, or overshoot — ease only
- Theme toggle: 300ms transition on all CSS custom properties
- Navbar hide/show on scroll: 300ms ease
- Card hover: border-color 200ms ease, scale(1.01) on images 300ms
- Button hover: scale(1.02) 150ms ease
- Marquee: CSS animation only (no JS)
- Counter: count-up 1.5s ease-out on first viewport entry
- Accordion: max-height CSS transition 300ms ease

---

## 9. SEO & METADATA

```ts
// app/layout.tsx — root metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://dimensitylabs.dev'),
  title: { default: 'Dimensity Labs', template: '%s — Dimensity Labs' },
  description: 'Mumbai-based digital product studio. We build websites, mobile apps, and AI-powered systems.',
  keywords: ['digital studio', 'web development', 'mobile apps', 'AI solutions', 'Mumbai', 'Next.js'],
  authors: [{ name: 'Dimensity Labs' }],
  creator: 'Dimensity Labs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dimensitylabs.dev',
    siteName: 'Dimensity Labs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', creator: '@dimensitylabs' },
  robots: { index: true, follow: true },
}
```

Each page exports its own `metadata` or `generateMetadata` for dynamic pages.

---

## 10. DATA LAYER

No external CMS initially — data lives in TypeScript files under `src/data/`.

```ts
// src/data/works.ts     → Work[] (seed data above)
// src/data/services.ts  → Service[] (6 services)
// src/data/team.ts      → Team[] (if needed)
// src/data/faqs.ts      → FAQ[]
// src/data/testimonials.ts → Testimonial[]
// src/data/values.ts    → Value[]
```

All data is typed with Zod schemas as the source of truth.

---

## 11. ACCESSIBILITY

- All interactive elements: `focus-visible` ring — `2px solid #565449, 2px offset`
- All images: meaningful `alt` text
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- aria-label on all icon-only buttons (theme toggle, social icons, hamburger)
- aria-current="page" on active nav links
- Keyboard navigable menu (Escape closes mobile menu)
- Color contrast checked: all text/bg combinations meet WCAG AA
- Reduced motion: `@media (prefers-reduced-motion: reduce)` — disable transforms, keep opacity fades only
- Form labels always visible (not just placeholder text)

---

## 12. PERFORMANCE

- `next/image` for all images — `priority` on hero images
- `next/font` with `display: 'swap'`
- No render-blocking resources
- Server Components by default; `'use client'` only for interactive islands (ThemeToggle, MobileMenu, ContactForm, AnimatedCounter, Accordion)
- Static generation for all pages (`generateStaticParams` for dynamic routes)
- `next/link` with prefetching for all internal links

---

## 13. ENVIRONMENT

```bash
# .env.local (for contact form — use Resend or Nodemailer)
RESEND_API_KEY=
FROM_EMAIL=hello@dimensitylabs.dev
TO_EMAIL=hello@dimensitylabs.dev
```

Contact form → `app/api/contact/route.ts` → POST endpoint → Resend email API.

---

## 14. CODE QUALITY RULES

- TypeScript strict mode — no `any`
- All components typed with explicit Props interfaces
- No inline styles — Tailwind + CSS custom properties only
- No magic numbers — use spacing tokens
- Components colocated with their types in same directory
- Path aliases: `@/` → `src/`
- ESLint + Prettier configured
- Consistent naming: PascalCase components, camelCase utils, kebab-case files
- No barrel files (no `index.ts` re-exporting) — explicit imports only

---

## 15. VOICE & COPY GUIDELINES

| Context | Tone |
|---|---|
| Page headlines | Poetic, spare, confident |
| Section intros | Factual, considered, proud |
| CTAs | Clear, direct — never pushy |
| Error messages | Calm, helpful, non-apologetic |

- Em dashes ( — ) not hyphens
- No exclamation marks in professional copy
- No: "solutions", "leverage", "synergy", "holistic"
- Short sentences. Shorter paragraphs.
- Active voice always
- Numerals under 10 written out: "five projects", not "5 projects"

---

*Dimensity Labs · prompt.md · Version 1.0 · 2025*
*Questions: hello@dimensitylabs.dev*