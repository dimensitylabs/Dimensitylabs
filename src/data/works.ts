import { type Work } from '@/types/work'

export const works: readonly Work[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    type: 'Full Stack Web Development',
    category: 'web',
    year: 2025,
    coverColor: '#D8CFBC',
    tags: ['Next.js', 'E-Commerce', 'CMS'],
    shortDesc:
      'End-to-end storefront with CMS, checkout, and analytics dashboard.',
    challenge:
      'Client had a fragmented setup — three separate tools for inventory, orders, and marketing. Operational overhead was killing growth.',
    solution:
      'Built a unified Next.js storefront connected to a headless CMS, custom checkout flow, and a real-time admin dashboard. Single source of truth.',
    outcome:
      'Reduced operational overhead by 60%. Checkout conversion up 23% in first 30 days.',
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
    shortDesc:
      'Context-aware AI chatbot integrated into a SaaS product support workflow.',
    challenge:
      'Support team was drowning in repetitive tickets. Average response time was 6 hours.',
    solution:
      "Integrated Claude API with the client's knowledge base. Built a custom handoff flow to human agents for edge cases.",
    outcome:
      '78% of tickets resolved autonomously. Average response time dropped to under 90 seconds.',
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
    shortDesc:
      'Cross-platform personal finance app with transaction tracking and goal setting.',
    challenge:
      'MVP existed as a web app only. Target users were 90% mobile — engagement was low.',
    solution:
      'Rebuilt core flows as a React Native app. Designed a new IA focused on daily check-ins rather than passive dashboards.',
    outcome:
      'Launched to App Store and Google Play. Daily active usage up 3x vs the web product.',
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
    shortDesc:
      'Automated outbound lead generation and CRM enrichment pipeline.',
    challenge:
      'Sales team spending 4+ hours/day manually qualifying and enriching leads from multiple sources.',
    solution:
      'Built an n8n pipeline that scrapes, scores, enriches, and routes leads directly to the right rep in HubSpot — zero manual input.',
    outcome:
      'Reclaimed 20+ hours/week for the sales team. Lead response time cut from 4 hours to 8 minutes.',
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
    shortDesc:
      'Complete visual identity for a B2B SaaS startup from zero to launch.',
    challenge:
      'Founding team was technical — strong product, weak brand. Pitching to enterprise clients without credible visual identity.',
    solution:
      'Strategy-first: defined positioning and voice before touching visuals. Delivered full brand system — logo, palette, type, components, pitch deck.',
    outcome:
      'Closed Series A round two months after brand launch. Founder cited brand credibility as a key trust signal.',
    services: ['Digital Branding', 'Consulting & Strategy'],
    techStack: ['Figma', 'Adobe Illustrator'],
  },
] as const
