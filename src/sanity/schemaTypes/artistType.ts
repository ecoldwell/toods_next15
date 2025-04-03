import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'background_color',
      title: 'Background For Title',
      type: 'color',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: "relatedArtists",
      type: "array",
      of: [{ type: "reference", to: { type: "artist" } }],
    }),
  ],
})