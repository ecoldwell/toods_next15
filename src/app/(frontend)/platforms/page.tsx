import { sanityFetch } from "@/sanity/lib/live";
import { platformsQuery } from '@/sanity/lib/queries'
import PlatformPreview from '@/components/PlatformPreview'
import { Title } from '@/components/Title'

export default async function Page() {
  const {data: platforms} = await sanityFetch({query: platformsQuery})

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Platforms</Title>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <PlatformPreview key={platform._id} {...platform} />
        ))}
      </div>
    </main>
  )
} 