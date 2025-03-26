"use client";

import { useState } from "react";
import Link from "next/link";
import { stegaClean } from 'next-sanity'
import { ChevronDown } from "lucide-react";

type InternalLink = {
  _type: string;
  slug?: { current?: string };
  id?: string;
  _id?: string;
  background_color?: { hex?: string };  // Add background_color property
};

const getInternalLink = (internal: InternalLink): string => {
  console.log("Internal Link Data:", internal); // Debugging output

  if (!internal || !internal._type) return "#"; // Prevent errors

  const slug = internal.slug?.current || internal.id || internal._id;
  if (!slug) return "#"; // If no valid identifier, return "#"

  switch (internal._type) {
    case "post":
      return `/posts/${slug}`;
    case "media":
      return `/events/${slug}`;
    case "page":
      return `/page/${slug}`;
    case "category":
      return `/category/${slug}`;
    default:
      return "#"; // Fallback if type is unknown
  }
};

type MenuItem = {
  _key: string;
  label?: string;
  type?: "internal" | "external";
  internal?: InternalLink;  // Reuse the InternalLink type
  external?: string;
  _type?: "link" | "link.list";
  links?: MenuItem[];       
  link?: {                  
    label?: string;
    internal?: InternalLink;
    external?: string;
    background_color?: { hex?: string }; 
  };
  background_color?: { hex?: string };  // Add background_color here
};

export const Menu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex gap-6">
        {menuItems.map((item) => {
          console.log("Menu item:", item);  // Debug output

          // Try to access background color from multiple sources safely
          const linkBackground = 
            item.background_color?.hex ||                      // Directly on item
            item.internal?.background_color?.hex ||            // From internal link
            item.link?.background_color?.hex || "#fff";        // From link fallback

          return (
            <li key={item._key} className="relative">
              
              {/* Internal Link */}
              {item.type === "internal" && item.internal ? (
                <Link 
                  href={getInternalLink(item.internal)} 
                  style={{ background: linkBackground }}
                  className="text-blue-600 hover:underline p-2 rounded"
                >
                  {item.label}
                </Link>
              ) : 
              /* External Link */
              item.type === "external" && item.external ? (
                <a 
                  href={item.external} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ background: linkBackground }}
                  className="text-green-600 hover:underline p-2 rounded"
                >
                  {item.label}
                </a>
              ) : 
              /* Dropdown (Link List) */
              item._type === "link.list" ? (
                <DropdownMenu item={item} />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/** Dropdown Component */
const DropdownMenu = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("Dropdown item:", item); // Debug to confirm structure

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 text-gray-800 font-semibold hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
        key={item._key}
      >
        {item.link?.label || "Menu"}  
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg overflow-hidden">
          {item.links?.map((subItem) => (
            <li key={subItem._key} className="border-b last:border-none">
              {subItem.type === "internal" && subItem.internal ? (
                <Link href={getInternalLink(subItem.internal)} className="block px-4 py-2 hover:bg-gray-100">
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
