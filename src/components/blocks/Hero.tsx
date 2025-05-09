import { PortableText } from "next-sanity";
import Image from "next/image";
import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="hero_wrapper post_image_wrapper">
      <div className="flex flex-col justify-center z-20 hero_content">
        {title ? (
          <h1 className="">
            {title}
          </h1>
        ) : null}
        <div className="">
          {text ? <PortableText value={text} /> : null}
        </div>
      </div>
      <div className="post_image_wrapper_no_border">
      {image ? (
        <Image
          className="w-full h-auto rounded-lg"
          src={urlFor(image).width(1600).height(1200).url()}
          width={1600}
          height={1200}
          alt=""
        />
      ) : null}
      </div>
    </section>
  );
}