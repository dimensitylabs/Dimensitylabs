import type { Metadata } from 'next'
import { works } from '@/data/works'
import WorkDetailClient from './WorkDetailClient'

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const work = works.find((w) => w.slug === params.slug)
  if (!work) return { title: 'Not Found' }
  return {
    title: work.title,
    description: work.overview,
  }
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = works.find((w) => w.slug === params.slug)
  return <WorkDetailClient work={work} />
}
