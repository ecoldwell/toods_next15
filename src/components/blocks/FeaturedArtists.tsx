import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

type FeaturedArtistsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredArtists" }
>;

export function FeaturedArtists({ artists = [], title }: FeaturedArtistsProps) {
  return (
    <Link href={`/artists/${artists[0].slug?.current}`} className="container mx-auto flex flex-col gap-8">
    {artists.length > 0 ? (
      <div className="post_container">
        {artists.map((artist, index) => {
          // Get the background color for the current post
          const backgroundColor = artist.background_color?.hex || "#fff";

          return (
            <div key={artist._id || `post-${index}`} className="flex flex-col">
              <div className="post_title_wrapper">
                <div className="eclipse"></div>
                {/* Apply the dynamic background color */}
                <h1 className="post_title" style={{ background: backgroundColor }}>
                  {artist.title}
                </h1>
              </div>

              <div className="post_image_wrapper">
                {artist.mainImage?.asset?.url && (
                  <Image
                    src={artist.mainImage.asset.url}
                    alt={artist.title || "Featured post image"}
                    className="w-full h-auto rounded-lg"
                    width={400}
                    height={400}
                  />
                )}
              </div>

              {artist.body && (
                <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
                  <PortableText value={artist.body} />
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