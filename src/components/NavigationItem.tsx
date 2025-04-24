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
  if (!internal || !internal._type) return "#";

  // If there's no slug, it's a link to the index page
  if (!internal.slug?.current) {
    switch (internal._type) {
      case "artist":
        return "/artists";
      case "platform":
        return "/platforms";
      case "synchronization":
        return "/synchronizations";
      default:
        return "#";
    }
  }

  // Otherwise, link to the specific item
  const slug = internal.slug.current;
  switch (internal._type) {
    case "post":
      return `/posts/${slug}`;
    case "event":
      return `/events/${slug}`;
    case "page":
      return `/page/${slug}`;
    case "category":
      return `/category/${slug}`;
    case "artist":
      return `/artists/${slug}`;
    case "platform":
      return `/platforms/${slug}`;
    case "synchronization":
      return `/synchronizations/${slug}`;
    default:
      return "#";
  }
};

type MenuItem = {
  _key: string;
  label?: string;
  type?: "internal" | "external" | "collection";
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
  background_dropdown?: {hex?: string };
};

export const Menu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <nav className="header_menu">
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
              item.type === "collection" ? (
                <Link 
                  href={getLink(item)} 
                  className="hover:underline p-2 rounded"
                  style={{ color: textColor }}
                >
                  {item.label}
                </Link>
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

    const dropdownBackground = 
    item.background_dropdown?.hex || "#000";                          

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
        <ul className="dropdown_ul" style={{ background: dropdownBackground }}>
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

const getLink = (item: any): string => {
  if (item.type === 'collection') {
    switch (item.collection) {
      case 'artists':
        return '/artists';
      case 'platforms':
        return '/platforms';
      case 'synchronizations':
        return '/synchronizations';
      default:
        return '#';
    }
  }

  if (item.type === 'internal' && item.internal) {
    return getInternalLink(item.internal);
  }

  if (item.type === 'external' && item.external) {
    return item.external;
  }

  return '#';
};
