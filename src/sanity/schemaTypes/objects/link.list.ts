// import { defineField, defineType } from 'sanity'
// import { count } from '@/sanity/lib/utils'

// export const linkList = defineType({
// 	name: 'link.list',
// 	title: 'Link list',
// 	type: 'object',
// 	fields: [
// 		defineField({
// 			name: 'link',
// 			type: 'link',
// 		}),
// 		defineField({
// 			name: 'links',
// 			type: 'array',
// 			of: [{ type: 'link' }],
// 		}),
// 	],
// 	preview: {
// 		select: {
// 			link: 'link',
// 			links: 'links',
// 		},
// 		prepare: ({ link, links }) => ({
// 			title: link.label || link.internal?.title,
// 			subtitle: count(links, 'link'),
// 		}),
// 	},
// })
import { defineField, defineType } from 'sanity';

export const linkList = defineType({
  name: 'link.list',
  title: 'Link List',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Primary Link',
      type: 'link',
      description: 'The primary link for this list.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Additional Links',
      type: 'array',
      of: [{ type: 'link' }],
      description: 'Add more links as part of the list.',
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      link: 'link',
      links: 'links',
    },
    prepare: ({ link, links }) => {
      const primaryTitle = link?.label || link?.internal?.title || 'No title';
      const linkCount = links ? links.length : 0; // Count the number of additional links
      return {
        title: primaryTitle,
        subtitle: `${linkCount} additional link${linkCount === 1 ? '' : 's'}`,
      };
    },
  },
});
