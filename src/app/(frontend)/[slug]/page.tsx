import { PAGE_QUERY } from "@/sanity/queries/pages";
import { sanityFetch } from "@/sanity/lib/live";
import { PageBuilder } from "@/components/PageBuilder";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";
import { urlFor } from "@/sanity/lib/image";
import { LightboxImage } from "@/components/Lightbox";

export default async function PageRoute({ params }: { params: { slug: string } }) {
  const { data: pageData } = await sanityFetch({
    query: PAGE_QUERY,
    params
  });

  if (!pageData) return null;

  const { title, background_color, body, gallery, content, _id, _type, mainImage } = pageData;
  const backgroundColor = background_color?.hex || "#fff";

  // 1. Image fallback parsing logic
  const displayImages = gallery && gallery.length > 0
    ? gallery
    : mainImage?.asset ? [mainImage] : [];

  // 💡 THE CONDITION: Check if any valid images exist to render
  const hasImages = displayImages.length > 0 && displayImages.some((img: any) => img?.asset);
  const hasRootContent = body || title || hasImages;

  // 💡 THE CONDITIONAL CHECK: Look for any grid layout sections inside the page builder blocks
    const targetGridTypes = ["featuredPosts", "featuredArtists", "featuredPlatforms", "featuredSynchronicity"];
    const hasMasonryGrid = Array.isArray(content) && content.some((block: any) => targetGridTypes.includes(block._type));

  return (
    <main className="main_wrapper post_page">
    <div className="w-full flex flex-col min-h-screen">

      {/* 2. CORE ROOT LAYOUT */}
      {hasRootContent && (
        <div className="post_container">

          {/* Left Column: Stacked Images (Only renders if images exist) */}
          {hasImages && (
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
          )}

          {/* Right Column: Title and PortableText Body */}
          {/*
            💡 SMART FALLBACK CONDITION:
            - If it HAS images: uses your post layout class ('lg:col-span-7 lg:col-start-6')
            - If it has NO images: stretches the column full-width and limits width for elegant text scaling ('w-full max-w-4xl mx-auto')
          */}
          <div className={`post_content ${hasImages ? 'lg:col-span-7 lg:col-start-6' : 'w-full max-w-7xl text_only'}`}>
            {title && !hasMasonryGrid && (
              <header className="title">
                <div className="post_title_wrapper max-w-3xl">
                  <h1 className="post_title shape" style={{ background: backgroundColor }}>
                    {title}
                  </h1>
                </div>
              </header>
            )}

            {body ? (
              <div className="prose lg:prose-lg post_text_wrapper max-w-none">
                <PortableText value={body} components={components} />
              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* 3. Page Builder canvas stacks below */}
      {content && content.length > 0 && (
        <PageBuilder
          content={content}
          documentId={_id}
          documentType={_type}
        />
      )}
      </div>
    </main>
  );
}
