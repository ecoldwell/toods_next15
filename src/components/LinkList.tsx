import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { HEADER_MENU } from "@/sanity/lib/queries";
import { Menu } from './NavigationItem';

export default async function Navigation() {
  const { data: siteConfig } = await sanityFetch({
    query: HEADER_MENU,
  });

  console.log(siteConfig, "siteConfig output"); // Check the data
  console.log(siteConfig?.headerMenu, "end");    // Ensure it exists

  if (!siteConfig || !siteConfig.headerMenu || !siteConfig.headerMenu.items) {
    console.error("Missing header menu data", siteConfig);  
    return notFound();  // Handle the missing data gracefully
  }

  const headerNavigation = siteConfig.headerMenu.items;

  return (
    <nav>
      <Menu menuItems={headerNavigation} />
    </nav>
  );
}