import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { PostsMasonry } from '@/components/PostsMasonry'
import { Title } from '@/components/Title'

export default async function Page() {
  const {data: posts} = await sanityFetch({query: POSTS_QUERY});

  return (
    <main className="masonry-container-wrapper">
      <Title>Post Index</Title>
      <PostsMasonry posts={posts} />
    </main>
  )
}
