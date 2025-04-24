import { count } from "@/sanity/lib/utils";
import { defineField, defineType } from "sanity";

export default defineType({
	name: 'link.list',
	title: 'Link list',
	type: 'object',
	fields: [
		defineField({
			name: 'link',
			type: 'link',
		}),
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		}),
		defineField({
			name: 'background_dropdown',
			title: 'Background For dropdown',
			type: 'color',
		}),
	],
	preview: {
		select: {
			link: 'link',
			links: 'links',
		},
		prepare: ({ link, links }) => ({
			title: link.label || link.internal?.title,
			subtitle: count(links, 'link'),
		}),
	},
})
