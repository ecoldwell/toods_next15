import Link from 'next/link'
import Navigation from './HeaderMenu'
import LogoHeader from './DesktopLogo'
import FixedNavigation from './menus/FixedMenu'
import MobileHeader from './menus/MobileHeader'
import MobileHamburger from './menus/MobileHamburger'


export function Header() {
  return (
    <div className="header_wrapper" id="fixed_menu">
      <header className="og_header">
      <div className="desktop_nav_wrapper">
        <LogoHeader></LogoHeader>
        <Navigation></Navigation>
        {/* <MobileHamburger></MobileHamburger> */}
      </div>
      <MobileHeader></MobileHeader>
        


      </header>
    
              <FixedNavigation></FixedNavigation>

        
      {/* <ul className="flex items-center gap-4 font-semibold text-slate-700">
          <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/posts"
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/studio"
            >
              Sanity Studio
            </Link>
          </li>
        </ul> */}
    </div>
  )
}