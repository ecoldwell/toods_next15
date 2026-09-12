// 1. Keep the subpath import exactly as it was!
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// 2. Fetch your secret read token safely from your environment variables
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client,
  // 💡 PASSING THE TOKENS SQUASHES THE "ATTEMPTING TO RECONNECT" BUG
  serverToken: token,
  browserToken: token,
});
