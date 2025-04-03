import { sanityFetch } from "@/sanity/lib/live";
import { artistsQuery } from '@/sanity/lib/queries'
import ArtistPreview from '@/components/ArtistPreview'
import { Title } from '@/components/Title'

export default async function Page() {
  const {data: artists} = await sanityFetch({query: artistsQuery})

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Artists</Title>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {artists?.map((artist) => (
          <ArtistPreview key={artist._id} {...artist} />
        ))}
      </div>
    </main>
  )
}