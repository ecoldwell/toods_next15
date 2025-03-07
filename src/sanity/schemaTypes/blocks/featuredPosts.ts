import { defineType, defineField, defineArrayMember } from "sanity";

export const featuredPosts = defineType({
  name: "featuredPosts",
  title: "Featured Posts",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
    }),
    defineField({
      name: "posts",
      title: "Select Posts",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
    }),
  ],
});