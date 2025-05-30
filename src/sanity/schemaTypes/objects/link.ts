import { defineField, defineType } from "sanity";

export default defineType({
	name: 'link',
	title: 'Link',
	type: 'object',
	options: {
		columns: 2,
	},
	fields: [
		defineField({
			name: 'label',
			type: 'string',

		}),
		defineField({
			name: 'background_color',
			title: 'Background For Title',
			type: 'color',
		}),
		defineField({
			name: 'text_color',
			title: 'Text Color',
			type: 'color',
			description: 'Color for link text',
		}),
		defineField({
			name: 'type',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'internal', value: 'internal' },
					{ title: 'external', value: 'external' },
					{ title: 'collection', value: 'collection' },
				],
			},
		}),
		defineField({
			name: 'collection',
			type: 'string',
			options: {
				list: [
					{ title: 'All Artists', value: 'artists' },
					{ title: 'All Platforms', value: 'platforms' },
					{ title: 'All Synchronizations', value: 'synchronizations' },
				],
			},
			hidden: ({ parent }) => parent?.type !== 'collection',
		}),
		defineField({
			name: 'internal',
			type: 'reference',
			to: [
				{ type: 'post' },
				{ type: 'category' },
				{ type: 'event' },
				{ type: 'page' },
				{ type: 'artist' },
				{ type: 'platform' },
				{ type: 'synchronization' }
			],
			hidden: ({ parent }) => parent?.type !== 'internal',
		}),
		defineField({
			name: 'external',
			placeholder: 'https://example.com',
			type: 'url',
			validation: (Rule) =>
				Rule.uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
					allowRelative: true,
				}),
			hidden: ({ parent }) => parent?.type !== 'external',
		}),
		defineField({
			name: 'params',
			title: 'URL parameters',
			placeholder: 'e.g. #jump-link or ?foo=bar',
			type: 'string',
			hidden: ({ parent }) => parent?.type !== 'internal',
		}),
	],
	preview: {
		select: {
			label: 'label',
			_type: 'internal._type',
			title: 'internal.title',
			slug: 'internal.metadata.slug.current',
			external: 'external',
			params: 'params',
		},
		prepare: ({ label, _type, title, slug, external, params }) => ({
			title: label || title,
			subtitle: [
				_type === 'post' ? '/posts' : null,
				_type === 'artist' ? '/artists' : null,
				_type === 'platform' ? '/platforms' : null,
				_type === 'synchronization' ? '/synchronizations' : null,
				external || (slug && (slug === 'index' ? '/' : `/${slug}`)),
				params,
			]
				.filter(Boolean)
				.join(''),
		}),
	},
})