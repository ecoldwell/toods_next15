import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { stegaClean } from "next-sanity";
import { PortableText } from "next-sanity";

type SplitImageProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "splitImage" }
>;

export function SplitImage({ title, image, orientation, body, components }: SplitImageProps) {
  return (
    <section
      className="container mx-auto flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse"
      data-orientation={stegaClean(orientation) || "imageLeft"}
    >
      {image ? (
        <Image
          className="rounded-xl w-2/3 h-auto"
          src={urlFor(image).width(800).height(600).url()}
          width={800}
          height={600}
          alt=""
        />
      ) : null}
      {/* 3. Text Content Section (Handles standard headings and multi-paragraph layout blocks) */}
           <div className="w-full md:w-1/3 flex flex-col gap-4 justify-center">
             {title && (
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-pink-500 text-pretty">
                 {title}
               </h2>
             )}

             {/* Dynamic Rich Text Render Slot */}
             {body && (
               <div className="prose prose-pink text-slate-700 max-w-none">
                 <PortableText value={body} components={components} />
               </div>
             )}
           </div>
         </section>
  );
}
