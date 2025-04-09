import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const platformType = defineType({
  name: 'platform',
  title: 'Platform',
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
    // defineField({
    //   name: 'platformType',
    //   type: 'string',
    //   options: {
    //     list: ['youtube', 'spotify', 'soundcloud', 'instagram', 'other'],
    //     layout: 'radio',
    //   },
    // }),
    defineField({
      name: 'platformUrl',
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