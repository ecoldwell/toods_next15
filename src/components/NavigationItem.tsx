import Link from 'next/link';

type NavigationItemProps = {
  label: string;
  url?: string;
  internal?: { slug: { current: string } };
  children?: NavigationItemProps[];
};

export function NavigationItem({ item }: { item: NavigationItemProps }) {
  const { label, url, internal, children } = item;

  const href = url ?? (internal ? `/${internal.slug.current}` : null);

  if (!label || !href) return null;

  return (
    <li className="relative group">
      <a
        href={href}
        target={url ? '_blank' : '_self'} // External links open in a new tab
        rel={url ? 'noopener noreferrer' : undefined}
        className="text-blue-500 hover:underline font-semibold"
      >
        {label}
      </a>
      {children && children.length > 0 && (
        <ul className="absolute hidden group-hover:block bg-white shadow-md">
          {children.map((child, index) => (
            <NavigationItem key={index} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
