import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import  link  from './objects/link'
import  linkList  from './objects/link.list'
import  navigation  from './navigation'
// import { siteConfig } from './siteConfig'
import { mediaType } from './mediaType'
import { artistType } from './artistType'
import { venueType } from './venueType'
import cta from './objects/cta'
import metadata from './objects/metadata'
import site from './site'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, link, linkList, navigation, site, mediaType, artistType, venueType, cta, metadata ],
}
