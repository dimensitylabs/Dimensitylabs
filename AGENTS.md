<!-- BEGIN:nextjs-agent-rules -->
# AGENT.md — Autonomous Agent Instructions
**Project:** Dimensity Labs Website
**Framework:** Next.js 16 · App Router · TypeScript 5 · Tailwind CSS 4
**Agent Role:** Full-Stack Frontend Engineer

---

## 0. PRIME DIRECTIVE

You are building the Dimensity Labs website — a production-grade, multi-page Next.js 16 application for a Mumbai-based digital product studio. Every decision you make should reflect the brand personality: **Earthy · Refined · Considered · Quiet authority · Warm minimalism.**

Read `PROMPT.md` and `FOLDERSTRUCTURE.md` in full before writing a single line of code. They are the ground truth. When in doubt — refer back to them.

---

## 1. BEFORE YOU START ANY TASK

Run this checklist mentally before touching any file:

```
□ Have I read PROMPT.md fully?
□ Have I read FOLDERSTRUCTURE.md fully?
□ Do I know which page/component I am building?
□ Do I know which section of PROMPT.md covers this component?
□ Have I identified all dependencies this component has (types, data, utils)?
□ Am I building Server Component or Client Component? (see section 4 below)
□ Will this component need Framer Motion? If yes — is it 'use client'?
□ Am I using only the brand color palette? (no hex values outside the 4 brand colors)
□ Am I using only Cormorant Garamond and Syne? (no other fonts)
```

---

## 2. SETUP ORDER — FOLLOW EXACTLY

If starting from scratch, scaffold in this sequence. Do not skip steps.

```
Step 1:  Init project
         npx create-next-app@latest dimensity-labs --typescript --tailwind --app --src-dir --import-alias "@/*"

Step 2:  Install dependencies
         npm install framer-motion react-hook-form zod @hookform/resolvers resend clsx
         npm install -D prettier prettier-plugin-tailwindcss

Step 3:  Configure tailwind.config.ts (copy from FOLDERSTRUCTURE.md — extend with brand tokens)

Step 4:  Write src/app/globals.css (copy from FOLDERSTRUCTURE.md — CSS custom properties)

Step 5:  Write src/fonts.ts (Cormorant Garamond + Syne via next/font)

Step 6:  Write src/app/layout.tsx (root layout, metadata, font variables)

Step 7:  Write src/types/ — all types and Zod schemas FIRST before any data or components

Step 8:  Write src/data/ — seed data files (works.ts, services.ts, etc.)

Step 9:  Write src/lib/ — utilities (cn.ts, animations.ts, theme.ts, format.ts)

Step 10: Write src/hooks/ — custom hooks (useTheme, useScrollDirection, useInView)

Step 11: Build UI primitives in src/components/ui/ (Button, Badge, Card, Input, etc.)

Step 12: Build layout components (Navbar, Footer, Container, Section)

Step 13: Build common components (Logo, ThemeToggle, WorkCard, ServiceCard, etc.)

Step 14: Build page sections in src/components/sections/

Step 15: Build pages in src/app/ (start with /, then /works, /services, /contact, /about, /process)

Step 16: Build dynamic pages (/works/[slug], /services/[slug]) with generateStaticParams

Step 17: Build API route (app/api/contact/route.ts)

Step 18: Build not-found.tsx (404 page)

Step 19: Final pass — SEO metadata on all pages, accessibility audit, responsive check
```

---

## 3. FILE CREATION RULES

### Always create files in this order within a feature:
1. Types file first (`.types.ts`)
2. Data/logic file (if needed)
3. Component file (`.tsx`)
4. Export from parent `index.ts` (if applicable)

### Never create:
- Inline styles (`style={{ }}` attributes) — use Tailwind classes + CSS custom properties only
- Hardcoded hex values in component files — always use `var(--color-*)` or Tailwind tokens
- New color values outside the 4-color brand palette
- Components with `any` TypeScript type
- Components without explicit Props interface

### File naming:
```
Components:     PascalCase    → WorkCard.tsx, ServiceCard.tsx
Hooks:          camelCase     → useTheme.ts, useScrollDirection.ts
Utils:          camelCase     → cn.ts, format.ts
Types:          PascalCase    → work.ts exports Work, WorkCard etc.
Data:           camelCase     → works.ts, services.ts
Pages:          lowercase     → page.tsx, not-found.tsx
```

---

## 4. SERVER VS CLIENT — DECISION TREE

```
Is this component purely presentational (no state, no events, no browser APIs)?
  YES → Server Component (default, no directive needed)
  NO  → Continue...

Does it use: useState, useEffect, useRef, useContext, event handlers, or browser APIs?
  YES → 'use client'
  NO  → Server Component

Does it use Framer Motion?
  YES → 'use client'
  NO  → Continue above

Does it use next/navigation (useRouter, usePathname, useSearchParams)?
  YES → 'use client'
  NO  → Server Component
```

**Client Components in this project:**
- `Navbar` (scroll direction)
- `MobileMenu` (open/close state)
- `ThemeToggle` (localStorage + DOM)
- `PageTransition` (Framer Motion)
- `AnimatedCounter` (IntersectionObserver)
- `WorksFilterBar` (filter state)
- `ContactForm` (react-hook-form)
- `Accordion` (expand state)

**Everything else = Server Component.**

---

## 5. STYLING RULES — NON-NEGOTIABLE

### Color usage:
```tsx
// ✅ CORRECT — use CSS custom properties
<div className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">

// ✅ CORRECT — use Tailwind brand tokens (configured in tailwind.config.ts)
<div className="bg-floral-white text-smoky-black">

// ❌ WRONG — never hardcode hex in component
<div style={{ backgroundColor: '#FFFBF4' }}>

// ❌ WRONG — never use colors outside the palette
<div className="bg-blue-500 text-red-400">
```

### Typography usage:
```tsx
// ✅ CORRECT
<h1 className="font-cormorant font-light text-display tracking-[-0.01em]">
<p className="font-syne text-body leading-[1.75]">
<span className="font-syne text-ui uppercase tracking-[0.18em]">

// ❌ WRONG — never use default Tailwind font sizes for headings
<h1 className="text-6xl">
```

### Spacing:
```tsx
// ✅ CORRECT — use spacing tokens
<div className="p-md gap-lg mt-3xl">

// ❌ WRONG — arbitrary spacing that breaks the 8px grid
<div className="p-[13px] mt-[37px]">
```

### Borders:
```tsx
// ✅ CORRECT — 0.5px default
<div className="border-half border-[var(--color-border)]">

// ❌ WRONG — too heavy for default
<div className="border-2">
```

### Border radius:
```tsx
// ✅ CORRECT — sharp brand voice
<div className="rounded">         // 3px default
<input className="rounded-md">   // 4px for inputs
<span className="rounded-pill">  // 100px for tags only

// ❌ WRONG — softens brand voice
<div className="rounded-xl rounded-2xl rounded-full">
```

---

## 6. COMPONENT STRUCTURE TEMPLATE

```tsx
// src/components/common/ExampleCard/ExampleCard.tsx

import { type FC } from 'react'
import { type ExampleCardProps } from './ExampleCard.types'
import { cn } from '@/lib/cn'

const ExampleCard: FC<ExampleCardProps> = ({ title, description, className }) => {
  return (
    <article
      className={cn(
        'rounded border-half border-[var(--color-border)] p-xl',
        'bg-[var(--color-surface)]',
        'transition-colors duration-base',
        'hover:border-olive-drab',
        className
      )}
    >
      <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="font-syne text-body text-[var(--color-text-secondary)] mt-md">
        {description}
      </p>
    </article>
  )
}

export { ExampleCard }
```

```ts
// src/components/common/ExampleCard/ExampleCard.types.ts

export interface ExampleCardProps {
  title: string
  description: string
  className?: string
}
```

---

## 7. DATA LAYER RULES

- All data lives in `src/data/` as typed TypeScript arrays
- All types defined in `src/types/` with matching Zod schemas
- Never fetch data from an external API at build time (no CMS yet)
- `generateStaticParams` reads from `src/data/` directly
- Data imports: always named imports, never default
- Never mutate data arrays — treat as readonly

```ts
// ✅ CORRECT
import { works } from '@/data/works'
const work = works.find((w) => w.slug === slug)

// ❌ WRONG — don't fetch or call async at page level unless API route
const work = await fetch('/api/works/' + slug)
```

---

## 8. ANIMATION RULES

Use the pre-defined variants from `src/lib/animations.ts`. Do not invent new animation styles.

```ts
// src/lib/animations.ts — use these, don't create new ones
export const fadeUp       // opacity 0→1 + translateY 16→0, 0.5s ease
export const fadeIn       // opacity 0→1, 0.4s ease
export const scaleIn      // scale 0.97→1 + opacity, 0.4s ease
export const staggerContainer  // stagger children 0.1s
export const slideInRight // translateX 24→0 + opacity, 0.35s ease (mobile menu)
```

```tsx
// ✅ CORRECT usage
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  <motion.h1 variants={fadeUp}>Headline</motion.h1>
  <motion.p variants={fadeUp}>Body text</motion.p>
</motion.div>

// ❌ WRONG — never define custom animation inline
<motion.div
  animate={{ x: [0, 100, 0], scale: [1, 1.5, 1] }}
  transition={{ type: 'spring', bounce: 0.7 }}
>
```

**Absolutely no:**
- Spring/bounce transitions
- Looping animations (except the CSS marquee)
- Scale above 1.03 on hover
- translateY above 24px in entrance animations
- Rotation animations

---

## 9. THEME SYSTEM RULES

The theme toggle changes `data-theme="dark"` on `<html>`. All components auto-adapt through CSS custom properties. **No component should ever check the theme value directly.**

```tsx
// ✅ CORRECT — component adapts automatically via CSS vars
<div className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">

// ❌ WRONG — never read theme in component logic
const { theme } = useTheme()
const bgColor = theme === 'dark' ? '#11120D' : '#FFFBF4'
```

**Exception:** `ThemeToggle` component reads theme to swap sun/moon icon. That is the only legitimate use.

---

## 10. FORM RULES (Contact Page)

```tsx
// Always use react-hook-form + Zod resolver
// Validate with Zod schema defined in src/types/contact.ts
// Submit to POST /api/contact — never directly to email service from client

// Error display: inline below field, Syne 12px, color #8B3A3A
// Loading state: button text changes to "Sending..." + disable button
// Success state: replace entire form with success message (not a toast)
// Never show raw API errors to user — generic "Something went wrong. Try again." only
```

---

## 11. IMAGE HANDLING

```tsx
// Always use next/image
// If no real image: use CSS background-color placeholder from the work's coverColor
// Add priority prop to the first above-the-fold image on each page
// Always provide meaningful alt text
// Use sizes prop for responsive images

// ✅ CORRECT
<Image
  src="/works/ecommerce-cover.jpg"
  alt="E-Commerce Platform — product listing page"
  width={800}
  height={500}
  className="w-full h-auto object-cover"
  priority
/>

// For placeholder (no image):
<div
  className="w-full h-[240px] md:h-[480px]"
  style={{ backgroundColor: work.coverColor }}
  aria-label={`${work.title} cover`}
  role="img"
/>
```

---

## 12. SEO — PAGE METADATA

Every page must export metadata or generateMetadata. Use the template:

```ts
// Static page
export const metadata: Metadata = {
  title: 'Page Name',
  description: 'Specific description, 120–160 characters.',
  openGraph: {
    title: 'Page Name — Dimensity Labs',
    description: '...',
    url: 'https://dimensitylabs.dev/page-path',
  },
}

// Dynamic page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = works.find((w) => w.slug === params.slug)
  if (!work) return { title: 'Not Found' }
  return {
    title: work.title,
    description: work.shortDesc,
  }
}
```

---

## 13. ACCESSIBILITY CHECKLIST

Run through this before marking any component complete:

```
□ All images have alt text (meaningful, not "image" or filename)
□ All icon-only buttons have aria-label
□ All form inputs have visible <label> (not just placeholder)
□ Active nav link has aria-current="page"
□ Mobile menu close button has aria-label="Close menu"
□ Mobile menu open button has aria-label="Open menu" and aria-expanded
□ Accordion triggers have aria-expanded and aria-controls
□ Focus styles visible (2px solid #565449, 2px offset)
□ No color-only information conveyance
□ Heading hierarchy logical (h1 → h2 → h3, no skipping)
□ Interactive elements keyboard navigable
□ Escape key closes mobile menu and any open modals
□ Touch targets ≥ 44×44px
□ Font sizes ≥ 13px on mobile
```

---

## 14. RESPONSIVE BREAKPOINTS

```
Mobile:  375px  (base — mobile first)
Small:   480px  (sm:)
Tablet:  768px  (md:)
Laptop:  1024px (lg:)
Desktop: 1280px (xl:)
Wide:    1536px (2xl:)
```

Tailwind breakpoints are min-width by default. Always start at mobile, then layer up.

```tsx
// ✅ CORRECT — mobile first
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md md:gap-lg">

// ❌ WRONG — desktop first
<div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
```

**Zero horizontal overflow at any breakpoint.** If your component overflows at 375px, fix it before moving on.

---

## 15. VERIFICATION — BEFORE CALLING A TASK DONE

```
□ TypeScript compiles with zero errors (npx tsc --noEmit)
□ ESLint passes with zero errors (npx eslint src/)
□ No console.log or console.error in committed code
□ No TODO comments left unresolved
□ Component renders correctly at 375px, 768px, 1280px
□ Dark mode works (toggle data-theme="dark" on <html> in dev tools)
□ Keyboard navigation works (Tab through all interactive elements)
□ No inline styles
□ No hardcoded hex colors outside globals.css / tailwind.config.ts
□ All TypeScript types explicit — no `any`, no non-null assertions (!.) unless unavoidable
□ generateStaticParams present on all dynamic routes
□ Page exports metadata
□ All images use next/image or CSS placeholder (no <img> tags)
```

---

## 16. ANTI-PATTERNS — NEVER DO THESE

```
❌ Don't use any CSS framework other than Tailwind (no Bootstrap, MUI, Chakra, Mantine)
❌ Don't use any animation library other than Framer Motion (no GSAP, AOS, animate.css)
❌ Don't use any icon library (no Heroicons, Lucide, FontAwesome) — build line icons as SVG inline
❌ Don't add colors outside the 4-color palette — not even "just for this one thing"
❌ Don't use border-radius above 6px on anything that isn't a pill tag
❌ Don't use drop shadows (box-shadow) on cards, type, or the logo
❌ Don't use gradients — flat surfaces only
❌ Don't use fonts other than Cormorant Garamond and Syne
❌ Don't read theme value in component logic (except ThemeToggle)
❌ Don't fetch data client-side on page load (all data is static/build-time)
❌ Don't use barrel files (index.ts re-exports) in components/ui/ or components/common/
❌ Don't use default exports for components — named exports only
❌ Don't mutate data arrays
❌ Don't use Tailwind's arbitrary breakpoints ([width:]) — use defined breakpoints only
❌ Don't write CSS outside globals.css and tailwind.config.ts
❌ Don't use React.FC (use explicit return types or infer from const)
❌ Don't use class components — function components only
❌ Don't use `any` type — use `unknown` and narrow, or define proper types
```

---

## 17. GIT COMMIT CONVENTIONS

```
feat(scope):  new feature
fix(scope):   bug fix
style(scope): styling, no logic change
refactor:     code change, no feature/fix
chore:        config, deps, tooling

Examples:
feat(navbar): add scroll-hide behaviour on mobile
fix(contact-form): resolve Zod validation not triggering on blur
style(hero): adjust display heading size for 375px breakpoint
feat(works-filter): implement category filter with fade transition
chore: add Resend API key to .env.example
```

---

*Dimensity Labs · agent.md · Version 1.0 · 2025*
<!-- END:nextjs-agent-rules -->
