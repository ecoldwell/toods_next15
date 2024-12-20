/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Media = {
  _id: string;
  _type: "media";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  eventType?: "in-person" | "virtual";
  date?: string;
  doorsOpen?: number;
  venue?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "venue";
  };
  headline?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "artist";
  };
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  details?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  tickets?: string;
};

export type Artist = {
  _id: string;
  _type: "artist";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
};

export type Venue = {
  _id: string;
  _type: "venue";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
};

export type SiteConfig = {
  _id: string;
  _type: "siteConfig";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  headerMenu?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "navigation";
  };
  footerMenu?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "navigation";
  };
  social?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "navigation";
  };
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  favIcon?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  displayLastUpdated?: boolean;
};

export type Navigation = {
  _id: string;
  _type: "navigation";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  items?: Array<{
    _key: string;
  } & Link | {
    _key: string;
  } & LinkList>;
};

export type LinkList = {
  _type: "link.list";
  link?: Link;
  links?: Array<{
    _key: string;
  } & Link>;
};

export type Link = {
  _type: "link";
  label?: string;
  type?: "internal" | "external";
  internal?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "post";
  } | {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "category";
  };
  external?: string;
  params?: string;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  publishedAt?: string;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  relatedPosts?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "post";
  }>;
};

export type Author = {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  bio?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  description?: string;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _type: "image";
  _key: string;
}>;

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Media | Artist | Venue | SiteConfig | Navigation | LinkList | Link | Post | Author | Category | Slug | BlockContent | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/lib/queries.ts
// Variable: POSTS_QUERY
// Query: *[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{  _id,  title,  slug,  body,  mainImage,  publishedAt,  "categories": coalesce(    categories[]->{      _id,      slug,      title    },    []  ),  author->{    name,    image  }}
export type POSTS_QUERYResult = Array<{
  _id: string;
  title: string | null;
  slug: Slug | null;
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }> | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  publishedAt: string | null;
  categories: Array<{
    _id: string;
    slug: Slug | null;
    title: string | null;
  }> | Array<never>;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  } | null;
}>;
// Variable: POSTS_SLUGS_QUERY
// Query: *[_type == "post" && defined(slug.current)]{   "slug": slug.current}
export type POSTS_SLUGS_QUERYResult = Array<{
  slug: string | null;
}>;
// Variable: POST_QUERY
// Query: *[_type == "post" && slug.current == $slug][0]{  _id,  title,  body,  mainImage,  publishedAt,  "categories": coalesce(    categories[]->{      _id,      slug,      title    },    []  ),  author->{    name,    image  },  relatedPosts[]{    _key, // required for drag and drop    ...@->{_id, title, slug} // get fields from the referenced post  }}
export type POST_QUERYResult = {
  _id: string;
  title: string | null;
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }> | null;
  mainImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  publishedAt: string | null;
  categories: Array<{
    _id: string;
    slug: Slug | null;
    title: string | null;
  }> | Array<never>;
  author: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
  } | null;
  relatedPosts: Array<{
    _key: string;
    _id: string;
    title: string | null;
    slug: Slug | null;
  }> | null;
} | null;
// Variable: LINK_QUERY
// Query: *[_type == 'link']{	...,	internal->{ _type, title, metadata }  }
export type LINK_QUERYResult = Array<never>;
// Variable: NAVIGATION_QUERY
// Query: *[_type == 'navigation']{title,  _id,  items[] {		LINK_QUERY,		link{ LINK_QUERY },		links[]{ LINK_QUERY }  }}
export type NAVIGATION_QUERYResult = Array<{
  title: string | null;
  _id: string;
  items: Array<{
    LINK_QUERY: null;
    link: null;
    links: null;
  } | {
    LINK_QUERY: null;
    link: {
      LINK_QUERY: null;
    } | null;
    links: Array<{
      LINK_QUERY: null;
    }> | null;
  }> | null;
}>;
// Variable: SITE_SETTINGS
// Query: *[_type == 'siteConfig'][0]{    ...,    headerMenu->{       title,      _id,      items[] {        label,        url,        internal->{ _type, title, metadata }      }    },    footerMenu->{       title,      _id,      items[] {        label,        url,        internal->{ _type, title, metadata }      }    },    social->{       title,      _id,      items[] {        label,        url,        internal->{ _type, title, metadata }      }    },    'ogimage': ogimage.asset->url  }
export type SITE_SETTINGSResult = {
  _id: string;
  _type: "siteConfig";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  headerMenu: {
    title: string | null;
    _id: string;
    items: Array<{
      label: null;
      url: null;
      internal: null;
    } | {
      label: string | null;
      url: null;
      internal: {
        _type: "category";
        title: string | null;
        metadata: null;
      } | {
        _type: "post";
        title: string | null;
        metadata: null;
      } | null;
    }> | null;
  } | null;
  footerMenu: {
    title: string | null;
    _id: string;
    items: Array<{
      label: null;
      url: null;
      internal: null;
    } | {
      label: string | null;
      url: null;
      internal: {
        _type: "category";
        title: string | null;
        metadata: null;
      } | {
        _type: "post";
        title: string | null;
        metadata: null;
      } | null;
    }> | null;
  } | null;
  social: {
    title: string | null;
    _id: string;
    items: Array<{
      label: null;
      url: null;
      internal: null;
    } | {
      label: string | null;
      url: null;
      internal: {
        _type: "category";
        title: string | null;
        metadata: null;
      } | {
        _type: "post";
        title: string | null;
        metadata: null;
      } | null;
    }> | null;
  } | null;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  favIcon?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  displayLastUpdated?: boolean;
  ogimage: null;
} | null;
// Variable: MEDIAHOME_QUERY
// Query: *[  _type == "media"  && defined(slug.current)]{_id, name, slug, date}|order(date desc)
export type MEDIAHOME_QUERYResult = Array<{
  _id: string;
  name: string | null;
  slug: Slug | null;
  date: string | null;
}>;
// Variable: MEDIA_QUERY
// Query: *[  _type == "media" &&  slug.current == $slug][0]{...,"date": coalesce(date, now()),"doorsOpen": coalesce(doorsOpen, 0),headline->,venue->}
export type MEDIA_QUERYResult = {
  _id: string;
  _type: "media";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  eventType?: "in-person" | "virtual";
  date: string;
  doorsOpen: number | 0;
  venue: {
    _id: string;
    _type: "venue";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
  } | null;
  headline: {
    _id: string;
    _type: "artist";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
  } | null;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  details?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  tickets?: string;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"post\" && defined(slug.current)]|order(publishedAt desc)[0...12]{\n  _id,\n  title,\n  slug,\n  body,\n  mainImage,\n  publishedAt,\n  \"categories\": coalesce(\n    categories[]->{\n      _id,\n      slug,\n      title\n    },\n    []\n  ),\n  author->{\n    name,\n    image\n  }\n}": POSTS_QUERYResult;
    "*[_type == \"post\" && defined(slug.current)]{ \n  \"slug\": slug.current\n}": POSTS_SLUGS_QUERYResult;
    "*[_type == \"post\" && slug.current == $slug][0]{\n  _id,\n  title,\n  body,\n  mainImage,\n  publishedAt,\n  \"categories\": coalesce(\n    categories[]->{\n      _id,\n      slug,\n      title\n    },\n    []\n  ),\n  author->{\n    name,\n    image\n  },\n  relatedPosts[]{\n    _key, // required for drag and drop\n    ...@->{_id, title, slug} // get fields from the referenced post\n  }\n}": POST_QUERYResult;
    "*[_type == 'link']{\n\t...,\n\tinternal->{ _type, title, metadata }\n  }": LINK_QUERYResult;
    "*[_type == 'navigation']{\ntitle,\n  _id,\n  items[] {\n\t\tLINK_QUERY,\n\t\tlink{ LINK_QUERY },\n\t\tlinks[]{ LINK_QUERY }\n\n  }\n}": NAVIGATION_QUERYResult;
    "*[_type == 'siteConfig'][0]{\n    ...,\n    headerMenu->{ \n      title,\n      _id,\n      items[] {\n        label,\n        url,\n        internal->{ _type, title, metadata }\n      }\n    },\n    footerMenu->{ \n      title,\n      _id,\n      items[] {\n        label,\n        url,\n        internal->{ _type, title, metadata }\n      }\n    },\n    social->{ \n      title,\n      _id,\n      items[] {\n        label,\n        url,\n        internal->{ _type, title, metadata }\n      }\n    },\n    'ogimage': ogimage.asset->url\n  }": SITE_SETTINGSResult;
    "*[\n  _type == \"media\"\n  && defined(slug.current)\n]{_id, name, slug, date}|order(date desc)": MEDIAHOME_QUERYResult;
    "*[\n  _type == \"media\" &&\n  slug.current == $slug\n][0]{\n...,\n\"date\": coalesce(date, now()),\n\"doorsOpen\": coalesce(doorsOpen, 0),\nheadline->,\nvenue->\n}": MEDIA_QUERYResult;
  }
}
