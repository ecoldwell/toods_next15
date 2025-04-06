import { defineType, defineField, defineArrayMember } from "sanity";

export const featuredSynchronicity = defineType({
  name: "featuredSynchronicity",
  title: "Featured Synchronicity",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
    }),
    defineField({
      name: "synchronicity",
      title: "Select Synchronicity Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "synchronization" }],
        }),
      ],
    }),
  ],
}); 