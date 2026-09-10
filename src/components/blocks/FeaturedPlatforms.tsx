import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image"; // Import your Sanity image builder
import Image from "next/image";
import Link from "next/link";

type FeaturedPlatformsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredPlatforms" }
>;

export function FeaturedPlatforms({ platforms = [], title }: FeaturedPlatformsProps) {
  // Safe guard clause against an empty slug link
  const linkHref = platforms[0]?.slug?.current ? `/platforms/${platforms[0].slug.current}` : "#";

  return (
    <Link href={linkHref} className="container mx-auto flex flex-col gap-8">
      {platforms.length > 0 ? (
        <div className="post_container">
          {platforms.map((platform, index) => {
            const backgroundColor = platform.background_color?.hex || "#fff";

            // Resolve a single preview image:
            // 1. First image of the gallery array if present
            // 2. Legacy mainImage fallback
            const featuredImage = platform.gallery && platform.gallery.length > 0 ? platform.gallery[0] : platform.mainImage;

            return (
              <div key={platform._id || `platform-${index}`} className="flex flex-col">
                <div className="post_title_wrapper">
                  <div className="eclipse"></div>
                  <h1 className="post_title shape" style={{ background: backgroundColor }}>
                    {platform.title}
                  </h1>
                </div>

                <div className="post_image_wrapper">
                  {/* Safe asset check utilizing urlFor */}
                  {featuredImage?.asset && (
                    <Image
                      src={urlFor(featuredImage).width(400).height(400).url()}
                      alt={featuredImage.alt || platform.title || "Featured platform image"}
                      className="w-full h-auto rounded-lg"
                      width={400}
                      height={400}
                    />
                  )}
                </div>

                {platform.body && (
                  <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
                    <PortableText value={platform.body} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-lg text-slate-500">
          No featured platforms available.
        </p>
      )}
    </Link>
  );
}
