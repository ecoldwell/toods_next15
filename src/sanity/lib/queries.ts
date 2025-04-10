import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'


export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  background_color,
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
  color,
  body,
  mainImage,
  background_color,
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

export const EVENTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
]{_id, name, slug, date}|order(date desc)`)

export const EVENT_QUERY = defineQuery(`*[
  _type == "event" &&
  slug.current == $slug
][0]{
  ...,
  "date": coalesce(date, now()),
  "doorsOpen": coalesce(doorsOpen, 0),
  headline->,
  venue->
}`)

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
      _key,
      ...@->{_id, title, slug, items[]{
        ...,
        _key,
        _type,
        label,
        background_color,
        external,
        internal->{ 
          _type, 
          title, 
          name,  // Added for artist name
          metadata, 
          _key, 
          _id, 
          slug 
        },
        links[] {
          ...,
          _key,
          _type,
          label,
          background_color,
          external,
          internal->{ 
            _type, 
            title,
            name,  // Added for artist name 
            metadata, 
            _key, 
            _id, 
            slug, 
            label 
          }
        }
      }}
    }
  }`)
export const PAGE_QUERY =
  defineQuery(`*[_type == "page"&& slug.current == $slug][0]{
     ...,
    content[]{
      ...,
      _type == "faqs" => {
        ...,
        faqs[]->
      },
      _type == "featuredPosts" => {
        ...,
        "posts": posts[]->{
          _id,
          _type,
          title,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      },
      _type == "featuredArtists" => {
        ...,
        "artists": artists[]->{
          _id,
          _type,
          name,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      },
      _type == "featuredPlatforms" => {
        ...,
        "platforms": platforms[]->{
          _id,
          _type,
          title,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      },
      _type == "featuredSynchronicity" => {
        ...,
        "synchronicity": synchronicity[]->{
          _id,
          _type,
          title,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      }
    }
  }`);

// ...all other queries

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "site"][0]{
  homePage->{
    ...,
    content[]{
      ...,
      _type == "faqs" => {
        ...,
        faqs[]->
      },
      _type == "featuredPosts" => {
        ...,
        "posts": posts[]->{
          _id,
          _type,
          title,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      },
      _type == "featuredArtists" => {
        ...,
        "artists": artists[]->{
          _id,
          _type,
          name,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      },
      _type == "featuredPlatforms" => {
        ...,
        "platforms": platforms[]->{
          _id,
          _type,
          title,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      },
      _type == "featuredSynchronicity" => {
        ...,
        "synchronicity": synchronicity[]->{
          _id,
          _type,
          title,
          slug,
          background_color,
          body,
          mainImage {
            asset->{
              _id,
              url
            }
          }
        }
      }
    }
  }
}`);

export const LOGO_QUERY = 
defineQuery(`*[_id == "site"][0] {
  logo {
    name,
    "default": image.default.asset->{
      _id,
      url
    },
    "light": image.light.asset->{
      _id,
      url
    },
    "dark": image.dark.asset->{
      _id,
      url
    }
  }
}`)

export const artistsQuery = defineQuery(`*[_type == "artist"] {
  _id,
  name,
  slug,
  mainImage,
  background_color,
  categories[]->{ 
    _id,
    title
  }
}`);

export const artistQuery = defineQuery(groq`
  *[_type == "artist" && slug.current == $slug][0] {
    _id,
    name,
    mainImage,
    background_color,
    body,
    publishedAt,
    categories[]->,
    "relatedArtists": relatedArtists[]->{ name, slug }
  }
`)

export const platformsQuery = defineQuery(groq`
  *[_type == "platform"] | order(publishedAt desc) {
    _id,
    title,
    background_color,
    slug {
      current
    },
    mainImage {
      asset,
      hotspot,
      crop,
      _type
    },
    platformType,
    platformUrl,
    publishedAt,
    categories[]-> {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      description
    }
  }
`)

export const platformQuery = defineQuery(groq`
  *[_type == "platform" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    background_color,
    mainImage,
    platformType,
    platformUrl,
    publishedAt,
    body,
    categories[]->
  }
`)

export const SYNCHRONIZATIONS_QUERY = defineQuery(`*[
  _type == "synchronization"
  && defined(slug.current)
]{
  _id,
  title,
  slug,
  background_color,
  date,
  artist->{
    _id,
    name,
    mainImage,
    background_color,
    body,
    publishedAt,
    categories[]->,
  },
  platform->{
    _id,
    title,
    slug,
    background_color,
    mainImage,
    platformType,
    platformUrl,
    publishedAt,
    body,
  },
  venue->{
    name
  }
}|order(date desc)`)

export const SYNCHRONIZATION_QUERY = defineQuery(`*[
  _type == "synchronization" &&
  slug.current == $slug
][0]{
  _id,
  title,
  background_color,
  date,
  description,
  artist->{
    _id,
    name,
    slug,
    mainImage,
    background_color,
    body,
    publishedAt,
    categories[]->,
  },
  platform->{
    _id,
    title,
    slug,
    background_color,
    mainImage,
    platformType,
    platformUrl,
    publishedAt,
    body,
  },
  venue->{
    name,
    address
  },
  categories[]->
}`)