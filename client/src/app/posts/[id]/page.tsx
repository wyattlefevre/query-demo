'use client'

import { useCreateComment, usePost } from '@/queries/blogQueries'
import { useState } from 'react'

function Page({ params }: { params: { id: string } }) {
  // Always put useState hooks at the top
  const [newComment, setNewComment] = useState<string>('')
  const { loading, error, data } = usePost(params.id)
  const {
    createComment,
    loading: loadingComment,
    error: commentError,
  } = useCreateComment()

  if (loading) {
    return <div>Loading post...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <p className="text-gray-500 py-2">Post Page {params.id}</p>
      <h1 className="text-xl font-bold">{data.post.title}</h1>
      <div className="py-2">
        {data.post.comments.map((c) => (
          <p key={c.id}>{c.comment}</p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createComment(params.id, newComment).then(() => setNewComment(''))
        }}
        className="flex gap-2"
      >
        <input
          className="outline outline-1"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loadingComment}
        />
        <button
          type="submit"
          className="bg-gray-100 px-1 hover:bg-blue-300"
          disabled={loadingComment}
        >
          Post Comment
        </button>
      </form>
      {error && (
        <p className="text-red-700">Comment error: {commentError?.message}</p>
      )}
    </div>
  )
}

export default Page
