import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { FIXED_MENU } from "@/sanity/lib/queries";
import { Menu } from '../NavigationItem';

export default async function FixedNavigation() {
  const { data: siteData } = await sanityFetch({
    query: FIXED_MENU,
  });

  console.log(siteData, "siteData output"); // Check the data
  console.log(siteData?.fixedMenu, "end");    // Ensure it exists

  if (!siteData || !siteData.fixedMenu || !siteData.fixedMenu.items) {
    console.error("Missing fixed menu data", siteData);  
    return notFound();  // Handle the missing data gracefully
  }

  const fixedNavigation = siteData.fixedMenu.items;

  return (
    <div className="fixed_menu">
        <Menu menuItems={fixedNavigation} />
    </div>

  );
}