import { POST_QUERYResult } from '@/sanity/types'

type Category = {
  _id: string;
  slug?: { current?: string };
  title?: string;
}

type CategoriesProps = {
  categories: Category[] | null | undefined;
}

export function Categories({ categories }: CategoriesProps) {
  if (!categories) return null;
  
  return categories.map((category) => (
    <span
      key={category._id}
      className="bg-cyan-50 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700"
    >
      {category.title}
    </span>
  ))
}