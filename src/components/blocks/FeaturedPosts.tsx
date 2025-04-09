import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
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
          // Get the background color for the current post
          const backgroundColor = post.background_color?.hex || "#fff";

          return (
            <div key={post._id || `post-${index}`} className="flex flex-col">
              <div className="post_title_wrapper">
                <div className="eclipse"></div>
                {/* Apply the dynamic background color */}
                <h1 className="post_title" style={{ background: backgroundColor }}>
                  {post.title}
                </h1>
              </div>

              <div className="post_image_wrapper">
                {post.mainImage?.asset?.url && (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title || "Featured post image"}
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
