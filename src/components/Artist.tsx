import { Categories } from "@/components/Categories";
import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import { ArtistQueryResult } from "@/sanity/types";
import { PublishedAt } from "@/components/PublishedAt";
import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

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
  } = props;

  const backgroundColor = props.background_color?.hex || "#fff";

  return (
    <div className="post_container">
      <div className="post_image">
      {mainImage ? (
        <div className="post_image_wrapper">
          <Image
            src={urlFor(mainImage).width(400).height(400).url()}
            width={400}
            height={400}
            alt=""
          />
        </div>
      ) : null}
      </div>
      <div className="post_content">
      <header className="title">
        <div className="flex gap-4 items-center">
          {/* <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} /> */}
        </div>
        <div className="post_title_wrapper max-w-3xl">
    <h1 className="post_title shape" style={{ background: backgroundColor }}>
      {props.name}
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