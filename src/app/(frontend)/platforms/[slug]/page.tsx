import { sanityFetch } from "@/sanity/lib/live";
import { platformQuery } from '@/sanity/lib/queries'
import { Platform } from '@/components/Platform'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {data: platform} = await sanityFetch({query: platformQuery, params: await params})

  if (!platform) {
    notFound()
  }

  return (
    <main className="main_wrapper">
      <Platform {...platform} />
    </main>
  )
} 