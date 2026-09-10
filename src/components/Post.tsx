"use client";

import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import { POST_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { RelatedPosts } from "@/components/RelatedPosts";
import { LightboxImage } from "@/components/Lightbox"; // Moved into its own tidy file

export function Post(props: NonNullable<POST_QUERYResult>) {
  const {
    _id,
    title,
    mainImage,
    background_color,
    body,
    relatedPosts,
    gallery,
  } = props;
  console.log(props, 'i am props')
  const backgroundColor = props.background_color?.hex || "#fff";

  const displayImages = gallery && gallery.length > 0
    ? gallery
    : mainImage?.asset ? [mainImage] : [];

  return (
    <div className="post_container">
      {/* Dynamic Stacked Column with Interactive Lightboxes */}
      <div className="post_image flex flex-col gap-6">
        {displayImages.map((img: any, index: number) => {
          if (!img?.asset) return null;

          return (
            <LightboxImage
              key={img.asset._id || index}
              src={urlFor(img).width(400).height(400).url()}
              rawSrc={urlFor(img).url()}
              alt={img.alt || ""}
            />
          );
        })}
      </div>

      <div className="post_content">
        <header className="title">
          <div className="post_title_wrapper max-w-3xl">
            <h1 className="post_title shape" style={{ background: backgroundColor }}>
              {title}
            </h1>
          </div>
        </header>

        {body ? (
          <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
            <PortableText value={body} components={components} />
            <RelatedPosts
              relatedPosts={relatedPosts}
              documentId={_id}
              documentType="post"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
