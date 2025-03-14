import Link from 'next/link'
import Navigation from './LinkList'
import { Logo } from './blocks/Logo'
export function Header() {
  return (
    <div className="from-pink-50 to-white bg-gradient-to-b p-6">
      <header className="og_header">
        <Link
          className="text-pink-700 md:text-xl font-bold tracking-tight"
          href="/"
        >
          Toodinator
        </Link>
        <Navigation></Navigation>
        <Logo></Logo>
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
      </header>
    </div>
  )
}