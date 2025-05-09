import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { HEADER_MENU } from "@/sanity/lib/queries";
import { Menu } from '../NavigationItem';
import { MobileOverlay } from './MobileOverlay'

export default async function MobileHeader() {
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

  function showNav() {
    console.log("increment like count")
  }


 

  return (
    <div className="mobile_header_container">
      {/* <div className="mobile_header"> */}
        {/* <LogoHeader></LogoHeader> */}
       {/* </div> */}
      <MobileOverlay menuItems={headerNavigation} />
    
    </div>

  );
}