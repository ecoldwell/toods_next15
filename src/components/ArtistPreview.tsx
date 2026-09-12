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
    alt?: string; // Included alt fallback property
  } | null;
  // 1. Added the new gallery array definition to your props type
  gallery?: Array<{
    asset: any;
    alt?: string;
  }> | null;
  categories: Array<{
    _id: string;
    title: string | null;
  }> | null;
}

export default function ArtistPreview({ name, slug, mainImage, gallery, categories, background_color }: ArtistPreviewProps) {
  if (!slug?.current) {
    return null; // Or some fallback UI
  }

  const backgroundColor = background_color?.hex || "#fff";

  // 2. Exact same extraction logic used in PostCard
  const cardImage = gallery && gallery.length > 0 && gallery[0]?.asset
    ? gallery[0]
    : mainImage?.asset ? mainImage : null;

  return (
    <div className="single_post">
      {/* 3. Render using the unified cardImage configuration */}
      {cardImage?.asset && (
        <div className="relative single_post_image">
          <Image
            className="object-cover"
            src={urlFor(cardImage).width(400).height(400).url()}
            fill
            alt={cardImage.alt || name || ''}
            sizes="(max-width: 768px) 100vw, 400px"
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
