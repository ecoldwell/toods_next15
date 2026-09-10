"use client"

import { useState } from "react";
import Image from "next/image";

// 1. Separate Lightbox Component for individual images
export function LightboxImage({ src, alt, rawSrc }: { src: string; alt: string; rawSrc: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="post_image_wrapper cursor-zoom-in"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          width={400}
          height={400}
          alt={alt}
          className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.01]"
        />
      </div>

      {/* Lightbox Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button */}
          <button className="absolute top-6 right-6 text-white text-3xl font-light">&times;</button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <img
              src={rawSrc} // Renders a high-res full size image inside the modal
              alt={alt}
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
