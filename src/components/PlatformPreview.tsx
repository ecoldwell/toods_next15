import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Platform } from '@/sanity/types'

type PlatformPreviewProps = {
  _id: string;
  title?: string;
  slug?: Platform['slug'];
  mainImage?: Platform['mainImage'];
  background_color?: Platform['background_color'];
}

export default function PlatformPreview({ title, slug, mainImage, background_color }: PlatformPreviewProps) {
  if (!slug?.current) {
    return null;
  }

  let safeImageUrl = null;

  if (mainImage?.asset) {
    try {
      // If the data is valid, this works exactly like normal
      safeImageUrl = urlFor(mainImage).url();
    } catch (error) {
      // If the data is corrupt, it catches the error and silently moves on instead of crashing Vercel!
      console.warn("Skipped a malformed image asset reference:", mainImage);
    }
  }


  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      {safeImageUrl && (
        <div className="relative h-48">
          <Image
            className="object-cover"
            src={urlFor(safeImageUrl).url()}
            fill
            alt={title || ''}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">

          <Link href={`/platforms/${slug.current}`}>
            <h3 className="mt-2 text-xl font-semibold text-gray-900">{title || 'Untitled'}</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}
