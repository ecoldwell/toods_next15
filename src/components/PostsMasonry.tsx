// components/PostsMasonry.tsx
"use client";

import { PostCard } from "@/components/PostCard";
import Masonry from 'react-masonry-css';

type Post = {
  _id: string;
  [key: string]: unknown;
};

interface PostsMasonryProps {
  posts: Post[];
}

const breakpointColumnsObj = {
  default: 3,
  // 1700: 3,
  1500: 2,
  700: 1,
  500: 1
};

export function PostsMasonry({ posts }: PostsMasonryProps) {
  return (
  <main className = "masonry-container-wrapper">
 <Masonry
  breakpointCols={breakpointColumnsObj}
  className="masonry-container"
  columnClassName="masonry-column"
>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
      </Masonry>
  </main>
  );
}
