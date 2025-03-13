import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

type FeaturedPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "featuredPosts" }
>;


export function FeaturedPosts({ posts = [], title }: FeaturedPostsProps) {
    console.log(posts, "what is the posts"); // Debugging: Check structure
    const backgroundColor = posts?.map((post, index) => (
      post.background_color?.hex
    ))
  
    return (
      <section className="container mx-auto flex flex-col gap-8">
  
        {posts.length > 0 ? (
          <div className="homepage_post_container">
            {posts.map((post, index) => (
              <div key={post._id || `post-${index}`} className="flex flex-col">
                {/* testing out a way to have the dynamic background colour */}
                <div className="post_title_wrapper">
                  <div className="eclipse"></div>
                  <h1 className="post_title" style={{ background: backgroundColor}}>
                    {post.title}
                 </h1>
                </div>

                {/* {post.slug?.current && (
                  <p className="text-lg text-slate-600">/{post.slug.current}</p>
                )} */}
                <div className="homepage_post_image_wrapper">
                {post.mainImage?.asset?.url && (
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title || "Featured post image"}
                    className="w-full h-auto rounded-lg"
                  />
                )}
                </div>
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