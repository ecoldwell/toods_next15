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
		prepare: ({ link, links }) => {
  // Safe extraction checks with default fallbacks
  const titleLabel = link?.label || link?.internal?.title || link?.internal?.name || 'Untitled Dropdown Menu';

  // Calculate total links if links array is active
  const subCount = Array.isArray(links) ? links.length : 0;

  return {
    title: titleLabel,
    subtitle: `${subCount} nested menu link${subCount === 1 ? '' : 's'}`,
  };
    }
	}
})
