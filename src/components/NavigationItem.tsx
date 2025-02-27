"use client";

import { useState } from "react";
import Link from "next/link";
import { stegaClean } from 'next-sanity'
import { ChevronDown } from "lucide-react";

const getInternalLink = (internal) => {
  console.log("Internal Link Data:", internal); // Debugging output

  if (!internal || !internal._type) return "#"; // Prevent errors

  // Ensure we are using `slug.current`
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


export const Menu = ({ menuItems }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex gap-6">
        {menuItems.map((item) => (
          <li key={item._key} className="relative">
            {/* Internal Link */}
            {item.type === "internal" && item.internal ? (
              <Link href={getInternalLink(item.internal)} className="text-blue-600 hover:underline">
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
const DropdownMenu = ({ item }) => {
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
          {item.links.map((subItem) => (
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

