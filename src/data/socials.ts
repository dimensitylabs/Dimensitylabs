import { type SocialLink } from '@/types/social'

export const socials: readonly SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/dimensitylabs',
    icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-7.5a.75.75 0 110-1.5.75.75 0 010 1.5z',
  },
  {
    platform: 'Twitter/X',
    url: 'https://x.com/dimensitylabs',
    icon: 'M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/dimensitylabs',
    icon: 'M4.75 7.5a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM5 10.5h4v9H5v-9zm7 0h3.5v1.25S16.5 10 18.5 10c2.5 0 3.5 1.5 3.5 4.5v5h-4v-4.5c0-1.5-.75-2-1.75-2S14.5 14 14.5 15.5v4h-2.5v-9z',
  },
  {
    platform: 'Dribbble',
    url: 'https://dribbble.com/dimensitylabs',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  },
  {
    platform: 'Behance',
    url: 'https://behance.net/dimensitylabs',
    icon: 'M8.5 7H3v10h5.5c2 0 3.5-1 3.5-3 0-1.2-.7-2.2-1.8-2.6C11.3 11 12 10 12 9c0-1.5-1.2-2-3.5-2zM6 9h2c.8 0 1.5.3 1.5 1S8.8 11 8 11H6V9zm2.5 4H6v2.5h2.5c.8 0 1.5-.4 1.5-1.25S9.3 13 8.5 13zM15 7h5v1.5h-5V7zm2.5 3c-2 0-3.5 1.5-3.5 3.5S15.5 17 17.5 17c1.5 0 2.5-.5 3.2-1.8l-1.5-.7c-.3.6-.8 1-1.7 1-1 0-1.8-.7-1.8-1.7h5.2c0-2.2-1.2-3.8-3.4-3.8zm-1.7 3c.1-.9.8-1.5 1.7-1.5s1.6.6 1.7 1.5h-3.4z',
  },
] as const
