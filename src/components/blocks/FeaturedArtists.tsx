import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image"; // Import your Sanity image builder
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

        // Resolve a single preview image:
        // 1. First image of the gallery array if present
        // 2. Legacy mainImage fallback
        const featuredImage = artist.gallery && artist.gallery.length > 0 ? artist.gallery[0] : artist.mainImage;

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
              {/* Safe asset check utilizing urlFor */}
              {featuredImage?.asset && (
                <Image
                  src={urlFor(featuredImage).width(400).height(400).url()}
                  alt={featuredImage.alt || artist.name || "Artist featured image"}
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
