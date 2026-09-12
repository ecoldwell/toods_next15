"use client";

import { Hero } from "@/components/blocks/Hero";
import { Features } from "@/components/blocks/Features";
import { SplitImage } from "@/components/blocks/SplitImage";
import { FAQs } from "@/components/blocks/FAQs";
import { PAGE_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from "@portabletext/react";
import { Categories } from '@/components/Categories';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>["content"];
  documentId: string;
  documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

const breakpointColumnsObj = {
  default: 3,
  1500: 2,
  700: 1,
  500: 1
};

export function PageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  const blocks = useOptimistic<
    NonNullable<PAGE_QUERYResult>["content"] | undefined,
    NonNullable<PAGE_QUERYResult>
  >(content, (state, action) => {
    if (action.id === documentId) {
      return action?.document?.content?.map(
        (block) => state?.find((s) => s._key === block?._key) || block
      );
    }
    return state;
  });

  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <main className="masonry-container-wrapper"
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "content",
      }).toString()}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-container"
        columnClassName="masonry-column"
      >
        {blocks.flatMap((block) => {
          // 💡 FIXED: DragHandle now accepts a reactKey and passes it explicitly to the HTML element
          const DragHandle = ({ children, customPath, reactKey }: { children: React.ReactNode; customPath?: string; reactKey: string }) => (
            <div
              key={reactKey} // <-- This satisfies React's top-level flatMap validation requirement
              className="masonry-item"
              data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: customPath || `content[_key=="${block._key}"]`,
              }).toString()}
            >
              {children}
            </div>
          );

          // 1. DYNAMIC GENERIC COLLECTION BLOCK RENDERING MAPPINGS
          const blockDataMap: Record<string, any[] | undefined> = {
            featuredPosts: (block as any).posts,
            featuredArtists: (block as any).artists,
            featuredPlatforms: (block as any).platforms,
            featuredSynchronicity: (block as any).synchronicity,
          };

          const collectionItems = blockDataMap[block._type];

          if (Array.isArray(collectionItems)) {
            return collectionItems.map((item: any, index: number) => {
              if (!item) return null;

              const isArtist = item._type === 'artist' || (typeof item.name === 'string');
              const cardTitle = item.title || item.name || 'Untitled';
              const backgroundColor = item.background_color?.hex || "#fff";

              let routeFolder = 'posts';
              if (isArtist) {
                routeFolder = 'artists';
              } else if (item._type) {
                const rawType = String(item._type);
                routeFolder = rawType === 'featuredSynchronicity' || rawType === 'synchronization'
                  ? 'synchronizations'
                  : rawType.endsWith('s') ? rawType : `${rawType}s`;
              }

              const itemHref = item.slug?.current ? `/${routeFolder}/${item.slug.current}` : '#';
              const cardImage = item.gallery && item.gallery.length > 0 ? item.gallery[0] : item.mainImage;

              const stableKey = `${block._key}-${item._id || index}-${index}`;

              return (
                <DragHandle
                  key={stableKey} // Keeps TypeScript clean
                  reactKey={stableKey} // 💡 Passes it explicitly down to the underlying div element
                  customPath={`content[_key=="${block._key}"].${block._type === 'featuredPosts' ? 'posts' : block._type.replace('featured', '').toLowerCase() + 's'}[_key=="${item._key || index}"]`}
                >
                  <Link className="group block" href={itemHref}>
                    <article className="post_container">
                      {item.categories && (
                        <div>
                          <Categories categories={item.categories} />
                        </div>
                      )}

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

                      {item.body && (
                        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg post_text_wrapper">
                          <PortableText value={item.body} />
                        </div>
                      )}
                    </article>
                  </Link>
                </DragHandle>
              );
            });
          }

          // 2. STATIC LAYOUT BLOCKS SWITCH MAP
          switch (block._type) {
            case "hero":
              return (
                <DragHandle key={block._key} reactKey={block._key}>
                  <Hero {...block} />
                </DragHandle>
              );
            case "features":
              return (
                <DragHandle key={block._key} reactKey={block._key}>
                  <Features {...block} />
                </DragHandle>
              );
            case "splitImage":
              return (
                <DragHandle key={block._key} reactKey={block._key}>
                  <SplitImage {...block} />
                </DragHandle>
              );
            case "faqs":
              return (
                <DragHandle key={block._key} reactKey={block._key}>
                  <FAQs {...block} />
                </DragHandle>
              );
            default:
              return null;
          }
        })}
      </Masonry>
    </main>
  );
}
