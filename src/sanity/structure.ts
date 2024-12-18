import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, UsersIcon, PinIcon} from '@sanity/icons'


// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.listItem()
      .title('Upcoming Events')
      .schemaType('media')
      .icon(CalendarIcon)
      .child(S.documentList().title('Upcoming Events').filter('date >= now()')),
    S.listItem()
      .title('Past Events')
      .schemaType('media')
      .icon(CalendarIcon)
      .child(S.documentList().title('Past Events').filter('date < now()')),
    S.divider(),
    S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
    S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'media', 'artist', 'venue'].includes(item.getId()!),
      ),
      // S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
      // S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
      // S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
    ])
