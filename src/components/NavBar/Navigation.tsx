import { SITE_SETTINGS } from '@/sanity/lib/queries';
import { SITE_SETTINGSResult } from '@/sanity/types';
import { sanityFetch } from '@/sanity/lib/live';
import { Key } from 'react';

export default async function Navigation() {
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS });
    console.log(siteSettings)

    if (!siteSettings) return null;

    const { headerMenu, footerMenu } = siteSettings;
  
    return (
        <nav>
          <h1>{headerMenu?.title}</h1>
          {headerMenu?.items?.map((item) =>
            item._type === 'link' ? (
              <a href={item.url} key={item.label}>
                {item.label}
              </a>
            ) : (
              <div key={item._id}>
                <h2>Dropdown</h2>
                {item.links?.map((link) => (
                  <a href={link.url} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            )
          )}
        </nav>
      );
    };


// const renderItems = (items: any[] | null) => {
//     if (!items || items.length === 0) return <p>No navigation items available.</p>;

//     return items.map((item, key) => {
//         console.log('Item:', item); // Debug log for each item

//         if (!item) return null;

//         const { label, url, internal } = item;

//         if (!label && !url && !internal) {
//             // Skip items with no meaningful content
//             return null;
//         }

//         if (item._type === 'link') {
//             const linkLabel = label || internal?.title || 'Unnamed Link';
//             const linkUrl = url || '#';

//             return (
//                 <div className="hover:link md:px-3" key={key}>
//                     <a href={linkUrl}>{linkLabel}</a>
//                 </div>
//             );
//         }

//         if (item._type === 'link.list') {
//             return (
//                 <ul key={key} className="link-list">
//                     {item.links && item.links.length > 0 ? (
//                         item.links.map((link: { label: any; internal: { title: any; }; url: string; }, i: Key | null | undefined) => {
//                             console.log('Sub-link:', link); // Debug log for each sub-link
//                             const subLinkLabel = link.label || link.internal?.title || 'Unnamed Sub-Link';
//                             const subLinkUrl = link.url || '#';

//                             return (
//                                 <li key={i}>
//                                     <a href={subLinkUrl}>{subLinkLabel}</a>
//                                 </li>
//                             );
//                         })
//                     ) : (
//                         <li>No sub-links available.</li>
//                     )}
//                 </ul>
//             );
//         }

//         return <div key={key}>Unknown item type</div>;
//     });
// };

// export default async function Menu() {
//     const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS });

//     console.log('Site Settings:', siteSettings); // Debug log for site settings

//     if (!siteSettings) {
//         return (
//             <nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden md:justify-center">
//                 <p>Navigation data is not available.</p>
//             </nav>
//         );
//     }

//     console.log('Header Menu Items:', siteSettings.headerMenu?.items); // Debug log for header menu items
//     console.log('Footer Menu Items:', siteSettings.footerMenu?.items); // Debug log for footer menu items

//     return (
//         <nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden md:justify-center">
//             {siteSettings.headerMenu && (
//                 <div>
//                     <h2>{siteSettings.headerMenu.title}</h2>
//                     {renderItems(siteSettings.headerMenu.items)}
//                 </div>
//             )}
//             {siteSettings.footerMenu && (
//                 <div>
//                     <h2>{siteSettings.footerMenu.title}</h2>
//                     {renderItems(siteSettings.footerMenu.items)}
//                 </div>
//             )}
//         </nav>
//     );import Link from "next/link";

type NavigationItemProps = {
    title: string | null; // Allow title to be nullable
    link?: { url: string | null }; // Also ensure URL can be null if needed
  items?: NavigationItemProps[];
};

export function NavigationItem({ item }: { item: NavigationItemProps }) {
  const { title, link, items } = item;

  return (
    <li className="list-none">
      {link ? (
        <Link
          href={link.url}
          className="text-blue-500 hover:underline font-semibold"
        >
          {title}
        </Link>
      ) : (
        <span className="font-semibold">{title}</span>
      )}
      {items && items.length > 0 && (
        <ul className="ml-4 space-y-1">
          {items.map((subItem, index) => (
            <NavigationItem
              key={`${subItem.title}-${subItem.link?.url || index}`}
              item={subItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { NavigationItem } from "./NavigationItem";
import { notFound } from "next/navigation";

export default async function Navigation() {
  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  if (!navigation) {
    notFound();
  }

  return (
    <nav>
      <ul className="space-y-4">
        {navigation.map((navItem) => (
          <NavigationItem
            key={navItem._id}
            item={navItem}
          />
        ))}
      </ul>
    </nav>
  );
}


// }
