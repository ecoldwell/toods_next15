import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { ArtistsQueryResult, SanityImageHotspot, SanityImageCrop, Slug } from '@/sanity/types'

type ArtistPreviewProps = {
  name: string | null;
  slug: Slug | null;
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

export default function ArtistPreview({ name, slug, mainImage, categories, background_color }: ArtistPreviewProps) {
  if (!slug?.current) {
    return null; // Or some fallback UI
    console.log(background_color, "background colour object")
  }
  console.log(background_color.hex , "background colour object")
  const backgroundColor = background_color.hex;
  return (
    <div className="single_post">
      {mainImage && (
        <div className="relative single_post_image">
          <Image
            className="object-cover"
            src={urlFor(mainImage).url()}
            fill
            alt={name || ''}
          />
        </div>
      )}
      <div>
          <Link href={`/artists/${slug.current}`} className="single_post_title">
            <h1 className=" shape" style={{ background: backgroundColor }}>{name || 'Untitled'}</h1>
          </Link>
      </div>
    </div>
  )
}
