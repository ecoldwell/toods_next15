import { Title } from '@/components/Title'
import Link from "next/link";
import { MEDIAHOME_QUERY } from '@/sanity/lib/queries';
import  Navigation  from '@/components/LinkList';
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

// const MEDIA_QUERY = defineQuery(`*[
//   _type == "media"
//   && defined(slug.current)
// ]{_id, name, slug, date}|order(date desc)`);

export default async function Page() {
  const { data: events } = await sanityFetch({ query: MEDIAHOME_QUERY });

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Toodinator</Title>
      {/* <Menu></Menu> */}
      <Navigation></Navigation>
      <Link href="/posts">Posts index &rarr;</Link>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((media: { _id: Key | null | undefined; slug: { current: any; }; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode> | null | undefined; date: string | number | Date; }) => (
          <li className="bg-white p-4 rounded-lg" key={media._id}>
            <Link
              className="hover:underline"
              href={`/events/${media?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{media?.name}</h2>
              {media?.date && (
                <p className="text-gray-500">
                  {new Date(media.date).toLocaleDateString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}