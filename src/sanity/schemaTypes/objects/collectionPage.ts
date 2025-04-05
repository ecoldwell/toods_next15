import { defineType } from 'sanity'

export const collectionPage = defineType({
  name: 'collectionPage',
  title: 'Collection Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      initialValue: (context) => {
        switch(context.parent?._type) {
          case 'artistsCollection': return 'All Artists'
          case 'platformsCollection': return 'All Platforms'
          case 'synchronizationsCollection': return 'All Synchronizations'
          default: return ''
        }
      },
      readOnly: true
    },
    {
      name: 'slug',
      type: 'slug',
      readOnly: true,
      options: {
        source: 'title'
      }
    }
  ]
})

export const artistsCollection = defineType({
  name: 'artistsCollection',
  title: 'Artists Collection',
  type: 'document',
  fields: [...collectionPage.fields]
})

export const platformsCollection = defineType({
  name: 'platformsCollection',
  title: 'Platforms Collection',
  type: 'document',
  fields: [...collectionPage.fields]
})

export const synchronizationsCollection = defineType({
  name: 'synchronizationsCollection',
  title: 'Synchronizations Collection',
  type: 'document',
  fields: [...collectionPage.fields]
}) 