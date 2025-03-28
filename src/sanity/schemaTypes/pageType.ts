import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: 'block' }],
    }),
    defineField({
      name: "excerpt",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      type: "image",
    }),
    defineField({
      name: "upcomingEvents",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "event" }],
        },
      ],
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),    
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});