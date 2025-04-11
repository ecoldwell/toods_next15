import { sanityFetch } from "@/sanity/lib/live";
import { artistQuery } from '@/sanity/lib/queries'
import { Artist } from '@/components/Artist'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { data: artist } = await sanityFetch({ 
    query: artistQuery,
    params: { slug: params.slug }
  });

  if (!artist) {
    notFound();
  }

  return (
    <main className="main_wrapper">
      <Artist {...artist} />
    </main>
  )
}