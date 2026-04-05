import Link from 'next/link'
import { navigateLinks, serviceLinks } from './Footer.types'
import { socials } from '@/data/socials'
import { Divider } from '@/components/ui/Divider/Divider'

function Footer() {
  return (
    <footer className="bg-smoky-black text-floral-white">
      <div className="mx-auto w-full max-w-container px-md md:px-lg py-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2xl">
          {/* Col 1: Wordmark */}
          <div className="flex flex-col gap-md">
            <Link href="/" className="flex flex-col">
              <span className="font-cormorant font-light text-[20px] leading-none text-floral-white">
                Dimensity<span className="italic text-bone">labs</span>
              </span>
              <span className="font-syne text-[9px] uppercase tracking-[0.22em] text-bone opacity-60">
                Digital Product Studio
              </span>
            </Link>
            <span className="font-syne text-[13px] text-bone opacity-60">
              Mumbai, India
            </span>
          </div>

          {/* Col 2: Navigate */}
          <div className="flex flex-col gap-md">
            <span className="font-syne text-ui uppercase tracking-[0.18em] text-bone opacity-60">
              {navigateLinks.title}
            </span>
            <nav className="flex flex-col gap-sm">
              {navigateLinks.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-syne text-[13px] text-bone opacity-60 hover:opacity-100 transition-opacity duration-slow"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-md">
            <span className="font-syne text-ui uppercase tracking-[0.18em] text-bone opacity-60">
              {serviceLinks.title}
            </span>
            <nav className="flex flex-col gap-sm">
              {serviceLinks.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-syne text-[13px] text-bone opacity-60 hover:opacity-100 transition-opacity duration-slow"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Connect */}
          <div className="flex flex-col gap-md">
            <span className="font-syne text-ui uppercase tracking-[0.18em] text-bone opacity-60">
              Connect
            </span>
            <div className="flex flex-col gap-sm">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-sm font-syne text-[13px] text-bone opacity-60 hover:opacity-100 transition-opacity duration-slow"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.icon} />
                  </svg>
                  {social.platform}
                </a>
              ))}
              <a
                href="mailto:hello@dimensitylabs.dev"
                className="font-syne text-[13px] text-bone opacity-60 hover:opacity-100 transition-opacity duration-slow mt-sm"
              >
                hello@dimensitylabs.dev
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <Divider variant="dark" className="mt-2xl mb-lg" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-sm">
          <span className="font-syne text-[13px] text-bone opacity-60">
            &copy; 2025 Dimensity Labs. All rights reserved.
          </span>
          <span className="flex items-center gap-sm font-syne text-[13px] text-bone opacity-60">
            Currently Taking Projects
            <span className="inline-block w-[8px] h-[8px] rounded-full bg-[#3A6B4A] animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
