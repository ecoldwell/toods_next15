"use client";

import { Hero } from "@/components/blocks/Hero";
import { Features } from "@/components/blocks/Features";
import { SplitImage } from "@/components/blocks/SplitImage";
import { FAQs } from "@/components/blocks/FAQs";
import { FeaturedPosts } from "./blocks/FeaturedPosts";
import { FeaturedArtists } from "./blocks/FeaturedArtists";
import { FeaturedPlatforms } from "./blocks/FeaturedPlatforms";
import { FeaturedSynchronicity } from "./blocks/FeaturedSynchronicity";
import { PAGE_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
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
  default: 2,
  1100: 2,
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
    <main className = "masonry-container-wrapper"
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
      {blocks.map((block) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div className = "masonry-item"
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}
          >
            {children}
          </div>
        );

        switch (block._type) {
          case "hero":
            return (
              <DragHandle key={block._key}>
                <Hero {...block} />
              </DragHandle>
            );
          case "features":
            return (
              <DragHandle key={block._key}>
                <Features {...block} />
              </DragHandle>
            );
          case "splitImage":
            return (
              <DragHandle key={block._key}>
                <SplitImage {...block} />
              </DragHandle>
            );
          case "faqs":
            return (
              <DragHandle key={block._key}>
                <FAQs {...block} />
              </DragHandle>
            );
            case "featuredPosts":
              return (
                <DragHandle key={block._key}>
                  <FeaturedPosts {...block} />
                </DragHandle>
              );
            case "featuredArtists":
              return (
                <DragHandle key={block._key}>
                  <FeaturedArtists {...block} />
                </DragHandle>
              );
            case "featuredPlatforms":
              return (
                <DragHandle key={block._key}>
                  <FeaturedPlatforms {...block} />
                </DragHandle>
              );
            case "featuredSynchronicity":
              return (
                <DragHandle key={block._key}>
                  <FeaturedSynchronicity {...block} />
                </DragHandle>
              );
          default:
            // This is a fallback for when we don't have a block type
            // return <div key={block._key}>Block not found: {block._type}</div>;
        }
        
      })}
      </Masonry>
    </main>
  );
}