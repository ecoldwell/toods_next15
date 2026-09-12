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
      type: "pageBuilder",
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  // 🔽 UPDATE YOUR PREVIEW BLOCK TO LOOK LIKE THIS 🔽
   preview: {
     select: {
       title: 'title',
       subtitle: 'slug.current',
       // Grab both fields so they are available to evaluate
       galleryImage: 'images.0',
       legacyImage: 'mainImage'
     },
     prepare(selection) {
       const { title, galleryImage, legacyImage } = selection;

       return {
         title: title,
         // Fallback pipeline: prioritize the new gallery image, fall back to legacy
         media: galleryImage || legacyImage
       };
     }
   }
});
