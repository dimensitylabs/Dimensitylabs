import { type Service } from '@/types/service'

export const services: readonly Service[] = [
  {
    slug: 'web-design-development',
    number: '01',
    title: 'Web Design & Development',
    description:
      'Custom websites and web applications built with modern frameworks. Fast, responsive, and designed to convert.',
    longDescription:
      'We design and develop custom websites and web applications from the ground up. Every project starts with strategy — understanding your users, your goals, and what success looks like. Then we build with Next.js, React, and Tailwind CSS to deliver fast, accessible, SEO-optimized experiences that look exceptional on every device.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    scope: [
      'Marketing websites',
      'E-commerce storefronts',
      'Web applications',
      'Landing pages',
      'CMS integration',
      'Performance optimization',
    ],
    icon: 'M4 6h16M4 12h16M4 18h8',
    relatedWorks: ['ecommerce-platform'],
  },
  {
    slug: 'mobile-app-development',
    number: '02',
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile apps for iOS and Android. Native feel, single codebase, faster time to market.',
    longDescription:
      'We build cross-platform mobile applications using React Native and Expo. One codebase, two platforms, native performance. From MVP to full product — we handle architecture, UI, API integration, and App Store deployment.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    scope: [
      'iOS and Android apps',
      'MVP development',
      'App Store deployment',
      'Push notifications',
      'Offline-first architecture',
      'API integration',
    ],
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    relatedWorks: ['fintech-mobile-app'],
  },
  {
    slug: 'ai-solutions',
    number: '03',
    title: 'AI Solutions',
    description:
      'Custom AI integrations — chatbots, content generation, data analysis. Practical AI that solves real problems.',
    longDescription:
      'We build AI-powered features and products that solve real business problems — not AI for the sake of AI. From customer support chatbots to content generation pipelines, we integrate large language models into your existing workflows with custom prompts, retrieval systems, and human-in-the-loop safeguards.',
    tech: ['Claude API', 'OpenAI', 'Vercel AI SDK', 'LangChain', 'Supabase'],
    scope: [
      'AI chatbots',
      'Content generation',
      'Document analysis',
      'RAG systems',
      'Custom AI agents',
      'LLM integration',
    ],
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5',
    relatedWorks: ['ai-customer-support-chatbot'],
  },
  {
    slug: 'ai-automation',
    number: '04',
    title: 'AI Automation',
    description:
      'Workflow automation that removes repetitive tasks. Connect your tools, automate your processes, reclaim your time.',
    longDescription:
      'We design and build automated workflows that eliminate manual, repetitive work. Using tools like n8n, Make, and custom scripts, we connect your existing tools into intelligent pipelines that run on autopilot — from lead generation to reporting to customer onboarding.',
    tech: ['n8n', 'Make', 'Zapier', 'Python', 'APIs'],
    scope: [
      'Lead generation automation',
      'CRM enrichment',
      'Report generation',
      'Email sequences',
      'Data pipeline automation',
      'Tool integration',
    ],
    icon: 'M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75',
    relatedWorks: ['lead-gen-automation'],
  },
  {
    slug: 'digital-branding',
    number: '05',
    title: 'Digital Branding',
    description:
      'Complete brand identity systems — logo, color, type, voice. Everything your brand needs to feel credible and cohesive.',
    longDescription:
      'We create complete brand identity systems for digital-first companies. Starting with positioning and voice strategy, we build visual systems — logo, color palette, typography, component libraries, and brand guidelines — that give your business the credibility it deserves.',
    tech: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
    scope: [
      'Brand strategy',
      'Logo design',
      'Color systems',
      'Typography selection',
      'Brand guidelines',
      'Pitch deck design',
    ],
    icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    relatedWorks: ['saas-brand-identity'],
  },
  {
    slug: 'consulting-strategy',
    number: '06',
    title: 'Consulting & Strategy',
    description:
      'Technical consulting and digital strategy. Audit your stack, plan your roadmap, make better decisions faster.',
    longDescription:
      'We provide technical consulting and digital strategy for startups and growing businesses. Whether you need a tech stack audit, a product roadmap, or help choosing the right tools — we bring clarity to complex decisions so you can move faster with confidence.',
    tech: ['Notion', 'Miro', 'Figma', 'Linear'],
    scope: [
      'Tech stack audits',
      'Product roadmapping',
      'Architecture planning',
      'Tool selection',
      'Process optimization',
      'Growth strategy',
    ],
    icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
    relatedWorks: ['ecommerce-platform', 'lead-gen-automation'],
  },
] as const
