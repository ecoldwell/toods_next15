import { Author } from '@/components/Author'
import { Categories } from '@/components/Categories'
import { POSTS_QUERYResult } from '@/sanity/types'
import { PublishedAt } from '@/components/PublishedAt'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from "@portabletext/react";

export function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, body } = props


  return (
    <Link className="masonry-item group" href={`/posts/${props.slug!.current}`}>
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
        <div className="post_image_wrapper">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).url()}
              className="w-full h-auto rounded-lg"
              width={400}
              height={400}
              alt={mainImage.alt || title || ''}
            />
          ) : null}
        </div>
        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
          <PortableText value={body} />
        </div>
      </article>
    </Link>
  )
}
