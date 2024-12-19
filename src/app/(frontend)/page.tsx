import { Title } from '@/components/Title'
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { NavigationMenu } from "@/components/NavBar/Navigation"
const MEDIAHOME_QUERY = defineQuery(`*[
  _type == "media"
  && defined(slug.current)
]{_id, name, slug, date}|order(date desc)`);

export default async function Page() {
  const { data: events } = await sanityFetch({ query: MEDIAHOME_QUERY });

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Toodinator</Title>
      <NavigationMenu></NavigationMenu> 
      <Link href="/posts">Posts index &rarr;</Link>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((media) => (
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