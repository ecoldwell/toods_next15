import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { FIXED_MENU, FOOTER_MENU } from "@/sanity/lib/queries";
import { Menu } from '../NavigationItem';

export default async function FooterNavigation() {
  const { data: siteData } = await sanityFetch({
    query: FOOTER_MENU,
  });

  console.log(siteData, "siteData output"); // Check the data
  console.log(siteData?.footerMenu, "end");    // Ensure it exists

  if (!siteData || !siteData.footerMenu || !siteData.footerMenu.items) {
    console.error("Missing fixed menu data", siteData);  
    return notFound();  // Handle the missing data gracefully
  }

  const footerNavigation = siteData.footerMenu.items;

  return (
    <div className="header_wrapper footer_menu">
        <Menu menuItems={footerNavigation} />
    </div>

  );
}