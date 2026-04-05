import { Hero } from '@/components/sections/Hero/Hero'
import { FeaturedWorks } from '@/components/sections/FeaturedWorks/FeaturedWorks'
import { ServicesOverview } from '@/components/sections/ServicesOverview/ServicesOverview'
import { AboutIntro } from '@/components/sections/AboutIntro/AboutIntro'
import { Testimonials } from '@/components/sections/Testimonials/Testimonials'
import { CTA } from '@/components/sections/CTA/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <ServicesOverview />
      <AboutIntro />
      <Testimonials />
      <CTA />
    </>
  )
}
