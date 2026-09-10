import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
        name: 'background_color',
        title: 'Background For Title',
        type: 'color',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      description: 'Add one or multiple images. The first image in this list will automatically be used as the primary featured image.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Allows cropping and focal point adjustments in Studio
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and screen readers.',
              validation: rule => rule.custom((value, context) => {
                // Context points directly to the image block inside the array field
                const parent = context?.parent as { asset?: { _ref?: string } }

                return !value && parent?.asset?._ref
                  ? 'Alt text is required when an image is present'
                  : true
              }),
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      deprecated: { reason: 'Use the new Image Gallery array field instead.' },
      readOnly: true,
      hidden: ({ value }) => !value, // Hides it entirely for new posts, only shows on old posts that still have data
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
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
      name: "relatedPosts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
    }),
  ],
  // 🔽 UPDATE YOUR PREVIEW BLOCK TO LOOK LIKE THIS 🔽
   preview: {
     select: {
       title: 'title',
       subtitle: 'author.name',
       // Grab both fields so they are available to evaluate
       galleryImage: 'images.0',
       legacyImage: 'mainImage'
     },
     prepare(selection) {
       const { title, subtitle, galleryImage, legacyImage } = selection;

       return {
         title: title,
         subtitle: subtitle,
         // Fallback pipeline: prioritize the new gallery image, fall back to legacy
         media: galleryImage || legacyImage
       };
     }
   }
 })
