import { defineField, defineType } from 'sanity'
import { count } from '@/sanity/lib/utils'

export default defineType({
	name: 'navigation',
	title: 'Navigation',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			  },
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [{ type: 'link' }, { type: 'link.list' }],
		}),
		defineField({
			name: 'textColor',
			title: 'Text Color',
			type: 'color',
			description: 'Color for navigation text',
		}),
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare: ({ title, items }) => ({
			title,
			subtitle: count(items),
		}),
	},
})

  