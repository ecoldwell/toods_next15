import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

type FeaturedSynchronizationsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredSynchronicity" }
>;

export function FeaturedSynchronicity({ synchronicity = [], title }: FeaturedSynchronizationsProps) {
  return (
    <Link href={`/synchronizations/${synchronicity[0].slug?.current}`} className="container mx-auto flex flex-col gap-8">
    {synchronicity.length > 0 ? (
      <div className="post_container">
        {synchronicity.map((synchronization, index) => {
          // Get the background color for the current post
          const backgroundColor = synchronization.background_color?.hex || "#fff";

          return (
            <div key={synchronization._id || `post-${index}`} className="flex flex-col">
              <div className="post_title_wrapper">
                <div className="eclipse"></div>
                {/* Apply the dynamic background color */}
                <h1 className="post_title shape" style={{ background: backgroundColor }}>
                  {synchronization.title}
                </h1>
              </div>

              <div className="post_image_wrapper">
                {synchronization.mainImage?.asset?.url && (
                  <Image
                    src={synchronization.mainImage.asset.url}
                    alt={synchronization.title || "Featured post image"}
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