"use client"; // Required for client-side state interactions inside the Lightbox

import { Categories } from "@/components/Categories";
import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import { ArtistQueryResult } from "@/sanity/types";
import { PublishedAt } from "@/components/PublishedAt";
import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { LightboxImage } from "@/components/Lightbox"; // Leverages your clean modular lightbox file!

export function Artist(props: NonNullable<ArtistQueryResult>) {
  const {
    _id,
    name,
    mainImage,
    background_color,
    body,
    publishedAt,
    categories,
    relatedArtists,
    // Make sure your individual Artist GROQ query fetches "gallery": images[]
    gallery,
  } = props as any; // Cast as any to bypass strict typegen alignment blocks

  const backgroundColor = props.background_color?.hex || "#fff";

  // Identical image selection flow used in your single Post component view
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
              alt={img.alt || name || ""}
            />
          );
        })}
      </div>

      <div className="post_content">
        <header className="title">
          <div className="flex gap-4 items-center">
            {/* <Categories categories={categories} />
            <PublishedAt publishedAt={publishedAt} /> */}
          </div>
          <div className="post_title_wrapper max-w-3xl">
            <h1 className="post_title shape" style={{ background: backgroundColor }}>
              {name}
            </h1>
          </div>
        </header>

        {body ? (
          <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
            <PortableText value={body} components={components} />
          </div>
        ) : null}
      </div>

    </div>
  );
}
