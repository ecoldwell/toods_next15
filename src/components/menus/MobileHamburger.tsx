"use client"

import { initFunction } from "@/sanity/lib/utils";

export default async function MobileHamburger() {



 

  return (
    <div className="mobile_header_container">
      {/* <div className="mobile_header"> */}
        {/* <LogoHeader></LogoHeader> */}
        <div className="mobile_menu_icon" id="menuToggle" onClick={initFunction}>
          <input type="checkbox" id="hamburger" />
          <label htmlFor="hamburger" className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </label>
         </div>
       {/* </div> */}

    
    </div>

  );
}