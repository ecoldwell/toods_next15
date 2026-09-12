import { defineQuery } from 'next-sanity'

// Reusable nested content blueprint for both flexible dynamic page templates
const contentBlocksBlueprint = `
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
      "gallery": images[]{
         asset->{ _id, url },
         alt
       },
      mainImage { asset->{ _id, url } }
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
      "gallery": images[]{
         asset->{ _id, url },
         alt
       },
      mainImage { asset->{ _id, url } }
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
      "gallery": images[]{
         asset->{ _id, url },
         alt
       },
      mainImage { asset->{ _id, url } }
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
      "gallery": images[]{
         asset->{ _id, url },
         alt
       },
      mainImage { asset->{ _id, url } }
    }
  }
`

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  body,
  content[]{ ${contentBlocksBlueprint} }
}`)

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "site"][0]{
  homePage->{
    ...,
    body,
    content[]{ ${contentBlocksBlueprint} }
  }
}`)

export const CTA_QUERY = defineQuery(`*[_type == "cta"]{
  ...,
  link {
    ...,
    internal->{ _type, title, metadata }
  }
}`)

export const LOGO_QUERY = defineQuery(`*[_id == "site"][0] {
  logo {
    name,
    "default": image.default.asset->{ _id, url },
    "light": image.light.asset->{ _id, url },
    "dark": image.dark.asset->{ _id, url }
  }
}`)
