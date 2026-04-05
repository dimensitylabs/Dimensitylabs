# ANIMATIONS.md — Awwwards-Level Interaction Spec
**Project:** Dimensity Labs · Animation & Interaction Upgrade
**Supplements:** PROMPT.md (do not replace — this adds the interaction layer on top)

---

## 0. PHILOSOPHY SHIFT

The current site is correct in structure and brand — but static. This document upgrades every surface to feel **alive**. The goal is not decoration — every animation must serve meaning: revealing hierarchy, directing attention, rewarding exploration.

Reference sites for feel (not to copy — for feel only):
- https://www.awwwards.com
- https://www.resn.co.nz
- https://www.activetheory.net
- https://pierrelevaillant.me

**The rule:** If someone screenshots the page, it should still look beautiful. But when they interact — it should feel like nothing they've seen before at this price point.

---

## 1. NEW DEPENDENCIES

```bash
npm install lenis @studio-freight/lenis
npm install gsap @gsap/react
npm install splitting
npm install @types/splitting --save-dev
```

| Package | Purpose |
|---|---|
| `lenis` | Buttery smooth scroll — replaces native browser scroll |
| `gsap` | Power animations that Framer Motion can't do (ScrollTrigger, SplitText) |
| `gsap/ScrollTrigger` | Scroll-linked animations, pinning, scrubbing |
| `splitting` | Split text into characters/words for stagger animations |
| Framer Motion | Still used for page transitions + component-level animations |

**GSAP + Framer Motion coexist.** Framer Motion owns page transitions and component animations. GSAP owns scroll-linked and text animations.

---

## 2. SMOOTH SCROLL — LENIS

Create a global Lenis instance. All scroll-linked animations reference Lenis time, not native scroll.

```tsx
// src/components/common/SmoothScroll/SmoothScroll.tsx
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

Wrap `<main>` in `app/layout.tsx` with `<SmoothScroll>`.

---

## 3. CUSTOM CURSOR

Replace the browser cursor entirely. Two-part cursor: small dot (8px) that follows instantly + large ring (40px) that follows with lag.

```tsx
// src/components/common/CustomCursor/CustomCursor.tsx
'use client'

// Behavior:
// - Default: dot (8px, Smoky Black) + ring (40px, outline Olive Drab)
// - On hoverable elements (a, button, [data-cursor]): ring scales to 64px, dot disappears
// - On text elements [data-cursor="text"]: ring morphs to thin horizontal line
// - On image/card hover [data-cursor="view"]: ring becomes filled circle with "VIEW" text inside
// - On dark backgrounds: cursor inverts to Floral White
// - Cursor hides when mouse leaves window

// Implementation:
// Use useRef for dot and ring DOM elements
// Listen to mousemove → update dot position immediately (no lerp)
// Ring position uses lerp: ringX += (mouseX - ringX) * 0.12 — every rAF
// Scale/opacity transitions: CSS transition 0.2s ease

// CSS:
// .cursor-dot:  width 8px, height 8px, bg var(--smoky-black), border-radius 50%, 
//               position fixed, pointer-events none, z-index 9999, mix-blend-mode difference
// .cursor-ring: width 40px, height 40px, border 1px solid var(--olive-drab), 
//               border-radius 50%, position fixed, pointer-events none, z-index 9998
//               transform: translate(-50%, -50%)

// On mobile (touch): hide cursor entirely (useMediaQuery)
```

Add `data-cursor="hover"` to all buttons, links, and cards throughout the app.
Add `data-cursor="view"` to all WorkCards and ServiceCards.
Add `cursor-none` class to `<html>` when cursor component mounts.

---

## 4. PAGE TRANSITIONS

Full-screen color wipe between every page change. The transition panel slides up to cover the screen, then slides down to reveal the new page.

```tsx
// src/components/common/PageTransition/PageTransition.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Two layers:
// Layer 1 (Smoky Black): enters from bottom, exits to top
// Layer 2 (Olive Drab): enters from bottom with 0.1s delay, exits to top with 0.1s delay
// Duration per layer: 0.6s cubic-bezier(0.76, 0, 0.24, 1)
// Between layers + page render: 0.2s window

// Wordmark appears centered on the transition panel during the hold
// "Dimensitylabs" fades in as panel covers screen, fades out as it leaves

const transition = {
  type: 'tween',
  ease: [0.76, 0, 0.24, 1],
  duration: 0.6,
}

// Panel variants:
const panelVariants = {
  initial:  { y: '100%' },
  animate:  { y: '0%',   transition },
  exit:     { y: '-100%', transition },
}
```

---

## 5. LOADING SCREEN

Brief branded intro — appears on first load only (check sessionStorage).

```
Duration: 1.8s total
Background: Smoky Black (#11120D)

Sequence:
  0.0s: Screen is Smoky Black
  0.2s: "Dimensity" fades in (Cormorant Garamond 300, 48px, Floral White)
  0.5s: "labs" appears with italic treatment in Bone
  0.8s: Tagline "DIGITAL PRODUCT STUDIO" tracks in letter by letter (Syne 9px uppercase)
  1.2s: All content fades out
  1.5s: Panel slides up to reveal the site (same panel as page transition)
  1.8s: Site is visible, loading screen destroyed

Store in sessionStorage: 'dl-loaded' = true → skip on subsequent navigation
```

```tsx
// src/components/common/LoadingScreen/LoadingScreen.tsx
'use client'
// Use Framer Motion for all sequences
// useEffect: check sessionStorage on mount
// If already loaded: render null immediately
// If first load: play sequence, then set sessionStorage, then unmount
```

---

## 6. HERO SECTION — COMPLETE REBUILD

The hero must be the most dramatic moment on the site.

```
Layout: Full viewport height
Background: Floral White

Elements and animations (all scroll-triggered or on-load):

1. LINE REVEAL — On load
   Each word of the headline is wrapped in an overflow-hidden container
   Words translate from Y(100%) → Y(0%) staggered 0.08s per word
   Duration: 0.9s cubic-bezier(0.16, 1, 0.3, 1) (expo out)
   
   Headline: "We build digital products that perform"
   "perform" → Cormorant Garamond italic, Olive Drab color
   
2. SUBTEXT — Fades in 0.3s after last word, slight translateY
   
3. CTA BUTTONS — Fade + scale(0.95→1) after subtext, 0.4s delay
   
4. SECTION LABEL — Slides in from left, 0.2s delay
   
5. LARGE BACKGROUND NUMBER — "01" behind the headline
   Cormorant Garamond 300, 35vw, Bone at 15% opacity
   Parallax: moves up at 0.3x scroll speed as you scroll down
   
6. SCROLL INDICATOR — Bottom of hero
   Vertical line (1px, Olive Drab) that grows from 0 to 48px
   Small "SCROLL" label in Syne 9px uppercase
   Animate: line grows → fades out after 2s idle, returns if no scroll
   
7. ON SCROLL:
   Headline scale from 1 → 0.85 and opacity 1 → 0 as you scroll down
   Subtext opacity 1 → 0 slightly faster
   "01" number moves up faster (parallax)
```

---

## 7. TEXT ANIMATIONS — GLOBAL PATTERNS

Apply these patterns consistently across all pages:

### 7.1 Headline Reveal (Line Mask)
Every H1 and H2 on every page uses this:
```
- Wrap each line in overflow-hidden div
- Animate: translateY(110%) → translateY(0%), 0.85s expo-out
- Stagger: 0.07s per line
- Trigger: when element enters viewport (ScrollTrigger, start: "top 85%")
```

### 7.2 Body Text Reveal (Fade Up)
Every paragraph body text:
```
- opacity: 0 → 1, translateY: 20px → 0
- Duration: 0.6s ease-out
- Trigger: ScrollTrigger start: "top 88%"
```

### 7.3 Section Label (Slide In)
Every SectionLabel component:
```
- translateX(-20px) + opacity 0 → translateX(0) + opacity 1
- Duration: 0.5s ease-out
- The left accent border grows from height 0 → 100% simultaneously
```

### 7.4 Character Stagger (Special Headlines)
Use on the hero display headline and the 404 page:
```
- Use `splitting` library to split text into characters
- Each char: opacity 0 → 1, translateY(30px) → 0
- Stagger: 0.025s per character
- Duration: 0.6s ease-out per character
```

### 7.5 Number Counter
AnimatedCounter upgrade:
```
- Count from 0 → target value over 1.5s
- Easing: ease-out cubic
- Add subtle blur: filter: blur(4px) → blur(0) during count
- The suffix (+, %) appears with a slight pop (scale 0.5 → 1.2 → 1)
```

---

## 8. MARQUEE — UPGRADE

Replace simple CSS with a more polished dual-marquee:

```
Two rows:
  Row 1: scrolls left →, normal speed
  Row 2: scrolls right ←, 0.75x speed (slightly slower)

On hover: entire marquee slows to 0.2x speed (CSS animation-duration change)
On scroll down: speed increases proportionally to scroll velocity
On scroll up: speed decreases

Content row 1:
  "Web Design  ✦  Mobile Apps  ✦  AI Solutions  ✦  Automation  ✦  Branding  ✦  Strategy  ✦"

Content row 2 (slightly different items + italic):
  "Next.js  ✦  React Native  ✦  Claude API  ✦  n8n  ✦  Framer Motion  ✦  TypeScript  ✦"

Typography:
  Row 1: Cormorant Garamond 400, 28px, Floral White (on dark bg)
  Row 2: Syne 400, 13px uppercase, Bone 60% opacity

Background: Smoky Black strip, full width, padding 32px 0
```

---

## 9. WORKS / SERVICE CARDS — HOVER UPGRADE

### WorkCard hover sequence:
```
State: idle
  - Image placeholder (solid color block)
  - Title below
  - No overlay

Hover enter (200ms):
  1. Image scales to 1.04 (overflow hidden on parent)
  2. Thin Olive Drab border appears (0.5px → 1px)
  3. Category badge slides up from bottom-left (translateY 8px → 0)
  4. Cursor morphs to "VIEW" circle

Hover exit (300ms):
  - Reverse all
```

### ServiceCard hover sequence:
```
Hover enter:
  1. Large decorative number (01–06) scales from 0.9 → 1.1 and opacity 0.15 → 0.25
  2. Left border accent (2px Olive Drab) grows from height 0 → 100%
  3. Title shifts translateX(0 → 8px)
  4. Tech stack badges fade in staggered if they were hidden

Arrow icon:
  - Appears on hover: slides in from left (translateX(-8px) → 0) + opacity 0 → 1
  - →  direction
  - Line icon, 16px
```

---

## 10. STATS BAR — SCROLL SCRUB

```
On scroll into view:
  1. The entire bar fades in
  2. Each stat number counts up (AnimatedCounter)
  3. The vertical dividers between stats grow from height 0 → 100% staggered

Additionally:
  - Each stat has a thin progress-bar underline that fills from 0 → 100% width
  - Progress speed varies per stat to create visual interest
  - Duration: 1.2s, 1.5s, 0.9s respectively
```

---

## 11. SCROLL PROGRESS INDICATOR

```tsx
// src/components/common/ScrollProgress/ScrollProgress.tsx
'use client'

// Thin line at the very top of the viewport (not inside navbar, above everything)
// width: 0% → 100% as user scrolls from top to bottom of page
// Color: Olive Drab (#565449)
// Height: 2px
// z-index: above navbar
// Use GSAP ScrollTrigger scrubbable timeline

// Fades out: opacity 0 when scroll reaches 100% (bottom of page)
```

---

## 12. SECTION TRANSITIONS — REVEAL ON SCROLL

Every `<section>` element gets a reveal:

```
Pattern A — Fade Up Block (default for most sections):
  - The section container starts at opacity 0, translateY 40px
  - Transitions to opacity 1, translateY 0
  - Duration: 0.8s ease-out
  - Trigger: "top 80%"

Pattern B — Horizontal Slide (for two-column layouts):
  - Left column: translateX(-40px) → 0
  - Right column: translateX(40px) → 0
  - Both simultaneously
  - Duration: 0.7s ease-out

Pattern C — Stagger Grid (for card grids):
  - Each card in the grid reveals individually
  - Stagger: 0.1s per card
  - Pattern: translateY(30px) + opacity 0 → translateY(0) + opacity 1
  - Duration: 0.6s per card

Pattern D — Scale Reveal (for the CTA band):
  - Background expands from scaleX(0) → scaleX(1) (transform-origin: left)
  - Then content fades in
  - Duration: 0.7s + 0.3s delay
```

---

## 13. FOOTER ANIMATION

```
On scroll into view:
  1. "Let's build something that lasts." — word by word line reveal
  2. Social icons fan in from center, staggered 0.05s each
  3. Footer columns fade up staggered left to right
  4. Bottom bar slides up from below
  5. "Currently Taking Projects" pulsing dot — CSS animation, 2s pulse
```

---

## 14. WORKS PAGE — FILTER ANIMATION

When user changes filter category:
```
Exit: cards simultaneously scale(1 → 0.95) + opacity(1 → 0), 200ms ease-in
  Cards that don't match exit first

Enter: matching cards scale(0.95 → 1) + opacity(0 → 1), staggered 0.06s each, 300ms ease-out

Layout shift: remaining cards reflow with layout animation (Framer Motion layout prop)
  Duration: 400ms ease-out spring (this is the ONE place spring is allowed — layout only)
```

---

## 15. SINGLE WORK PAGE — CINEMATIC HERO

```
Background: work.coverColor fills the top 60vh
Overlay: Smoky Black gradient from transparent → full at bottom

Title animation:
  - SectionLabel slides in from left
  - H1 does word-by-word line reveal
  - Tags fan in staggered
  - Year number (large, background) fades in behind

Scroll behavior:
  - Cover image/color panel has parallax: moves up at 0.5x scroll speed
  - Title moves up at 0.7x scroll speed
  - Creates depth layering effect

Content sections:
  - Challenge / Solution / Outcome sections use horizontal rule that draws in
    (width 0 → 100%, 0.5s ease, triggered before text appears)
  - Metric callouts animate their numbers on entry
```

---

## 16. CONTACT PAGE — FORM MICRO-INTERACTIONS

```
On page load:
  Left column: slides in from left, 0.6s
  Right column (form): slides in from right, 0.6s, 0.1s delay

Input focus behavior:
  - Label animates up (translateY 0 → -20px, scale 1 → 0.85) when input is focused or filled
  - Border-bottom draws in left to right (scaleX 0 → 1) on focus
  - The entire form has a very subtle background that brightens on focus within

Submit button:
  - On hover: text slides up out of view, "→" arrow slides up to replace it, then full label slides in
    Sequence: "SEND MESSAGE" → arrow → "SEND MESSAGE →"
  - On click/loading: text replaced with animated dots (...), button width contracts slightly

Success animation:
  - Form fields collapse with staggered exit (top to bottom, 50ms stagger)
  - Success message scales in from 0.9 → 1 with opacity
  - Checkmark draws itself (SVG stroke-dashoffset animation)
```

---

## 17. MAGNETIC BUTTONS

All primary and ghost CTA buttons are magnetic — they pull toward the cursor.

```tsx
// src/hooks/useMagnetic.ts
'use client'
import { useRef, useEffect } from 'react'

export function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    }

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s linear'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [strength])

  return ref
}
```

Apply to: All `<Button>` components, Social icons in footer, CTA buttons in hero.
Strength values: `0.4` for large buttons, `0.25` for small buttons, `0.6` for icon-only.
**Disable on touch devices** (`hover: none` media query).

---

## 18. GRAIN / NOISE TEXTURE OVERLAY

Subtle film grain over the entire site adds organic warmth — critical for the earthy brand feel.

```css
/* In globals.css */
body::before {
  content: '';
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9997;
  animation: grain 0.5s steps(1) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10%       { transform: translate(-2%, -3%); }
  20%       { transform: translate(3%, 2%); }
  30%       { transform: translate(-1%, 4%); }
  40%       { transform: translate(4%, -1%); }
  50%       { transform: translate(-3%, 3%); }
  60%       { transform: translate(2%, -4%); }
  70%       { transform: translate(-4%, 1%); }
  80%       { transform: translate(1%, -2%); }
  90%       { transform: translate(-2%, 4%); }
}
```

In dark mode: `opacity: 0.025` (slightly less visible on dark surfaces).

---

## 19. HORIZONTAL SCROLL SECTION (Optional — Services Page)

On the services page, instead of a vertical grid, services scroll horizontally on desktop:

```
Container: 100vw wide, overflow-x hidden
Inner track: width = (number of services × card width + gaps)
GSAP ScrollTrigger pin the section
As user scrolls vertically → inner track moves horizontally

Card width: 420px
Visible: ~3 cards at once
Scroll distance: maps to full card track width

On mobile: revert to standard vertical stack (no horizontal scroll on touch)

Visual cue: thin horizontal scrollbar at bottom using Bone color
Arrow indicators left/right appear on hover

Note: This is optional — only implement if client approves the interaction.
      Default fallback: standard 2-column grid.
```

---

## 20. ABOUT PAGE — TIMELINE ANIMATION

```
Story timeline:
  - The vertical line draws itself from top to bottom as you scroll (SVG stroke-dashoffset)
  - Each milestone dot scales from 0 → 1 when the line reaches it
  - Milestone text fades in immediately after dot appears
  - Scrubbed to scroll position (GSAP ScrollTrigger scrub: 1)

Values grid:
  - On hover: the decorative symbol (◉ ⟳ ◈ etc.) scales up 1 → 1.4 and rotates slightly
  - Rotation: +5deg for symbols, -5deg for others (alternating)
  - Duration: 0.3s ease-out
```

---

## 21. PROCESS PAGE — STEP ANIMATION

```
Phase numbers (01–04):
  - Start enormous (200px, Bone 8% opacity) blurred
  - As phase section scrolls into view: blur reduces, number grows slightly, opacity increases to 15%
  - Creates depth and progression

Connector arrows between phases:
  - SVG path that draws itself (stroke-dashoffset) as you scroll between sections
  - Duration: matched to scroll distance between sections

Each phase:
  - Pinned for 200px of scroll
  - Content fades in during pin
  - Then unpins and next section scrolls in
```

---

## 22. PERFORMANCE RULES FOR ANIMATIONS

```
✅ Always animate only: opacity, transform (translate, scale, rotate) — these are GPU composited
✅ Use will-change: transform on elements that animate frequently
✅ Use GSAP ticker for smooth rAF-based animations
✅ Debounce resize event handlers (16ms)
✅ Kill all ScrollTrigger instances on component unmount
✅ Destroy Lenis on unmount

❌ Never animate: width, height, top, left, margin, padding (causes layout thrash)
❌ Never use setTimeout for sequencing — use GSAP timeline or Framer Motion delay
❌ Never animate more than 12 elements simultaneously

Reduced motion:
  @media (prefers-reduced-motion: reduce) {
    Kill all GSAP animations (gsap.globalTimeline.pause())
    Set Framer Motion: { duration: 0 } on all variants
    Disable Lenis — use native scroll
    Keep grain overlay (static, no animation)
    Keep custom cursor (no lerp, instant follow)
  }
```

---

## 23. UPDATED CLIENT COMPONENT LIST

These are now ALL 'use client':

| Component | Reason |
|---|---|
| `SmoothScroll` | Lenis instance |
| `LoadingScreen` | sessionStorage + animation sequence |
| `PageTransition` | Framer Motion + pathname |
| `CustomCursor` | mousemove events + rAF |
| `ScrollProgress` | GSAP ScrollTrigger |
| `Navbar` | scroll direction + magnetic CTA |
| `MobileMenu` | open/close state |
| `ThemeToggle` | localStorage + DOM |
| `HeroSection` | GSAP text reveal on mount |
| `MarqueeSection` | scroll velocity effect |
| `AnimatedCounter` | IntersectionObserver + count-up |
| `WorksFilterBar` | filter state + Framer layout |
| `WorkCard` | hover sequence (cursor data) |
| `ServiceCard` | hover sequence |
| `ContactForm` | react-hook-form + field animations |
| `Accordion` | expand/collapse |
| `StoryTimeline` | GSAP SVG path draw |
| `ProcessPhases` | GSAP pin + scrub |
| `Button` (CTA variants) | useMagnetic hook |

---

## 24. ANIMATION TIMING REFERENCE

| Action | Duration | Easing |
|---|---|---|
| Page transition panel | 0.6s | cubic-bezier(0.76, 0, 0.24, 1) |
| Loading screen | 1.8s total | various |
| Hero word reveal | 0.9s per word | cubic-bezier(0.16, 1, 0.3, 1) |
| Section headline | 0.85s per line | cubic-bezier(0.16, 1, 0.3, 1) |
| Body text fade | 0.6s | ease-out |
| Card hover enter | 0.2s | ease-out |
| Card hover exit | 0.3s | ease-out |
| Button hover | 0.15s | ease-out |
| Magnetic release | 0.5s | cubic-bezier(0.23, 1, 0.32, 1) |
| Counter count-up | 1.5s | ease-out |
| SVG path draw | scroll-scrubbed | GSAP scrub: 1 |
| Form label float | 0.25s | ease-out |
| Filter transition | 0.2s exit + 0.3s enter | ease-in / ease-out |
| Cursor ring lag | lerp 0.12 | per rAF |
| Grain animation | 0.5s steps(1) infinite | steps |

---

*Dimensity Labs · animations.md · Version 1.0 · 2025*
*This file supplements PROMPT.md — read both together.*