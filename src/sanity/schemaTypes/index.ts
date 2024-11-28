import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { link } from './objects/link'
import { linkList } from './objects/link.list'
import { navigation } from './navigation'
import { siteConfig } from './siteConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, link, linkList, navigation, siteConfig],
}
