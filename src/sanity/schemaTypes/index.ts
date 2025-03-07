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
import { siteSettingsType } from './site'

import { pageType } from "./pageType";
import { pageBuilderType } from "./pageBuilderType";
import { faqType } from "./faqType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import { featuredPosts } from './blocks/featuredPosts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType, 
    
    link, 
    linkList, 
    navigation, 
    siteSettingsType, 
    cta, 
    metadata, 
    
    mediaType, 
    artistType, 
    venueType,     
    
    
    
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
