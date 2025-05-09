"use client";

import { useState } from "react";
import { mobileOverlayToggle } from "@/sanity/lib/utils";



export default function MobileHamburger(){
  return (
      <div className="mobile_menu_icon" id="menuToggle" onClick={mobileOverlayToggle}>
        <input type="checkbox" id="hamburger" />
          <label htmlFor="hamburger" className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </label>
      </div>
  );
};

