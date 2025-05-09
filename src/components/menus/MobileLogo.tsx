import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { Logo } from '../blocks/Logo'
import { LOGO_QUERY } from "@/sanity/lib/queries";
import Link from 'next/link'


export default async function LogoHeader() {
  const { data: logos } = await sanityFetch({
    query: LOGO_QUERY,
  });
  console.log(logos?.logo, "end")
//   const headerNavigation = .headerMenu.items;
//   console.log(headerNavigation, "uycdgcgsucgcgcuyg")

if (!logos?.logo) {
    return <p>Logo not found</p>;
  }  


  return (
    <nav>
      <Link href="/">
      <Logo 
        default={logos.logo.default?.url}
        // removing this feature for now
        // light={logos.logo.light?.url}
        // dark={logos.logo.dark?.url}
      />
      </Link>

    </nav>
  );
}
