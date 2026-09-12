"use client";

import Masonry from 'react-masonry-css';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from "@portabletext/react";
import { Categories } from '@/components/Categories';

// 1. Define a strict but generic input interface
interface MasonryItem {
  _id: string;
  _type: string;
  slug?: { current?: string };
  title?: string;
  name?: string; // Fallback for artists
  body?: any;
  background_color?: { hex?: string };
  mainImage?: any;
  gallery?: any[];
  categories?: any;
}

interface MasonryGridProps {
  items: MasonryItem[];
}

const breakpointColumnsObj = {
  default: 3,
  1500: 2,
  700: 1,
  500: 1
};

export function MasonryGrid({ items = [] }: MasonryGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <main className="masonry-container-wrapper">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-container"
        columnClassName="masonry-column"
      >
        {items.map((item, index) => {
          // 2. Normalization Engine: mapping specific types to generic layout variables
          const isArtist = item._type === 'artist';

          const cardTitle = item.title || item.name || 'Untitled';
          const backgroundColor = item.background_color?.hex || "#fff";

          // Generate the path programmatically based on the Sanity document type
          const routeFolder = isArtist ? 'artists' : `${item._type}s`;
          const itemHref = item.slug?.current ? `/${routeFolder}/${item.slug.current}` : '#';

          // Extract preview image exactly like before
          const cardImage = item.gallery && item.gallery.length > 0 ? item.gallery[0] : item.mainImage;

          // 💡 Create an absolutely guaranteed unique key string for this item row block instance
          const stableItemKey = `${item._id || item.slug?.current || index}-${index}`;

          return (
            // 💡 FIXED: The key property has been successfully relocated to the outermost wrapping element layer!
            <div key={stableItemKey} className="masonry-item group">
              <Link href={itemHref} className="block w-full h-full">
              <article className="post_container">


                {/*<div>
                  {item.categories && (
                    <Categories categories={item.categories} />
                  )}
                    </div>*/}


                <div className="post_title_wrapper">
                  <div className="eclipse"></div>
                  <h1 className="post_title shape" style={{ background: backgroundColor }}>
                    <span>{cardTitle}</span>
                  </h1>
                </div>

                <div className="post_image_wrapper">
                  {cardImage?.asset ? (
                    <Image
                      src={urlFor(cardImage).width(400).height(400).url()}
                      className="w-full h-auto rounded-lg"
                      width={400}
                      height={400}
                      alt={cardImage.alt || cardTitle}
                    />
                  ) : null}
                </div>


                  <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
{item.body && (
                    <PortableText value={item.body} />
)}
                  </div>


              </article>
              </Link>
            </div>
          );
        })}
      </Masonry>
    </main>
  );
}
