import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { link } from './objects/link'
import { linkList } from './objects/link.list'
import { navigation } from './navigation'
import { siteSettings } from './siteConfig'
import { mediaType } from './mediaType'
import { artistType } from './artistType'
import { venueType } from './venueType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, link, linkList, navigation, siteSettings, mediaType, artistType, venueType ],
}
