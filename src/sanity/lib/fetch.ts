import { token } from '@/sanity/lib/token'
import { draftMode } from 'next/headers'
import { defineLive, type QueryParams, type QueryOptions } from 'next-sanity'
import { sanityFetch, SanityLive } from './live'


export { groq } from 'next-sanity'

const REVALIDATE_TIME = 3600 // every hour


