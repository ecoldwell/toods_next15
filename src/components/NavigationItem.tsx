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
  background_color?: { hex?: string };
  text_color?: { hex?: string };
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
  internal?: InternalLink;
  external?: string;
  _type?: "link" | "link.list";
  links?: MenuItem[];
  link?: {
    label?: string;
    internal?: InternalLink;
    external?: string;
    background_color?: { hex?: string };
    text_color?: { hex?: string };
  };
  background_color?: { hex?: string };
  text_color?: { hex?: string };
};

export const Menu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <nav className="">
      <ul className="flex header_navigation">
        {menuItems.map((item) => {
          const linkBackground = 
            item.background_color?.hex ||                      
            item.internal?.background_color?.hex ||            
            item.link?.background_color?.hex || "#fff";        

          const textColor = 
            item.text_color?.hex || 
            item.internal?.text_color?.hex || 
            item.link?.text_color?.hex || "#000";

          return (
            <li key={item._key} className="nav_item">
              <div style={{ background: linkBackground }} className="nav_link_feature_color"></div>
              {item.type === "internal" && item.internal ? (
                <Link 
                  href={getInternalLink(item.internal)} 
                  className="hover:underline p-2 rounded"
                  style={{ color: textColor }}
                >
                  {item.label}
                </Link>
              ) : 
              item.type === "external" && item.external ? (
                <a 
                  href={item.external} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline p-2 rounded"
                  style={{ color: textColor }}
                >
                  {item.label}
                </a>
              ) : 
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
  const textColor = 
    item.text_color?.hex || 
    item.internal?.text_color?.hex || 
    item.link?.text_color?.hex || "#000";

  console.log("Dropdown item:", item); // Debug to confirm structure

  return (
    <div className="dropdown_wrapper">
      <button
        className="flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        key={item._key}
        style={{ color: textColor }}
      >
        {item.link?.label || "Menu"}  
     
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg overflow-hidden">
          {item.links?.map((subItem) => (
            <li key={subItem._key} className="border-b last:border-none link_title_wraper">
              {subItem.type === "internal" && subItem.internal ? (
                <Link 
                  href={getInternalLink(subItem.internal)} 
                  className="block px-4 py-2 hover:bg-gray-100 link_title" 
                  style={{ color: textColor }}
                >
                  {subItem.label}
                </Link>
              ) : (
                <a 
                  href={subItem.external} 
                  className="block px-4 py-2 hover:bg-gray-100" 
                  style={{ color: textColor }}
                >
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
