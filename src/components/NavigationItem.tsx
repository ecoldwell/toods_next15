import Link from "next/link";

type NavigationItemProps = {
  id: string;
  title: string | null; // Title can be null
  link?: { url: string | null }; // Link can also be null
  items?: NavigationItemProps[];
};

export function NavigationItem({ item }: { item: NavigationItemProps }): JSX.Element | null {
  const { id, title, link, items } = item;

  if (!title) return null;

  return (
    <li className="list-none">
      {link?.url ? (
        <Link href={link.url} className="text-blue-500 hover:underline font-semibold">
          {title}
        </Link>
      ) : (
        <span className="font-semibold">{title}</span>
      )}
      {items && items.length > 0 ? (
        <ul className="ml-4 space-y-1">
          {items.map((subItem, index) => (
            <NavigationItem
              key={`${subItem.title ?? "untitled"}-${subItem.link?.url || index}`}
              item={subItem}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}