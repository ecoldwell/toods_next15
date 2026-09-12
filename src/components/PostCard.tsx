import { Author } from '@/components/Author'
import { Categories } from '@/components/Categories'
import { POSTS_QUERYResult } from '@/sanity/types'
import { PublishedAt } from '@/components/PublishedAt'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from "@portabletext/react";

export function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, body, gallery } = props
  const backgroundColor = props.background_color?.hex || "#fff";
  console.log(props, 'i am props')
  const cardImage = gallery && gallery.length > 0 && gallery[0]?.asset
    ? gallery[0]
    : mainImage?.asset ? mainImage : null;

  return (
     <div className="masonry-item group">
    <Link href={`/posts/${props.slug!.current}`}>
      <article className="post_container">

        <div className="">
          <Categories categories={categories} />
        </div>
        <div className="post_title_wrapper">
          <div className="eclipse"></div>
          <h1 className="post_title shape">
            <span className="">{title}</span>
            <span className="" />
          </h1>
          {/*<div className="">
            <Author author={author} />
            <PublishedAt publishedAt={publishedAt} />
          </div>*/}
        </div>
        {/* Render only the selected primary card image */}
        <div className="post_image_wrapper">
          {cardImage?.asset ? (
            <Image
              src={urlFor(cardImage).width(400).height(400).url()}
              className="w-full h-auto"
              width={400}
              height={400}
              alt={cardImage.alt || title || ''}
            />
          ) : null}
        </div>
        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
          <PortableText value={body} />
        </div>
      </article>
      </Link>
     </div>
  )
}
