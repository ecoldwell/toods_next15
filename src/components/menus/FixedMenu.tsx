import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { FIXED_MENU } from "@/sanity/lib/queries";
import { Menu } from '../NavigationItem';

export default async function FixedNavigation() {
  const { data: siteData } = await sanityFetch({
    query: FIXED_MENU,
  });

 // Check the data
 // Ensure it exists

  if (!siteData || !siteData.fixedMenu || !siteData.fixedMenu.items) {
    console.error("Missing fixed menu data", siteData);
    return notFound();  // Handle the missing data gracefully
  }

  const fixedNavigation = siteData.fixedMenu.items;

  return (
  <div id="​FixedNavigation" className="fixed_menu">
        <Menu menuItems={fixedNavigation} />
    </div>

  );
}
