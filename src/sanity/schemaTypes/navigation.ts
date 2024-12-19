// import {defineField, defineType} from 'sanity'
// import { count } from '../lib/utils'

// export const navigation = defineType({
//   name: 'navigation',
// 	title: 'Navigation',
// 	type: 'document',
// 	fields: [
// 		defineField({
// 			name: 'title',
// 			type: 'string',
// 			validation: (Rule) => Rule.required(),
// 		}),
// 		defineField({
// 			name: 'items',
// 			type: 'array',
// 			of: [{ type: 'link' }, { type: 'link.list' }],
// 		}),
// 	],
// 	preview: {
// 		select: {
// 			title: 'title',
// 			items: 'items',
// 		},
// 		prepare: ({ title, items }) => {
// 			const t = title.toLowerCase()

// 			return {
// 				title,
// 				subtitle: count(items),
// 			}
// 		},
// 	},
// })
import { defineType, defineField } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Navigation Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Navigation Items',
      of: [{ type: 'link' }, { type: 'link.list' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare: ({ title, itemCount }) => ({
      title,
      subtitle: `${itemCount || 0} item${itemCount === 1 ? '' : 's'}`,
    }),
  },
});
