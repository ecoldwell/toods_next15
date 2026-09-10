import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image"; // Import your Sanity image builder
import Image from "next/image";
import Link from "next/link";

type FeaturedPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredPosts" }
>;

export function FeaturedPosts({ posts = [], title }: FeaturedPostsProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <p></p>;
  }

  return (
    <Link href={`/posts/${posts[0].slug?.current}`} className="container mx-auto flex flex-col gap-8">
      <div className="post_container">
        {posts.map((post, index) => {
          const backgroundColor = post.background_color?.hex || "#fff";

          // Resolve a single preview image:
          // 1. First image of the gallery array
          // 2. Legacy mainImage fallback
          const featuredImage = post.gallery && post.gallery.length > 0 ? post.gallery[0] : post.mainImage;

          return (
            <div key={post._id || `post-${index}`} className="flex flex-col">
              <div className="post_title_wrapper">
                <div className="eclipse"></div>
                <h1 className="post_title shape" style={{ background: backgroundColor }}>
                  {post.title}
                </h1>
              </div>

              <div className="post_image_wrapper">
                {/* Safe asset check utilizing urlFor */}
                {featuredImage?.asset && (
                  <Image
                    src={urlFor(featuredImage).width(400).height(400).url()}
                    alt={featuredImage.alt || post.title || "Featured post image"}
                    className="w-full h-auto rounded-lg"
                    width={400}
                    height={400}
                  />
                )}
              </div>

              {post.body && (
                <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
                  <PortableText value={post.body} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Link>
  );
}
