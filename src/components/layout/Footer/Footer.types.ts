export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export const navigateLinks: FooterColumn = {
  title: 'Navigate',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Works', href: '/works' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Process', href: '/process' },
  ],
}

export const serviceLinks: FooterColumn = {
  title: 'Services',
  links: [
    { label: 'Web', href: '/services/web-design-development' },
    { label: 'Mobile', href: '/services/mobile-app-development' },
    { label: 'AI', href: '/services/ai-solutions' },
    { label: 'Automation', href: '/services/ai-automation' },
    { label: 'Branding', href: '/services/digital-branding' },
    { label: 'Consulting', href: '/services/consulting-strategy' },
  ],
}
