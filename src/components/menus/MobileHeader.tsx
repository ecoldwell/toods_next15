import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { HEADER_MENU } from "@/sanity/lib/queries";
import { Menu } from '../NavigationItem';
import { MobileOverlay } from './MobileOverlay'
import LogoHeader from "./MobileLogo";
import MobileHamburger from "./MobileHamburger";

export default async function MobileHeader() {
  const { data: siteConfig } = await sanityFetch({
    query: HEADER_MENU,
  });

  if (!siteConfig || !siteConfig.headerMenu || !siteConfig.headerMenu.items) {
    console.error("Missing header menu data", siteConfig);
    return notFound();  // Handle the missing data gracefully
  }

  const headerNavigation = siteConfig.headerMenu.items;

  function showNav() {

  }




  return (
    <div className="mobile_nav_wrapper">
      <div className="mobile_header">
        <LogoHeader></LogoHeader>
        <MobileHamburger></MobileHamburger>
       </div>
      <MobileOverlay menuItems={headerNavigation} />

    </div>

  );
}
