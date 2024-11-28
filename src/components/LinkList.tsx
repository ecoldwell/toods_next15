// import LinkList from '@/sanity/types'
// import { urlFor } from '@/sanity/lib/image'
// import Image from 'next/image'

// export default function LinkList({ link, links }: LinkList) {
// 	return (
// 		<div
// 			className="group relative"
// 			name="header"
// 			delay={10}
// 			closeAfterNavigate
// 		>
// 			<summary className="flex items-center gap-1 md:px-3">
// 				{link?.label}
// 				<span className="transition-transform group-open:rotate-90 md:rotate-90" />
// 			</summary>

// 			<ul className="anim-fade-to-b md:frosted-glass left-0 top-full px-3 py-2 max-md:border-l md:absolute md:min-w-max md:rounded md:border md:bg-canvas md:shadow-md">
// 				{links?.map((link, key) => (
// 					<li key={key}>
// 						<CTA
// 							className={cn(
// 								'hover:link inline-block py-px',
// 								link.external?.startsWith('http') && 'is-external',
// 							)}
// 							link={link}
// 						/>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	)
// }
