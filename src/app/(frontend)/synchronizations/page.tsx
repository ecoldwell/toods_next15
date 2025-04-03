import Link from "next/link";
import { SYNCHRONIZATIONS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from "@/sanity/lib/live";

export default async function SynchronizationsPage() {
  const { data: synchronizations } = await sanityFetch({ query: SYNCHRONIZATIONS_QUERY });

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Synchronizations</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {synchronizations?.map((sync) => (
          <Link
            key={sync._id}
            href={`/synchronizations/${sync.slug.current}`}
            className="group relative block bg-black"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                {new Date(sync.date).toLocaleDateString()}
              </p>
              <p className="text-xl font-bold text-white sm:text-2xl">
                {sync.title}
              </p>
              <div className="mt-2 text-sm text-gray-300">
                <p>{sync.artist.name}</p>
                <p>{sync.platform.title} ({sync.platform.platformType})</p>
                {sync.venue && <p>at {sync.venue.name}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 