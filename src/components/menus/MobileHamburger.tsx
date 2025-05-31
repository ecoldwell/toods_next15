"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileHamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    const mobileNav = document.getElementById("overlayToggleMenu");
    const mobileOverlay = document.getElementById("fixed_menu");
    
    if (mobileNav && mobileOverlay) {
      mobileNav.classList.toggle("menu_active");
      mobileOverlay.classList.toggle("mobile_overlay");
      setIsOpen(!isOpen);
    }
  };

  // Add click event listener to all navigation links
  if (typeof window !== 'undefined') {
    const navLinks = document.querySelectorAll('#overlayToggleMenu a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          router.push(href);
          // Close menu after navigation starts
          const mobileNav = document.getElementById("overlayToggleMenu");
          const mobileOverlay = document.getElementById("fixed_menu");
          if (mobileNav && mobileOverlay) {
            mobileNav.classList.remove("menu_active");
            mobileOverlay.classList.remove("mobile_overlay");
            setIsOpen(false);
          }
        }
      });
    });
  }

  return (
    <div className="mobile_menu_icon" id="menuToggle">
      <input 
        type="checkbox" 
        id="hamburger" 
        checked={isOpen} 
        onChange={toggleMenu}
      />
      <label htmlFor="hamburger" className="hamburger">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </label>
    </div>
  );
}
