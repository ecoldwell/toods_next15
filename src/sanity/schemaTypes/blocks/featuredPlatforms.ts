import { defineType, defineField, defineArrayMember } from "sanity";

export const featuredPlatforms = defineType({
  name: "featuredPlatforms",
  title: "Featured Platforms",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
    }),
    defineField({
      name: "platforms",
      title: "Select Platforms",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "platform" }],
        }),
      ],
    }),
  ],
}); 