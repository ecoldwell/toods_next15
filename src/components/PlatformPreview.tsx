import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Platform } from '@/sanity/types'

type PlatformPreviewProps = {
  _id: string;
  title?: string;
  slug?: Platform['slug'];
  mainImage?: Platform['mainImage'];
  platformType?: Platform['platformType'];
}

export default function PlatformPreview({ title, slug, mainImage, platformType }: PlatformPreviewProps) {
  if (!slug?.current) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      {mainImage && (
        <div className="relative h-48">
          <Image
            className="object-cover"
            src={urlFor(mainImage).url()}
            fill
            alt={title || ''}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <span className="text-sm font-medium text-indigo-600">
            {platformType}
          </span>
          <Link href={`/platforms/${slug.current}`}>
            <h3 className="mt-2 text-xl font-semibold text-gray-900">{title || 'Untitled'}</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}
