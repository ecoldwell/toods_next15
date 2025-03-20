import { Title } from '@/components/Title'
import Link from "next/link";
import { MEDIAHOME_QUERY } from '@/sanity/lib/queries';
import  Navigation  from '@/components/LinkList';
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { PageBuilder } from "@/components/PageBuilder";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';


// const MEDIA_QUERY = defineQuery(`*[
//   _type == "media"
//   && defined(slug.current)
// ]{_id, name, slug, date}|order(date desc)`);

export default async function Page() {
  const { data: events } = await sanityFetch({ query: MEDIAHOME_QUERY });
  const { data: page } = await sanityFetch({
    query: HOME_PAGE_QUERY,});

  return page?.homePage?.content ? (
    <PageBuilder       
    documentId={page?.homePage._id}
    documentType={page?.homePage._type}
    content={page?.homePage.content} />
  ) : (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">

    </section>
  )
}