import { sanityFetch } from "@/sanity/lib/live";
import { platformsQuery } from '@/sanity/lib/queries'
import PlatformPreview from '@/components/PlatformPreview'
import { Title } from '@/components/Title'
import type { PlatformsQueryResult, Platform } from '@/sanity/types'

export default async function Page() {
  const { data: platforms } = await sanityFetch({ 
    query: platformsQuery 
  });

  const transformedPlatforms = platforms?.map((platform: PlatformsQueryResult[number]) => ({
    ...platform,
    slug: platform.slug ? {
      _type: 'slug',
      current: platform.slug.current
    } : null
  })) as Platform[];

  return (
    <main className="main_wrapper">
      <Title>Platforms</Title>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {transformedPlatforms?.map((platform: Platform) => (
          <PlatformPreview key={platform._id} {...platform} />
        ))}
      </div>
    </main>
  )
}