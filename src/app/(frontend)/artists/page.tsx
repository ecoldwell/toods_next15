import { sanityFetch } from "@/sanity/lib/live";
import { artistsQuery } from '@/sanity/lib/queries'
import ArtistPreview from '@/components/ArtistPreview'
import { Title } from '@/components/Title'
import { ArtistsQueryResult, SanityImageHotspot, SanityImageCrop } from '@/sanity/types'

type TransformedArtist = {
  _id: string;
  name: string;
  slug: { _type: 'slug'; current: string } | null;
  background_color: {
    hex: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    } | null;
    hotspot: SanityImageHotspot | null;
    crop: SanityImageCrop | null;
    _type: "image";
  } | null;
  categories: Array<{
    _id: string;
    title: string | null;
  }> | null;
}

export default async function Page() {
  const { data: artists } = await sanityFetch({ query: artistsQuery })

  const transformedArtists = artists?.map((artist: ArtistsQueryResult[number]) => ({
    ...artist,
    slug: artist.slug ? {
      _type: 'slug',
      current: artist.slug.current
    } : null
  })) as TransformedArtist[];

  return (
    <main className="main_wrapper">
      <div className="collection_wrapper">
        {transformedArtists?.map((artist: TransformedArtist) => (
          <ArtistPreview key={artist._id} {...artist} />
        ))}
      </div>
    </main>
  )
}