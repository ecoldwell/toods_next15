import { client } from './client'

const singletons = [
  {
    _id: 'artistsCollection',
    _type: 'artistsCollection',
    title: 'All Artists',
    slug: { current: 'artists' }
  },
  {
    _id: 'platformsCollection',
    _type: 'platformsCollection',
    title: 'All Platforms',
    slug: { current: 'platforms' }
  },
  {
    _id: 'synchronizationsCollection',
    _type: 'synchronizationsCollection',
    title: 'All Synchronizations',
    slug: { current: 'synchronizations' }
  }
]

export async function initializeSingletons() {
  for (const singleton of singletons) {
    try {
      await client.createIfNotExists(singleton)
    } catch (err) {
      console.error(`Error creating singleton ${singleton._id}:`, err)
    }
  }
} 