"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


// type NavigationItemProps = {
//     title: string | null; // Allow title to be nullable
//     link?: { url: string | null }; // Also ensure URL can be null if needed
//   items?: NavigationItemProps[];
// };

// export function NavigationItem({ item }: { item: NavigationItemProps }) {
//   const { title, link, items } = item;

//   return (
//     <li className="list-none">
//       {link ? (
//         <Link
//           href={link.url}
//           className="text-blue-500 hover:underline font-semibold"
//         >
//           {title}
//         </Link>
//       ) : (
//         <span className="font-semibold">{title}</span>
//       )}
//       {items && items.length > 0 && (
//         <ul className="ml-4 space-y-1">
//           {items.map((subItem, index) => (
//             <NavigationItem
//               key={`${subItem.title}-${subItem.link?.url || index}`}
//               item={subItem}
//             />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

// type NavigationItemProps = {
//   title: string;
//   label: string | null; // Title can be null
//   link?: { url: string | null }; // Link can also be null
//   items?: NavigationItemProps[];
//   _key: string;
  
// };

// export function NavigationItem({ item }: { item: NavigationItemProps }): JSX.Element | null {
//   const { title, link, items } = item;
//   console.log(item, "helll")
 

//   if (!title) return null;

//   return (
//     <li className="list-none">
//       {link?.url ? (
//         <Link href={link.url} className="text-blue-500 hover:underline font-semibold">
//           {title}
//         </Link>
//       ) : (
//         <span className="font-semibold">{title}</span>
//       )}
//       {items && items.length > 0 ? (
//         <ul className="ml-4 space-y-1">
//           {items.map((subItem, index) => (
//             <NavigationItem
//               key={index}
//               item={subItem}
//             />
//           ))}
//         </ul>
//       ) : null}
//     </li>
//   );
// }


export const Menu = ({ menuItems }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex gap-6">
        {menuItems.map((item) => (
          <li key={item._key} className="relative">
            {/* Internal Link */}
            {item.type === "internal" && item.internal ? (
              <Link href={`/posts/${item.internal._key}`} className="text-blue-600 hover:underline">
                {item.label}
              </Link>
            ) : 
            /* External Link */
            item.type === "external" && item.external ? (
              <a href={item.external} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                {item.label}
              </a>
            ) : 
            /* Dropdown (Link List) */
            item._type === "link.list" ? (
              <DropdownMenu item={item} />
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

/** Dropdown Component */
export const DropdownMenu = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 text-gray-800 font-semibold hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.link.label} <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg overflow-hidden">
          {item.links.map((subItem, index) => (
            <li key={index} className="border-b last:border-none">
              {subItem.type === "internal" ? (
                <Link href={`/posts/${subItem.internal._key}`} className="block px-4 py-2 hover:bg-gray-100">
                  {subItem.label}
                </Link>
              ) : (
                <a href={subItem.external} className="block px-4 py-2 hover:bg-gray-100">
                  {subItem.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};