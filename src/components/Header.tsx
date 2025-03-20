import Link from 'next/link'
import Navigation from './LinkList'
import LogoHeader from './DesktopLogo'

export function Header() {
  return (
    <div className="header_wrapper">
      <header className="og_header">
        <LogoHeader></LogoHeader>
        <Navigation></Navigation>
      </header>
      <ul className="flex items-center gap-4 font-semibold text-slate-700">
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
        </ul>
    </div>
  )
}