import { LINK_QUERY, NAVIGATION_QUERY, SITE_SETTINGS } from '@/sanity/lib/queries'
import { SITE_SETTINGSResult } from '@/sanity/types'

import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live';



export default async function Menu() {
    const { data: items } = await sanityFetch({ query: SITE_SETTINGS });
	console.log(items, "hello")

	return (
		<nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden md:justify-center">
			{/* {headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return <div className="hover:link md:px-3" link={item} key={key}></div>

					case 'link.list':
						return <ul {...item} key={key} ></ul>

					default:
						return null
				}
			})} */}
		</nav>
	)
}

