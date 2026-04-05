import { type Testimonial } from '@/types/testimonial'
import { cn } from '@/lib/cn'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        'flex flex-col gap-lg p-xl',
        'border-half border-[var(--color-border)] rounded',
        className
      )}
    >
      <p className="font-cormorant italic text-h3 text-[var(--color-text-primary)] leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="flex items-center gap-md mt-auto">
        <div className="w-[40px] h-[40px] rounded-full bg-bone flex items-center justify-center">
          <span className="font-syne text-[11px] uppercase tracking-[0.08em] text-smoky-black">
            {testimonial.initials}
          </span>
        </div>
        <div className="flex flex-col">
          <cite className="font-syne text-[13px] font-medium not-italic text-[var(--color-text-primary)]">
            {testimonial.name}
          </cite>
          <span className="font-syne text-[11px] text-[var(--color-text-secondary)]">
            {testimonial.role}, {testimonial.company}
          </span>
        </div>
      </footer>
    </blockquote>
  )
}

export { TestimonialCard }
