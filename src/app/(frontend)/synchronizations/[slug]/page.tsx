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

  const backgroundColor = sync.background_color?.hex || "#fff";

  return (
    <main className="main_wrapper">
    <div className="post_container syncro_wrapper">
      <div className="post_image">
      <div className="artist">
      <Link 
                href={`/artists/${sync.artist.slug.current}`}
                className="hover:underline"
              >
        <header className="title">
          <h1>

                {sync.artist.name}

            </h1>
        </header>
        {sync.artist.mainImage && (
            <div className="post_image_wrapper">
              <Image
                src={urlFor(sync.artist.mainImage).width(400).height(400).url()}
                alt={sync.artist.name}
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          )}
                        </Link>
      </div>

      <div className="platform">
        <Link 
                href={`/platforms/${sync.platform.slug.current}`}
                className="hover:underline"
              >
      <header className="title">
          <h1>

                {sync.platform.title}
         
            </h1>
        </header>
        {sync.platform.mainImage && (
            <div className="post_image_wrapper">
              <Image
                src={urlFor(sync.platform.mainImage).width(400).height(400).url()}
                width={400}
                height={400}
                alt={sync.platform.title}
                className="object-cover"
              />
            </div>
          )}
       </Link>
      </div>
      </div>
      <div className="post_content">
      <div className="sync_wrapper">
      <header className="post_title_wrapper">
          <h1 className="post_title" style={{ background: backgroundColor }}>{sync.title}</h1>
        </header>
        <div>
        {sync.description && (
          <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
            <PortableText value={sync.description} />
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
    </main>

  );
} 