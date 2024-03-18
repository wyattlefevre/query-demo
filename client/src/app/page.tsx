'use client'

import { useCreatePost, usePosts } from '@/queries/blogQueries'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [newTitle, setNewTitle] = useState<string>('')
  const { data, loading, error } = usePosts()
  const { createPost, loading: loadingNewPost, error: newPostError } = useCreatePost()
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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPost(newTitle).then(() => setNewTitle(''))
        }}
        className="flex gap-2 py-2"
      >
        <input
          className="outline outline-1"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={loadingNewPost}
        />
        <button
          type="submit"
          className="bg-gray-100 px-1 hover:bg-blue-300"
          disabled={loadingNewPost}
        >
          Create Post
        </button>
      </form>
    </main>
  )
}
