import Link from 'next/link'
import FooterNavigation from './menus/FooterMenu'

export function Footer() {
  return (
    <div className="container" id="footer_menu">
              <FooterNavigation></FooterNavigation>
    </div>
  )
}