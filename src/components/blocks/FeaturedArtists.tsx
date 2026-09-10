import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

type FeaturedArtistsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredArtists" }
>;

export function FeaturedArtists({ artists = [] }: FeaturedArtistsProps) {
  if (!artists || artists.length === 0) {
    return (
      <p className="text-center text-lg text-slate-500 py-4">
        No featured artists available.
      </p>
    );
  }

  return (
    <>
      {artists.flatMap((artist, index) => {
        const backgroundColor = artist.background_color?.hex || "#fff";

        return (
          <Link
            href={`/artists/${artist.slug?.current || ""}`}
            key={artist._id || `artist-${index}`}
            className="post_container"
          >
            <div className="post_title_wrapper">
              <div className="eclipse"></div>
              <h1 className="post_title shape" style={{ background: backgroundColor }}>
                {artist.name}
              </h1>
            </div>

            <div className="post_image_wrapper">
              {artist.mainImage?.asset?.url && (
                <Image
                  src={artist.mainImage.asset.url}
                  alt={artist.name || "Artist post image"}
                  className="w-full h-auto rounded-lg"
                  width={400}
                  height={400}
                />
              )}
            </div>

            {artist.body && (
              <div className="prose post_text_wrapper">
                <PortableText value={artist.body} />
              </div>
            )}
          </Link>
        );
      })}
    </>
  );
}
