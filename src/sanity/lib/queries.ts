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
  *[_type == 'link']{
    ...,
    internal->{ _type, title, metadata }
  }
`);

export const LINK_LIST_QUERY = defineQuery(`
  *[_type == "link.list"]{
    ...,
    links[]{
      label,
      url,
      internal->{ _type, title, metadata }
    }
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"]{
    _id,
    title,
    items[]{
      _type == "link" => {
        label,
        url,
        internal->{ _type, title, metadata }
      },
      _type == "link.list" => {
        links[]{
          label,
          url,
          internal->{ _type, title, metadata }
        }
      }
    }
  }
`);
export const SITE_SETTINGS = defineQuery(`
  *[_type == 'siteConfig'][0]{
    ...,
    headerMenu->{
      title,
      items[]{
        _type == "link" => {
          label,
          url,
          internal->{ _type, title, metadata }
        },
        _type == "link.list" => {
          links[]{
            label,
            url,
            internal->{ _type, title, metadata }
          }
        }
      }
    },
    footerMenu->{
      title,
      items[]{
        _type == "link" => {
          label,
          url,
          internal->{ _type, title, metadata }
        },
        _type == "link.list" => {
          links[]{
            label,
            url,
            internal->{ _type, title, metadata }
          }
        }
      }
    },
    social->{
      title,
      items[]{
        _type == "link" => {
          label,
          url,
          internal->{ _type, title, metadata }
        },
        _type == "link.list" => {
          links[]{
            label,
            url,
            internal->{ _type, title, metadata }
          }
        }
      }
    },
    'ogimage': ogimage.asset->url
  }
`);

// export const SITE_SETTINGS = defineQuery(`*[_type == 'siteConfig'][0]{
//   ...,
//   headerMenu->{ NAVIGATION_QUERY },
//   footerMenu->{ NAVIGATION_QUERY },
//   social->{ NAVIGATION_QUERY },
//   'ogimage': ogimage.asset->url
// }`)

// export const SITE_SETTINGS = 
//   defineQuery(`*[_type == 'siteConfig'][0]{
//     ...,
//     headerMenu->{ 
//       title,
//       _id,
//       items[] {
//         label,
//         url,
//         internal->{ _type, title, metadata }
//       }
//     },
//     footerMenu->{ 
//       title,
//       _id,
//       items[] {
//         label,
//         url,
//         internal->{ _type, title, metadata }
//       }
//     },
//     social->{ 
//       title,
//       _id,
//       items[] {
//         label,
//         url,
//         internal->{ _type, title, metadata }
//       }
//     },
//     'ogimage': ogimage.asset->url
//   }`);

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


 export const NAV_QUERY =
  defineQuery(`*[_type == "navigation"]{
 title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
    link {
          ...,
      internal->{ _type, title, metadata, _key },
    },
    links[] {
            ...,
      internal->{ _type, title, metadata, _key }
    }
    }
}`)

export const CTA_QUERY = 
defineQuery(`*[_type == "cta"]{
  ...,
link { 
  ...,
  internal->{ _type, title, metadata }
  }
 }`)

export const SITE_QUERY = 
defineQuery(`*[_type == "site"][0]{
  ...,
  headerMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
    link {
          ...,
      internal->{ _type, title, metadata, _key },
    },
    links[] {
            ...,
      internal->{ _type, title, metadata, _key }
    }
    } },
  footerMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
    link {
          ...,
      internal->{ _type, title, metadata, _key },
    },
    links[] {
            ...,
      internal->{ _type, title, metadata, _key }
    }
    } },
  socialMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
    link {
          ...,
      internal->{ _type, title, metadata, _key },
    },
    links[] {
            ...,
      internal->{ _type, title, metadata, _key }
    }
    } },
}`)

export const HEADER_MENU =
  defineQuery(`*[_type == "site"][0] {
    _id,
    _type,
    title,
    headerMenu{
      _key, // required for drag and drop
      ...@->{_id, title, slug, items[]{
        ...,
        _key,
        _type,
        label,
        external,
        internal->{ _type, title, metadata, _key, _id, slug },
        links[] {
          ...,
        _key,
        _type,
        label,
        external,
        internal->{ _type, title, metadata, _key, _id, slug, label },
        }
      
      }} // get fields from the referenced post
    }
  }`)


