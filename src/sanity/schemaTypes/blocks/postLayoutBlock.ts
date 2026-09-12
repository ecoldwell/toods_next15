import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const postLayoutBlock = defineType({
  name: 'postLayoutBlock',
  title: 'Post Presentation Block',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading / Title',
      type: 'string',
    }),
    defineField({
      name: 'background_color',
      title: 'Heading Background Color',
      type: 'color',
    }),
    defineField({
      name: 'images',
      title: 'Stacked Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'body',
      title: 'Rich Description Text (Body)',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ]
})
