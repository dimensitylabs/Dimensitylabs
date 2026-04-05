import { type ProcessPhase } from '@/types/process'

export const processPhases: readonly ProcessPhase[] = [
  {
    number: '01',
    label: 'Phase One',
    title: 'Discovery & Immersion',
    description:
      'We start by understanding your business, your users, and your goals. This phase is about asking the right questions — not jumping to solutions. We audit your current setup, research your market, and define what success looks like. By the end, we have a shared understanding of the problem and a clear brief to work from.',
    deliverables: [
      'Stakeholder interviews',
      'Competitive analysis',
      'User research summary',
      'Project brief and scope document',
      'Technical requirements',
    ],
    duration: '1–2 weeks',
  },
  {
    number: '02',
    label: 'Phase Two',
    title: 'Strategy & Direction',
    description:
      'With clarity on the problem, we define the approach. Information architecture, user flows, wireframes, and technical architecture — all mapped out before a single pixel is designed or line of code is written. This is where the blueprint takes shape.',
    deliverables: [
      'Information architecture',
      'User flow diagrams',
      'Wireframes',
      'Technical architecture document',
      'Timeline and milestones',
    ],
    duration: '1–2 weeks',
  },
  {
    number: '03',
    label: 'Phase Three',
    title: 'Design & Develop',
    description:
      'This is where ideas become real. We design in high fidelity, iterate with your feedback, and build in parallel. Development happens in sprints with regular demos — nothing ships without your sign-off. You see progress every week, not just at the end.',
    deliverables: [
      'High-fidelity designs',
      'Interactive prototypes',
      'Frontend and backend development',
      'Weekly progress demos',
      'QA testing',
    ],
    duration: '3–5 weeks',
  },
  {
    number: '04',
    label: 'Phase Four',
    title: 'Refine & Deliver',
    description:
      'Final polish, performance optimization, and launch preparation. We test across devices, fix edge cases, and make sure everything is production-ready. After launch, we provide 30 days of support to handle any issues that come up in the real world.',
    deliverables: [
      'Cross-browser and device testing',
      'Performance optimization',
      'SEO audit',
      'Launch deployment',
      '30-day post-launch support',
    ],
    duration: '1–2 weeks',
  },
] as const
