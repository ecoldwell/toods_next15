import { defineQuery, groq } from 'next-sanity'

// --- POSTS ---
export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  _type,
  title,
  slug,
  background_color,
  body,
  mainImage,
  "gallery": images[]{ asset->{ _id, url }, alt },
  publishedAt,
  "categories": coalesce(categories[]->{ _id, slug, title }, []),
  author->{ name, image }
}`)

export const POSTS_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  color,
  body,
  mainImage,
  "gallery": images[]{ asset->{ _id, url }, alt },
  background_color,
  publishedAt,
  "categories": coalesce(categories[]->{ _id, slug, title }, []),
  author->{ name, image },
  relatedPosts[]{ _key, ...@->{_id, _type, title, slug} }
}`)

// --- ARTISTS ---
export const artistsQuery = defineQuery(`*[_type == "artist" && defined(slug.current)]|order(publishedAt desc)[0...12] {
  _id,
  _type,
  name,
  slug,
  body,
  "gallery": images[]{ asset->{ _id, url }, alt },
  mainImage,
  background_color,
  categories[]->{ _id, title }
}`)

export const artistQuery = defineQuery(groq`*[_type == "artist" && slug.current == $slug][0] {
  _id,
  _type,
  name,
  "gallery": images[]{ asset->{ _id, url }, alt },
  mainImage,
  background_color,
  body,
  publishedAt,
  categories[]->,
  "relatedArtists": relatedArtists[]->{ name, slug }
}`)

// --- PLATFORMS ---
export const platformsQuery = defineQuery(groq`*[_type == "platform"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  background_color,
  slug { current },
  body,
  "gallery": images[]{ asset->{ _id, url }, alt },
  mainImage { asset, hotspot, crop, _type },
  platformType,
  platformUrl,
  publishedAt,
  categories[]-> { _id, _type, title, slug }
}`)

export const platformQuery = defineQuery(groq`*[_type == "platform" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  background_color,
  body,
  "gallery": images[]{ asset->{ _id, url }, alt },
  mainImage,
  platformType,
  platformUrl,
  publishedAt,
  body,
  categories[]->
}`)

// --- EVENTS & MEDIA ---
export const EVENTS_QUERY = defineQuery(`*[_type == "event" && defined(slug.current)]{_id, _type, name, slug, date}|order(date desc)`)
export const EVENT_QUERY = defineQuery(`*[_type == "event" && slug.current == $slug][0]{ ..., "date": coalesce(date, now()), "doorsOpen": coalesce(doorsOpen, 0), headline->, venue-> }`)
export const MEDIAHOME_QUERY = defineQuery(`*[_type == "media" && defined(slug.current)]{_id, _type, name, slug, date}|order(date desc)`)
export const MEDIA_QUERY = defineQuery(`*[_type == "media" && slug.current == $slug][0]{ ..., "date": coalesce(date, now()), "doorsOpen": coalesce(doorsOpen, 0), headline->, venue-> }`)

// --- SYNCHRONIZATIONS ---
export const SYNCHRONIZATIONS_QUERY = defineQuery(`*[_type == "synchronization" && defined(slug.current)]{
  _id, _type, title, slug, background_color, date,
  artist->{ _id, _type, name, "gallery": images[]{ asset->{ _id, url }, alt }, mainImage, background_color, body, publishedAt, categories[]-> },
  platform->{ _id, _type, title, slug, background_color, "gallery": images[]{ asset->{ _id, url }, alt }, mainImage, platformType, platformUrl, publishedAt, body },
  venue->{ name }
}|order(date desc)`)

export const SYNCHRONIZATION_QUERY = defineQuery(`*[_type == "synchronization" && slug.current == $slug][0]{
  _id, _type, title, background_color, date, description, venue->{ name, address }, categories[]->,
  artist->{ _id, _type, name, slug, "gallery": images[]{ asset->{ _id, url }, alt }, mainImage, background_color, body, publishedAt, categories[]-> },
  platform->{ _id, _type, title, slug, background_color, "gallery": images[]{ asset->{ _id, url }, alt }, mainImage, platformType, platformUrl, publishedAt, body }
}`)
