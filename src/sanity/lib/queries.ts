import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'


export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`)

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`)

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  relatedPosts[]{
    _key, // required for drag and drop
    ...@->{_id, title, slug} // get fields from the referenced post
  }
}`)

export const LINK_QUERY = defineQuery(`
  *[_type == 'link.list']{
    ...,
    internal->{ _type, title, metadata }
  }
`);

export const NAVIGATION_QUERY =
  defineQuery(`*[_type == 'navigation']{
title,
  _id,
  items[] {
		LINK_QUERY,
		link{ LINK_QUERY },
		links[]{ LINK_QUERY }

  }
}`)

// export const SITE_SETTINGS = defineQuery(`*[_type == 'siteConfig'][0]{
//   ...,
//   headerMenu->{ NAVIGATION_QUERY },
//   footerMenu->{ NAVIGATION_QUERY },
//   social->{ NAVIGATION_QUERY },
//   'ogimage': ogimage.asset->url
// }`)

export const SITE_SETTINGS = 
  defineQuery(`*[_type == 'siteConfig'][0]{
    ...,
    headerMenu->{ 
      title,
      _id,
      items[] {
        label,
        url,
        internal->{ _type, title, metadata }
      }
    },
    footerMenu->{ 
      title,
      _id,
      items[] {
        label,
        url,
        internal->{ _type, title, metadata }
      }
    },
    social->{ 
      title,
      _id,
      items[] {
        label,
        url,
        internal->{ _type, title, metadata }
      }
    },
    'ogimage': ogimage.asset->url
  }`);

export const MEDIAHOME_QUERY = defineQuery(`*[
  _type == "media"
  && defined(slug.current)
]{_id, name, slug, date}|order(date desc)`);

export const MEDIA_QUERY = defineQuery(`*[
  _type == "media" &&
  slug.current == $slug
][0]{
...,
"date": coalesce(date, now()),
"doorsOpen": coalesce(doorsOpen, 0),
headline->,
venue->
}`);