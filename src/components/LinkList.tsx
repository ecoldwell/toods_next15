import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { HEADER_MENU } from "@/sanity/lib/queries";
import { Menu } from './NavigationItem';


export default async function Navigation() {
  const { data: siteConfig } = await sanityFetch({
    query: HEADER_MENU,
  });
  console.log(siteConfig.headerMenu, "end")
  const headerNavigation = siteConfig.headerMenu.items;
  console.log(headerNavigation, "uycdgcgsucgcgcuyg")
  
  return (
    <nav>
      <Menu menuItems={headerNavigation} />
    </nav>
  );
}
