import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

type FeaturedPlatformsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredPlatforms" }
>;

export function FeaturedPlatforms({ platforms = [], title }: FeaturedPlatformsProps) {
  return (
    <Link href={`/platforms/${platforms[0].slug?.current}`} className="container mx-auto flex flex-col gap-8">
    {platforms.length > 0 ? (
      <div className="post_container">
        {platforms.map((platform, index) => {
          // Get the background color for the current post
          const backgroundColor = platform.background_color?.hex || "#fff";

          return (
            <div key={platform._id || `post-${index}`} className="flex flex-col">
              <div className="post_title_wrapper">
                <div className="eclipse"></div>
                {/* Apply the dynamic background color */}
                <h1 className="post_title shape" style={{ background: backgroundColor }}>
                  {platform.title}
                </h1>
              </div>

              <div className="post_image_wrapper">
                {platform.mainImage?.asset?.url && (
                  <Image
                    src={platform.mainImage.asset.url}
                    alt={platform.title || "Featured post image"}
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
        No featured posts available.
      </p>
    )}
  </Link>
  );
} 