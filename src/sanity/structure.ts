import type { StructureResolver } from 'sanity/structure'
import {
  CalendarIcon,
  UsersIcon,
  PinIcon,
  BookIcon,
  TagIcon,
  DocumentIcon,
  HelpCircleIcon,
  CogIcon,
  DesktopIcon,
  SyncIcon,
  MenuIcon,
  LinkIcon
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Toodinator Workspace')
    .items([

      // 1. EDITORIAL & MEDIA DIRECTORY
      S.listItem()
        .title('Editorial Content')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Editorial Content')
            .items([
              S.documentTypeListItem('post').title('All Posts').icon(BookIcon),
              S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
              S.documentTypeListItem('platform').id('platformContent').title('Platforms (Under Construction 🚧)').icon(DesktopIcon),
              S.documentTypeListItem('synchronization').id('syncContent').title('Synchronizations (Under Construction 🚧)').icon(SyncIcon),
            ])
        ),

      S.divider(),

      // 2. LIVE EVENTS & VENUES DIRECTORY
      S.listItem()
        .title('Events & Bookings (Under Construction 🚧)')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events & Bookings')
            .items([
              S.listItem()
                .title('Upcoming Events')
                .schemaType('event')
                .icon(CalendarIcon)
                .child(S.documentList().title('Upcoming Events').filter('_type == "event" && date >= now()')),
              S.listItem()
                .title('Past Events')
                .schemaType('event')
                .icon(CalendarIcon)
                .child(S.documentList().title('Past Events').filter('_type == "event" && date < now()')),
              S.divider(),
              S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
            ])
        ),

      S.divider(),

      // 3. CORE TAXONOMIES & INTERNALS
      S.listItem()
        .title('Taxonomies & Assets')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Taxonomies & Assets')
            .items([
              S.documentTypeListItem('category').title('Categories (Testing Mode 🧪)').icon(TagIcon),
              S.documentTypeListItem('author').title('Authors (Testing Mode 🧪)').icon(UsersIcon),
              S.documentTypeListItem('faq').title('FAQs (Testing Mode 🧪)').icon(HelpCircleIcon),
            ])
        ),

      S.divider(),

      // 4. PAGES ARCHITECTURE
      S.documentTypeListItem("page").title("Site Pages").icon(DocumentIcon),

      S.divider(),

      // 🔽 NEW SECTION: NAVIGATION & LINKS 🔽
          S.listItem()
            .title('Menus & Navigation')
            .icon(MenuIcon)
            .child(
              S.list()
                .title('Menus & Navigation')
                .items([
                  // Pulls up your raw standalone custom navigation items
                  S.documentTypeListItem('navigation').title('Custom Menus').icon(MenuIcon),
                  // Pulls up any custom Call to Actions if your client wants to manage them
                  S.documentTypeListItem('cta').title('Call to Actions').icon(LinkIcon),
                ])
            ),

          S.divider(),

      // 5. GLOBAL SITE CONFIGURATION (SINGLETON)
      S.listItem()
        .id("site")
        .schemaType("site")
        .title("Global Site Settings")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("site")
            .schemaType("site")
            .documentId("site")
        ),
    ])
