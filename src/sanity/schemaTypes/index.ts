import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {artistType} from './artistType'
import {eventType} from './eventType'
import {venueType} from './venueType'
import link from './objects/link'
import linkList from './objects/link.list'
import navigation from './navigation'
import cta from './objects/cta'
import metadata from './objects/metadata'
import { siteSettingsType } from './site'
import { pageType } from "./pageType"
import { pageBuilderType } from "./pageBuilderType"
import { faqType } from "./faqType"
import { faqsType } from "./blocks/faqsType"
import { featuresType } from "./blocks/featuresType"
import { heroType } from "./blocks/heroType"
import { splitImageType } from "./blocks/splitImageType"
import { featuredPosts } from './blocks/featuredPosts'
import logo from './documents/logo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    artistType,
    eventType,
    venueType,
    link,
    linkList,
    navigation,
    siteSettingsType,
    cta,
    metadata,
    logo,
    pageType,
    pageBuilderType,
    faqType,
    faqsType,
    featuresType,
    heroType,
    splitImageType,
    featuredPosts
  ],
}
