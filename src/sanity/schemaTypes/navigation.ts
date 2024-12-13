import {defineField, defineType} from 'sanity'
import { count } from '../lib/utils'

export const navigation = defineType({
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
			name: 'items',
			type: 'array',
			of: [{ type: "reference", to: [{ type: "link" }, { type: "link.list"} ]}],
		}),
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare: ({ title, items }) => {
			const t = title.toLowerCase()

			return {
				title,
				subtitle: count(items),
			}
		},
	},
})