import { SITE_SETTINGS } from '@/sanity/lib/queries';
import { SITE_SETTINGSResult } from '@/sanity/types';
import { sanityFetch } from '@/sanity/lib/live';
import { Key } from 'react';


const renderItems = (items: any[] | null) => {
    if (!items || items.length === 0) return <p>No navigation items available.</p>;

    return items.map((item, key) => {
        console.log('Item:', item); // Debug log for each item

        if (!item) return null;

        const { label, url, internal } = item;

        if (!label && !url && !internal) {
            // Skip items with no meaningful content
            return null;
        }

        if (item._type === 'link') {
            const linkLabel = label || internal?.title || 'Unnamed Link';
            const linkUrl = url || '#';

            return (
                <div className="hover:link md:px-3" key={key}>
                    <a href={linkUrl}>{linkLabel}</a>
                </div>
            );
        }

        if (item._type === 'link.list') {
            return (
                <ul key={key} className="link-list">
                    {item.links && item.links.length > 0 ? (
                        item.links.map((link: { label: any; internal: { title: any; }; url: string; }, i: Key | null | undefined) => {
                            console.log('Sub-link:', link); // Debug log for each sub-link
                            const subLinkLabel = link.label || link.internal?.title || 'Unnamed Sub-Link';
                            const subLinkUrl = link.url || '#';

                            return (
                                <li key={i}>
                                    <a href={subLinkUrl}>{subLinkLabel}</a>
                                </li>
                            );
                        })
                    ) : (
                        <li>No sub-links available.</li>
                    )}
                </ul>
            );
        }

        return <div key={key}>Unknown item type</div>;
    });
};

export default async function Menu() {
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS });

    console.log('Site Settings:', siteSettings); // Debug log for site settings

    if (!siteSettings) {
        return (
            <nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden md:justify-center">
                <p>Navigation data is not available.</p>
            </nav>
        );
    }

    console.log('Header Menu Items:', siteSettings.headerMenu?.items); // Debug log for header menu items
    console.log('Footer Menu Items:', siteSettings.footerMenu?.items); // Debug log for footer menu items

    return (
        <nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden md:justify-center">
            {siteSettings.headerMenu && (
                <div>
                    <h2>{siteSettings.headerMenu.title}</h2>
                    {renderItems(siteSettings.headerMenu.items)}
                </div>
            )}
            {siteSettings.footerMenu && (
                <div>
                    <h2>{siteSettings.footerMenu.title}</h2>
                    {renderItems(siteSettings.footerMenu.items)}
                </div>
            )}
        </nav>
    );
}
