import { defineType, defineField, defineArrayMember } from "sanity";

export const featuredArtists = defineType({
  name: "featuredArtists",
  title: "Featured Artists",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
    }),
    defineField({
      name: "artists",
      title: "Select Artists",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "artist" }],
        }),
      ],
    }),
  ],
}); 