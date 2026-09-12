import { defineQuery } from 'next-sanity'

export const NAV_QUERY =
  defineQuery(`*[_type == "navigation"]{
  title,
  items[] {
    ...,
    internal->{ _type, title, metadata, _key },
    link {
      ...,
      internal->{ _type, title, metadata, _key },
    },
    links[] {
      ...,
      internal->{ _type, title, metadata, _key }
    }
  }
}`)

export const SITE_QUERY =
  defineQuery(`*[_type == "site"][0]{
  ...,
  headerMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
      link {
        ...,
        internal->{ _type, title, metadata, _key },
      },
      links[] {
        ...,
        internal->{ _type, title, metadata, _key }
      }
    } },
  fixedMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
      link {
        ...,
        internal->{ _type, title, metadata, _key },
      },
      links[] {
        ...,
        internal->{ _type, title, metadata, _key }
      }
    } },
  footerMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
      link {
        ...,
        internal->{ _type, title, metadata, _key },
      },
      links[] {
        ...,
        internal->{ _type, title, metadata, _key }
      }
    } },
  socialMenu->{  title,
    items[] {
      ...,
      internal->{ _type, title, metadata, _key },
      link {
        ...,
        internal->{ _type, title, metadata, _key },
      },
      links[] {
        ...,
        internal->{ _type, title, metadata, _key }
      }
    } },
}`)

export const HEADER_MENU =
  defineQuery(`*[_type == "site"][0] {
    _id,
    _type,
    title,
    headerMenu {
      _key,
      ...@->{_id, title, slug, items[]{
        ...,
        _key,
        _type,
        label,
        background_color,
        external,
        internal->{
          _type,
          title,
          name,
          metadata,
          _key,
          _id,
          slug
        },
        links[] {
          ...,
          _key,
          _type,
          label,
          background_color,
          external,
          internal->{
            _type,
            title,
            name,
            metadata,
            _key,
            _id,
            slug,
            label
          }
        }
      }}
    }
  }`)

export const MOBILE_MENU =
  defineQuery(`*[_type == "site"][0] {
  mobileMenu{
    _key,
    ...@->{_id, title, slug, items[]{
      ...,
      _key,
      _type,
      label,
      background_color,
      external,
      internal->{
        _type,
        title,
        name,
        metadata,
        _key,
        _id,
        slug
      },
      links[] {
        ...,
        _key,
        _type,
        label,
        background_color,
        external,
        internal->{
          _type,
          title,
          name,
          metadata,
          _key,
          _id,
          slug,
          label
        }
      }
    }}
  }
}`)
export const FIXED_MENU =
defineQuery(`*[_type == "site" && _id == "site"][0] {
  _id,
  _type,
  title,
  fixedMenu{
    _key,
    ...@->{_id, title, slug, items[]{
      ...,
      _key,
      _type,
      label,
      background_color,
      external,
      internal->{
        _type,
        title,
        name,
        metadata,
        _key,
        _id,
        slug
      },
      links[] {
        ...,
        _key,
        _type,
        label,
        background_color,
        external,
        internal->{
          _type,
          title,
          name,
          metadata,
          _key,
          _id,
          slug,
          label
        }
      },
      background_dropdown,
    }}
  }
}`)

export const FOOTER_MENU =
defineQuery(`*[_type == "site" && _id == "site"][0] {
  _id,
  _type,
  title,
  footerMenu{
    _key,
    ...@->{_id, title, slug, items[]{
      ...,
      _key,
      _type,
      label,
      background_color,
      external,
      internal->{
        _type,
        title,
        name,
        metadata,
        _key,
        _id,
        slug
      },
      links[] {
        ...,
        _key,
        _type,
        label,
        background_color,
        external,
        internal->{
          _type,
          title,
          name,
          metadata,
          _key,
          _id,
          slug,
          label
        }
      },
      background_dropdown,
    }}
  }
}`)
