'use client'

import { usePosts } from '@/queries/blogQueries'
import Link from 'next/link'

export default function Home() {
  const { data, loading, error } = usePosts()
  return (
    <main>
      <h1 className="text-lg pt-2 font-semibold">Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>Errror: {error.message}</p>}
      <ul>
        {data &&
          data?.posts?.map((p) => (
            <Link href={`/posts/${p.id}`} key={p.id}>
              <li className="hover:bg-gray-300">{p.title}</li>
            </Link>
          ))}
      </ul>
    </main>
  )
}
