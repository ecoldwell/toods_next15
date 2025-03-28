import type { StructureResolver } from 'sanity/structure'
import { CalendarIcon, UsersIcon, PinIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Upcoming Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(
          S.documentList()
            .title('Upcoming Events')
            .filter('_type == "event" && date >= now()')
        ),
      S.listItem()
        .title('Past Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(
          S.documentList()
            .title('Past Events')
            .filter('_type == "event" && date < now()')
        ),
      S.divider(),
      S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
      S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.divider(),
      S.listItem()
        .id('site')
        .schemaType('site')
        .title('Site Settings')
        .child(
          S.editor()
            .id('site')
            .schemaType('site')
            .documentId('site')
        ),
    ])
