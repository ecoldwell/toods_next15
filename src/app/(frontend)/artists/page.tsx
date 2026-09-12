import { sanityFetch } from "@/sanity/lib/live";
import { artistsQuery } from '@/sanity/lib/queries'
import { Title } from '@/components/Title'
import { ArtistsQueryResult, SanityImageHotspot, SanityImageCrop } from '@/sanity/types'
import { MasonryGrid } from "@/components/MasonryGrid";


export default async function Page() {
  const { data: artists } = await sanityFetch({ query: artistsQuery })


  return (
    <main>
      <MasonryGrid items={artists} />
    </main>
  )
}
