import {defineField, defineType} from 'sanity'
import {SyncIcon} from '@sanity/icons'

export const synchronizationType = defineType({
  name: 'synchronization',
  title: 'Synchronization',
  type: 'document',
  icon: SyncIcon,
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
      name: 'artist',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'platform',
      type: 'reference',
      to: [{type: 'platform'}],
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
    }),
    defineField({
      name: 'date',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
}) 