import {TagIcon} from '@sanity/icons'
import { IoShareSocialOutline } from 'react-icons/io5'
import {defineField, defineType} from 'sanity'
import { count } from '@/sanity/lib/utils'

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
			of: [{ type: 'link' }, { type: 'link.list' }],
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