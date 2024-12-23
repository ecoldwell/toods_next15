import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { NavigationItem } from "./NavigationItem";
import { notFound } from "next/navigation";

export default async function Navigation() {
  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  if (!navigation) {
    notFound();
  }

  return (
    <nav>
      <ul className="space-y-4">
        {navigation.map((navItem) => {
          console.log(navItem.items, "Items for", navItem.title, NavigationItem); // Debug items
          return (
            <NavigationItem
              key={navItem._id}
              item={{
                title: navItem.title ,
                items: navItem.items ?? [], // Ensure fallback to empty array
              }}
            />
          );
        })}
      </ul>
    </nav>
  );
}
