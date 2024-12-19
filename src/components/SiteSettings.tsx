import { client } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import { SITE_SETTINGS_QUERYResult} from '@/sanity/types'; // Import the generated type

export const fetchSiteSettings = async (): Promise<SITE_SETTINGS_QUERYResult> => {
  return await client.fetch(SITE_SETTINGS_QUERY);
};