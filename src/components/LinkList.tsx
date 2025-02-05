import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";

import { notFound } from "next/navigation";
import { SITE_SETTINGS, NAV_QUERY, SITE_QUERY, HEADER_MENU } from "@/sanity/lib/queries";
import Link from "next/link";
import { stegaClean } from 'next-sanity'

import { Menu } from './NavigationItem';
import { DropdownMenu } from './NavigationItem';

export default async function Navigation() {
  const { data: siteConfig } = await sanityFetch({
    query: HEADER_MENU,
  });
  console.log(siteConfig.headerMenu, "end")
  const headerNavigation = siteConfig.headerMenu.items;
  console.log(headerNavigation, "uycdgcgsucgcgcuyg")
  
  return (
    <nav>
      <ul>
        {headerNavigation.map((_key, label) => (
          <li key={_key._key}></li>
        ))}
      </ul>
      <Menu menuItems={headerNavigation} />
      {/* {siteConfig.map((headerNav)=>{
        console.log(headerNav.items)
      })} */}
      {/* {siteConfig?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return <Link className="hover:link" link={item} key={key}></Link>

					case 'link.list':
						return (
							<div className="space-y-2 text-left" key={key}>
								<div className="technical text-xs">
									<Link link={item.link}>
										{stegaClean(item.link?.label) || item.link.internal?.title}
									</Link>
								</div>

								<ul>
									{item.links?.map((link, key) => (
										<li key={key}>
											<Link
												className={(
													'inline-block py-px hover:underline',
													link.external?.startsWith('http') && 'is-external',
												)}
												link={link}
											/>
										</li>
									))}
								</ul>
							</div>
						)

					default:
						return null
				}
			})} */}
      {/* <ul className="space-y-4 hello">
        {navigation.map((navItem) => {
          console.log(navItem.items, "Items for", navItem.title, NavigationItem); // Debug items
          return (
           
            <NavigationItem

              key={navItem._key}
              item={{
                id: navItem._key,
                title: navItem.title ,
                items: navItem.items ?? [], // Ensure fallback to empty array
              }} 
            />

          );
        })}
      </ul> */}
    </nav>
  );
}
