import { sanityFetch } from "@/sanity/lib/live";
import { SYNCHRONIZATION_QUERY } from '@/sanity/lib/queries';
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { Categories } from "@/components/Categories";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: sync } = await sanityFetch({
    query: SYNCHRONIZATION_QUERY,
    params: await params,
  });

  if (!sync) {
    notFound();
  }

  const transformedCategories = sync.categories?.map(category => ({
    _id: category._id,
    slug: category.slug,
    title: category.title
  }));

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <article className="grid lg:grid-cols-12 gap-y-12">
        <header className="lg:col-span-12 flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <time className="text-gray-500">
              {new Date(sync.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {transformedCategories && <Categories categories={transformedCategories} />}
          </div>
          <h1 className="text-4xl font-bold">{sync.title}</h1>
        </header>

        <div className="lg:col-span-4">
          {sync.artist.mainImage && (
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={urlFor(sync.artist.mainImage).width(400).height(400).url()}
                alt={sync.artist.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="font-semibold">Artist</h2>
              <Link 
                href={`/artists/${sync.artist.slug.current}`}
                className="text-pink-600 hover:underline"
              >
                {sync.artist.name}
              </Link>
            </div>
            <div>
              <h2 className="font-semibold">Platform</h2>
              <p>{sync.platform.title} ({sync.platform.platformType})</p>
              {sync.platform.platformUrl && (
                <a 
                  href={sync.platform.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline"
                >
                  View on {sync.platform.platformType}
                </a>
              )}
            </div>
            {sync.venue && (
              <div>
                <h2 className="font-semibold">Venue</h2>
                <p>{sync.venue.name}</p>
                <p className="text-sm text-gray-600">{sync.venue.address}</p>
              </div>
            )}
          </div>
        </div>

        {sync.description && (
          <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
            <PortableText value={sync.description} />
          </div>
        )}
      </article>
    </main>
  );
} 