import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const mediaType = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
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
      name: 'mediaType',
      type: 'string',
      options: {
        list: ['video', 'audio', 'image'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'mediaUrl',
      type: 'url',
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
  ],
})