import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

type FeaturedPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredPosts" }
>;

export function FeaturedPosts({ posts = [], title }: FeaturedPostsProps) {
    console.log(posts, "what is the posts"); // Debugging: Check structure
  
    return (
      <section className="container mx-auto flex flex-col gap-8 py-16">
        {title && (
          <h2 className="text-xl mx-auto md:text-2xl lg:text-5xl font-semibold text-slate-800 max-w-3xl">
            {title}
          </h2>
        )}
  
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={post._id || `post-${index}`} className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  {post.title}
                </h3>
                {post.slug?.current && (
                  <p className="text-lg text-slate-600">/{post.slug.current}</p>
                )}
                
                {post.mainImage?.asset?.url && (
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title || "Featured post image"}
                    className="w-full h-auto rounded-lg"
                  />
                )}
                {post.body ? (
                        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
                          <PortableText value={post.body} />
                        </div>
                      ): null }
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-slate-500">
            No featured posts available.
          </p>
        )}
      </section>
    );
  }