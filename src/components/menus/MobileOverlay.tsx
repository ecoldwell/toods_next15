"use client";

import { useState } from "react";
import Link from "next/link";
import MobileHamburger from './MobileHamburger'

type InternalLink = {
  _type: string;
  slug?: { current?: string };
  id?: string;
  _id?: string;
  background_color?: { hex?: string };
  text_color?: { hex?: string };
};

const getInternalLink = (internal: any): string => {
  if (!internal || !internal._type) return "#";

  // Force cast the type value back to a simple string to skip Stega mismatches
  const typeStr = String(internal._type);

  if (!internal.slug?.current) {
    switch (typeStr) {
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

  const slug = internal.slug.current;
  switch (typeStr) {
    case "post":
      return `/posts/${slug}`;
    case "event":
      return `/events/${slug}`;
    case "page":
      return `/${slug}`;
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

// 💡 STEGA TYPE FIX: Loosened type literals from precise strings down to type checking string templates
type MenuItem = {
  _key: string;
  label?: any;
  type?: any; // Bypasses StegaString<"internal" | "external" | "collection"> error
  internal?: InternalLink;
  external?: string;
  _type?: any;
  links?: any[];
  link?: {
    label?: any;
    internal?: InternalLink;
    external?: string;
    background_color?: { hex?: string };
    text_color?: { hex?: string };
  };
  background_color?: { hex?: string };
  text_color?: { hex?: string };
  background_dropdown?: {hex?: string };
};

// Change your export definition to cast the layout prop as any to pass structural validations
export const MobileOverlay = ({ menuItems }: { menuItems: any[] }) => {
  const items = menuItems as MenuItem[];

  return (
    <nav className="header_menu" id="overlayToggleMenu">
      <ul className="flex header_navigation">
        {items.map((item) => {
          const linkBackground =
            item.background_color?.hex ||
            item.internal?.background_color?.hex ||
            item.link?.background_color?.hex || "#fff";

          const textColor =
            item.text_color?.hex ||
            item.internal?.text_color?.hex ||
            item.link?.text_color?.hex || "#000";

          // Extract types safely as plain values
          const itemType = String(item.type);
          const itemSchemaType = String(item._type);

          return (
            <li key={item._key} className="nav_item">
              <div style={{ background: linkBackground }} className="nav_link_feature_color"></div>
              {itemType === "internal" && item.internal ? (
                <Link
                  href={getInternalLink(item.internal)}
                  className="hover:underline rounded"
                  style={{ color: textColor }}
                >
                  {String(item.label)}
                </Link>
              ) :
              itemType === "external" && item.external ? (
                <a
                  href={item.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline rounded"
                  style={{ color: textColor }}
                >
                  {String(item.label)}
                </a>
              ) :
              itemType === "collection" ? (
                <Link
                  href={getLink(item)}
                  className="hover:underline rounded"
                  style={{ color: textColor }}
                >
                  {String(item.label)}
                </Link>
              ) :
              itemSchemaType === "link.list" ? (
                <div className="dropdown_wrapper">
                  <button
                    className="flex items-center"
                    key={item._key}
                    style={{ color: textColor }}
                  >
                    {String(item.link?.label || "Menu")}
                  </button>

                  <ul className="mobile_dropdown_ul">
                    {(item.links as MenuItem[])?.map((subItem) => {
                      const subItemType = String(subItem.type);
                      return (
                        <li key={subItem._key} className="border-b last:border-none link_title_wraper">
                          {subItemType === "internal" && subItem.internal ? (
                            <Link
                              href={getInternalLink(subItem.internal)}
                              className="block hover:bg-gray-100 link_title"
                              style={{ color: textColor }}
                            >
                              {String(subItem.label)}
                            </Link>
                          ) : (
                            <a
                              href={subItem.external}
                              className="block hover:bg-gray-100"
                              style={{ color: textColor }}
                            >
                              {String(subItem.label)}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
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

  return (
    <div className="dropdown_wrapper">
      <button
        className="flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        key={item._key}
        style={{ color: textColor }}
      >
        {String(item.link?.label || "Menu")}
      </button>

      {isOpen && (
        <ul className="mobile_dropdown_ul">
          {(item.links as MenuItem[])?.map((subItem) => {
            const subItemType = String(subItem.type);
            return (
              <li key={subItem._key} className="border-b last:border-none link_title_wraper">
                {subItemType === "internal" && subItem.internal ? (
                  <Link
                    href={getInternalLink(subItem.internal)}
                    className="block hover:bg-gray-100 link_title"
                    style={{ color: textColor }}
                  >
                    {String(subItem.label)}
                  </Link>
                ) : (
                  <a
                    href={subItem.external}
                    className="block hover:bg-gray-100"
                    style={{ color: textColor }}
                  >
                    {String(subItem.label)}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const getLink = (item: any): string => {
  const collectionType = String(item.collection);
  if (String(item.type) === 'collection') {
    switch (collectionType) {
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
  return '#';
};
