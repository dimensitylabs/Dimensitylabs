# Dimensity Labs — Folder Structure
**Framework:** Next.js 16 (App Router) · **Language:** TypeScript 5.x
**Styling:** Tailwind CSS 4.x + CSS Custom Properties

---

## Root

```
dimensity-labs/
├── .env.local                          # Environment variables (Resend API key, emails)
├── .env.example                        # Template for env vars (commit this)
├── .eslintrc.json                      # ESLint config (Next.js + TypeScript rules)
├── .gitignore
├── .prettierrc                         # Prettier config
├── next.config.ts                      # Next.js config (image domains, redirects)
├── package.json
├── postcss.config.mjs                  # PostCSS for Tailwind
├── tailwind.config.ts                  # Tailwind: brand tokens, spacing, typography
├── tsconfig.json                       # TypeScript strict mode, path aliases
└── src/                                # All source code lives here
```

---

## Full Tree

```
src/
│
├── app/                                # Next.js App Router root
│   │
│   ├── layout.tsx                      # Root layout — fonts, metadata, ThemeProvider
│   ├── page.tsx                        # Landing Page  /
│   ├── not-found.tsx                   # 404 page
│   ├── globals.css                     # CSS custom properties, resets, base styles
│   │
│   ├── about/
│   │   └── page.tsx                    # About Page  /about
│   │
│   ├── process/
│   │   └── page.tsx                    # Process Page  /process
│   │
│   ├── contact/
│   │   └── page.tsx                    # Contact Page  /contact
│   │
│   ├── works/
│   │   ├── page.tsx                    # Works Index  /works
│   │   └── [slug]/
│   │       └── page.tsx                # Single Work  /works/[slug]
│   │
│   ├── services/
│   │   ├── page.tsx                    # Services Index  /services
│   │   └── [slug]/
│   │       └── page.tsx                # Single Service  /services/[slug]
│   │
│   └── api/
│       └── contact/
│           └── route.ts                # POST /api/contact — Resend email handler
│
│
├── components/
│   │
│   ├── ui/                             # Primitive, reusable components (no business logic)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.types.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   └── Badge.types.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.types.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.types.ts
│   │   ├── Textarea/
│   │   │   ├── Textarea.tsx
│   │   │   └── Textarea.types.ts
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   └── Select.types.ts
│   │   ├── Divider/
│   │   │   └── Divider.tsx
│   │   ├── SectionLabel/
│   │   │   └── SectionLabel.tsx
│   │   ├── Tag/
│   │   │   └── Tag.tsx
│   │   └── index.ts                    # Re-export all UI primitives
│   │
│   ├── layout/                         # Structural layout components
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx              # 'use client' — handles scroll hide/show
│   │   │   ├── NavLinks.tsx            # Desktop nav links
│   │   │   ├── MobileMenu.tsx          # 'use client' — slide-in mobile menu
│   │   │   └── Navbar.types.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.types.ts
│   │   ├── Container/
│   │   │   └── Container.tsx           # max-w-[1160px] centered wrapper
│   │   └── Section/
│   │       └── Section.tsx             # Consistent section vertical spacing
│   │
│   ├── common/                         # Shared, composed components
│   │   ├── Logo/
│   │   │   └── Logo.tsx                # Wordmark: "Brand" + "mark" italic
│   │   ├── ThemeToggle/
│   │   │   └── ThemeToggle.tsx         # 'use client' — sun/moon, localStorage
│   │   ├── PageTransition/
│   │   │   └── PageTransition.tsx      # 'use client' — Framer Motion page wrapper
│   │   ├── AnimatedCounter/
│   │   │   └── AnimatedCounter.tsx     # 'use client' — count-up on scroll
│   │   ├── ServiceCard/
│   │   │   ├── ServiceCard.tsx
│   │   │   └── ServiceCard.types.ts
│   │   ├── WorkCard/
│   │   │   ├── WorkCard.tsx
│   │   │   └── WorkCard.types.ts
│   │   ├── TestimonialCard/
│   │   │   └── TestimonialCard.tsx
│   │   ├── ProcessStep/
│   │   │   └── ProcessStep.tsx
│   │   ├── SocialIcon/
│   │   │   └── SocialIcon.tsx          # Line icons for social links
│   │   ├── Breadcrumb/
│   │   │   └── Breadcrumb.tsx
│   │   └── Accordion/
│   │       └── Accordion.tsx           # 'use client' — CSS max-height transition
│   │
│   └── sections/                       # Full page sections (composed from ui/ + common/)
│       ├── home/
│       │   ├── HeroSection.tsx
│       │   ├── MarqueeSection.tsx       # CSS animation marquee
│       │   ├── ServicesOverview.tsx
│       │   ├── StatsBar.tsx
│       │   ├── SelectedWorks.tsx
│       │   ├── ProcessPreview.tsx
│       │   ├── TestimonialSection.tsx
│       │   └── CTABand.tsx
│       ├── works/
│       │   ├── WorksHero.tsx
│       │   ├── WorksFilterBar.tsx       # 'use client' — filter state
│       │   └── WorksGrid.tsx
│       ├── work/                        # Single work page sections
│       │   ├── WorkHero.tsx
│       │   ├── WorkCover.tsx
│       │   ├── WorkContent.tsx
│       │   ├── WorkSidebar.tsx
│       │   └── WorkNavigation.tsx       # prev/next links
│       ├── services/
│       │   ├── ServicesHero.tsx
│       │   ├── ServicesGrid.tsx
│       │   ├── PricingSection.tsx
│       │   └── FAQSection.tsx
│       ├── service/                     # Single service page sections
│       │   ├── ServiceHero.tsx
│       │   ├── ServiceApproach.tsx
│       │   ├── ServiceTechStack.tsx
│       │   ├── ServiceScope.tsx
│       │   └── ServiceRelatedWorks.tsx
│       ├── contact/
│       │   ├── ContactForm.tsx          # 'use client' — react-hook-form + Zod
│       │   └── ContactInfo.tsx
│       ├── about/
│       │   ├── AboutHero.tsx
│       │   ├── StoryTimeline.tsx
│       │   ├── ValuesGrid.tsx
│       │   └── VisionMission.tsx
│       └── process/
│           ├── ProcessHero.tsx
│           ├── ProcessPhases.tsx
│           └── ProcessTimeline.tsx
│
│
├── data/                               # Static data (TypeScript, typed with Zod)
│   ├── works.ts                        # Work[] — 5 seed projects
│   ├── services.ts                     # Service[] — 6 services
│   ├── testimonials.ts                 # Testimonial[] — quotes
│   ├── faqs.ts                         # FAQ[] — accordion content
│   ├── values.ts                       # Value[] — brand values
│   ├── process.ts                      # ProcessPhase[] — 4 phases with detail
│   └── socials.ts                      # SocialLink[] — platform URLs
│
│
├── lib/                                # Pure utility functions, no UI concerns
│   ├── cn.ts                           # classnames/clsx helper
│   ├── format.ts                       # Number/date formatting (e.g. ₹25,000)
│   ├── theme.ts                        # Theme detection, localStorage helpers
│   ├── resend.ts                       # Resend API client wrapper
│   └── animations.ts                   # Framer Motion reusable variants
│
│
├── hooks/                              # Custom React hooks
│   ├── useTheme.ts                     # Theme state + toggle + persistence
│   ├── useScrollDirection.ts           # Up/down detection for Navbar
│   ├── useInView.ts                    # Intersection Observer wrapper
│   └── useMediaQuery.ts                # Responsive breakpoint detection
│
│
├── types/                              # Shared TypeScript types + Zod schemas
│   ├── work.ts                         # Work type + schema
│   ├── service.ts                      # Service type + schema
│   ├── testimonial.ts                  # Testimonial type
│   ├── contact.ts                      # ContactFormData type + Zod schema
│   ├── faq.ts                          # FAQ type
│   └── index.ts                        # Re-export all types
│
│
├── styles/                             # Global styles (non-Tailwind)
│   └── typography.css                  # Base typographic defaults (imported in globals.css)
│
│
└── fonts.ts                            # next/font: Cormorant Garamond + Syne
```

---

## Key File Contents

### `app/globals.css`
```css
@import "tailwindcss";
@import "./styles/typography.css";

/* Brand CSS Custom Properties */
:root {
  --smoky-black:   #11120D;
  --olive-drab:    #565449;
  --bone:          #D8CFBC;
  --floral-white:  #FFFBF4;

  /* Semantic — Light (default) */
  --color-bg:             #FFFBF4;
  --color-surface:        #FFFBF4;
  --color-surface-alt:    #F0EBE0;
  --color-text-primary:   #11120D;
  --color-text-secondary: #565449;
  --color-text-muted:     #D8CFBC;
  --color-accent:         #11120D;
  --color-accent-text:    #FFFBF4;
  --color-border:         rgba(86,84,73,0.15);
  --color-border-strong:  #565449;
  --color-divider:        rgba(216,207,188,0.5);

  /* Spacing tokens */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;
  --space-5xl: 96px;
}

[data-theme="dark"] {
  --color-bg:             #11120D;
  --color-surface:        #1C1D18;
  --color-surface-alt:    #222318;
  --color-text-primary:   #FFFBF4;
  --color-text-secondary: #D8CFBC;
  --color-text-muted:     #565449;
  --color-accent:         #FFFBF4;
  --color-accent-text:    #11120D;
  --color-border:         rgba(216,207,188,0.10);
  --color-border-strong:  rgba(216,207,188,0.30);
  --color-divider:        rgba(216,207,188,0.08);
}

/* Global transitions for theme switching */
*, *::before, *::after {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--bone); border-radius: 2px; }

/* Selection */
::selection { background: var(--olive-drab); color: var(--floral-white); }

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--olive-drab);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'smoky-black':  '#11120D',
        'olive-drab':   '#565449',
        'bone':         '#D8CFBC',
        'floral-white': '#FFFBF4',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        syne:      ['var(--font-syne)', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'ui':   ['11px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        'cap':  ['12px', { lineHeight: '1.5', letterSpacing: '0.06em' }],
        'body': ['15px', { lineHeight: '1.75' }],
        'h4':   ['18px', { fontWeight: '600', letterSpacing: '0.01em' }],
        'h3':   ['clamp(20px, 3vw, 32px)', { lineHeight: '1.3' }],
        'h2':   ['clamp(28px, 4vw, 48px)', { lineHeight: '1.2' }],
        'h1':   ['clamp(40px, 6vw, 64px)', { lineHeight: '1.1' }],
        'display': ['clamp(48px, 8vw, 80px)', { lineHeight: '1.0' }],
      },
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
      },
      borderRadius: {
        DEFAULT: '3px',
        'sm':  '2px',
        'md':  '4px',
        'pill':'100px',
      },
      borderWidth: {
        DEFAULT: '1px',
        'half':  '0.5px',
        '2':     '2px',
      },
      maxWidth: {
        'container': '1160px',
      },
      transitionDuration: {
        'fast':   '150ms',
        'base':   '200ms',
        'slow':   '300ms',
        'slower': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### `app/layout.tsx`
```tsx
import type { Metadata } from 'next'
import { cormorant, syne } from '@/fonts'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import { Footer } from '@/components/layout/Footer/Footer'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dimensitylabs.dev'),
  title: { default: 'Dimensity Labs', template: '%s — Dimensity Labs' },
  description: 'Mumbai-based digital product studio. We build websites, mobile apps, and AI-powered systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${syne.variable} font-syne bg-[var(--color-bg)] text-[var(--color-text-primary)]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

### `tsconfig.json` (path aliases)
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Route Map

```
/                     → src/app/page.tsx
/about                → src/app/about/page.tsx
/process              → src/app/process/page.tsx
/contact              → src/app/contact/page.tsx
/works                → src/app/works/page.tsx
/works/[slug]         → src/app/works/[slug]/page.tsx
/services             → src/app/services/page.tsx
/services/[slug]      → src/app/services/[slug]/page.tsx
*                     → src/app/not-found.tsx

API:
POST /api/contact     → src/app/api/contact/route.ts
```

---

## Static Generation

```ts
// app/works/[slug]/page.tsx
export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}

// app/services/[slug]/page.tsx
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}
```

Both use `export const dynamic = 'force-static'` — no server-side fetching needed at this stage.

---

## Client vs Server Components

| Component | Directive | Reason |
|---|---|---|
| All page layouts | Server (default) | Static HTML, SEO |
| Navbar | `'use client'` | Scroll direction detection |
| MobileMenu | `'use client'` | Open/close state |
| ThemeToggle | `'use client'` | localStorage + DOM mutation |
| PageTransition | `'use client'` | Framer Motion |
| AnimatedCounter | `'use client'` | IntersectionObserver |
| WorksFilterBar | `'use client'` | Filter state |
| ContactForm | `'use client'` | react-hook-form |
| Accordion | `'use client'` | Expand/collapse state |
| HeroSection | Server | No interactivity |
| All Cards | Server | Static content |
| Footer | Server | Static |

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `WorkCard.tsx` |
| Hooks | camelCase, `use` prefix | `useTheme.ts` |
| Utils/lib | camelCase | `cn.ts`, `format.ts` |
| Types | PascalCase | `Work`, `Service` |
| Files | kebab-case (except components) | `not-found.tsx` |
| CSS classes | Tailwind utility + CSS vars | — |
| Data files | camelCase | `works.ts` |
| API routes | kebab-case | `contact/route.ts` |

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "react-hook-form": "^7.54.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "resend": "^4.0.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.4.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

---

*Dimensity Labs · folderstructure.md · Version 1.0 · 2025*
*Questions: hello@dimensitylabs.dev*