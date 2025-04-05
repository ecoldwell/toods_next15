import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { ArtistsQueryResult, SanityImageHotspot, SanityImageCrop, Slug } from '@/sanity/types'

type ArtistPreviewProps = {
  name: string | null;
  slug: Slug | null;
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

export default function ArtistPreview({ name, slug, mainImage, categories }: ArtistPreviewProps) {
  if (!slug?.current) {
    return null; // Or some fallback UI
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      {mainImage && (
        <div className="relative h-48">
          <Image
            className="object-cover"
            src={urlFor(mainImage).url()}
            fill
            alt={name || ''}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <Link href={`/artists/${slug.current}`}>
            <h3 className="text-xl font-semibold text-gray-900">{name || 'Untitled'}</h3>
          </Link>
          {categories?.length > 0 && (
            <div className="mt-2 flex gap-2">
              {categories.map((category) => (
                <span key={category._id} className="text-sm text-gray-500">
                  {category.title || ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
