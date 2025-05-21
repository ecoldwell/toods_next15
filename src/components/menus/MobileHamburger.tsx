"use client";

import { useState } from "react";

export default function MobileHamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Toggle clicked, current state:', isOpen);
    setIsOpen(!isOpen);
    
    const mobileNav = document.getElementById("overlayToggleMenu");
    const mobileOverlay = document.getElementById("fixed_menu");
    
    console.log('Found elements:', { mobileNav, mobileOverlay });
    
    if (mobileNav && mobileOverlay) {
      if (!isOpen) {
        console.log('Opening menu');
        mobileNav.classList.add("menu_active");
        mobileOverlay.classList.add("mobile_overlay");
      } else {
        console.log('Closing menu');
        mobileNav.classList.remove("menu_active");
        mobileOverlay.classList.remove("mobile_overlay");
      }
    }
  };

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
