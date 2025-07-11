import { defineField, defineType } from 'sanity'
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
	name: 'site',
	title: 'Site settings',
	type: 'document',
	icon: ControlsIcon,
	groups: [
		{ name: 'general', title: 'General', default: true },
		{ name: 'navigation', title: 'Navigation' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'general',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'logo',
			type: 'logo',
			options: {
				collapsed: true,
			},
			group: 'general',
		}),
		// defineField({
		// 	name: 'announcements',
		// 	type: 'array',
		// 	of: [{ type: 'reference', to: [{ type: 'announcement' }] }],
		// 	group: 'general',
		// 	description:
		// 		'One announcement shown at a time. Top items have higher precedence.',
		// }),
		defineField({
			name: 'ctas',
			title: 'Call-to-action (Site-wide)',
			description: 'Typically used in the header and/or footer.',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'general',
		}),
		defineField({
			name: 'headerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'footerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'mobileMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'fixedMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'social',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'copyright',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
				},
			],
			group: 'general',
		}),
		defineField({
			name: 'ogimage',
			title: 'Open Graph Image (Site-wide)',
			description:
				'Used for social sharing previews. Set page-specific images in Page documents.',
			type: 'image',
			options: {
				hotspot: true,
			},
			group: 'general',
		}),
		defineField({
			name: "homePage",
			type: "reference",
			to: [{ type: "page" }],
		  }),
	],
	preview: {
		prepare: () => ({
			title: 'Site settings',
		}),
	},
})
