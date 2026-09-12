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
      title: "Page Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "background_color",
      title: "Heading Background Color",
      type: "color",
    }),
    // 💡 NEW GALLERY FIELD: Matches the multiple-image layout used in posts & artists
    defineField({
      name: "images",
      title: "Image Gallery",
      type: "array",
      description: "Add one or multiple images. The first image will automatically serve as the sidebar preview thumbnail.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and screen readers."
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'body',
      title: "Page Content (Rich Text)",
      type: 'blockContent',
    }),
    // 💡 PAGE BUILDER SECTIONS: Placed at the bottom as a secondary block expansion layer
    defineField({
      name: "content",
      title: "Page Builder Sections (Optional)",
      type: "pageBuilder",
    }),
    // 💡 LEGACY MAIN IMAGE: Phased out cleanly so it won't clutter new pages
    defineField({
      name: "mainImage",
      title: "Main Image (Legacy)",
      type: "image",
      deprecated: { reason: "Use the new Image Gallery array field instead." },
      // readOnly: true,
      hidden: ({ value }) => !value, // Hides it for new pages, stays visible for old pages that still hold data
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      galleryImage: 'images.0',
      legacyImage: 'mainImage'
    },
    prepare(selection) {
      const { title, subtitle, galleryImage, legacyImage } = selection;

      return {
        title: title || 'Untitled Page',
        subtitle: subtitle ? `/${subtitle}` : 'No slug configured',
        // Fallback pipeline: prioritize the new gallery image, fall back to legacy
        media: galleryImage || legacyImage
      };
    }
  }
});
