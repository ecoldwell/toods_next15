import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image"; // Import your Sanity image builder
import Image from "next/image";
import Link from "next/link";

type FeaturedSynchronizationsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredSynchronicity" }
>;

export function FeaturedSynchronicity({ synchronicity = [], title }: FeaturedSynchronizationsProps) {
  // Safe guard clause against an empty slug link
  const linkHref = synchronicity[0]?.slug?.current ? `/synchronizations/${synchronicity[0].slug.current}` : "#";

  return (
    <Link href={linkHref} className="container mx-auto flex flex-col gap-8">
      {synchronicity.length > 0 ? (
        <div className="post_container">
          {synchronicity.map((synchronization, index) => {
            const backgroundColor = synchronization.background_color?.hex || "#fff";

            // Resolve a single preview image:
            // 1. First image of the gallery array if present
            // 2. Legacy mainImage fallback
            const featuredImage = synchronization.gallery && synchronization.gallery.length > 0 ? synchronization.gallery[0] : synchronization.mainImage;

            return (
              <div key={synchronization._id || `synchronization-${index}`} className="flex flex-col">
                <div className="post_title_wrapper">
                  <div className="eclipse"></div>
                  <h1 className="post_title shape" style={{ background: backgroundColor }}>
                    {synchronization.title}
                  </h1>
                </div>

                <div className="post_image_wrapper">
                  {/* Safe asset check utilizing urlFor */}
                  {featuredImage?.asset && (
                    <Image
                      src={urlFor(featuredImage).width(400).height(400).url()}
                      alt={featuredImage.alt || synchronization.title || "Featured synchronicity image"}
                      className="w-full h-auto rounded-lg"
                      width={400}
                      height={400}
                    />
                  )}
                </div>

                {synchronization.body && (
                  <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
                    <PortableText value={synchronization.body} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-lg text-slate-500">
          No featured posts available.
        </p>
      )}
    </Link>
  );
}
