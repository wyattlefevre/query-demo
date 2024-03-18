'use client'

import {
  useCreateComment,
  usePost,
  useUpdateComment,
} from '@/queries/blogQueries'
import { useState } from 'react'

function Page({ params }: { params: { id: string } }) {
  // Always put useState hooks at the top
  const [newComment, setNewComment] = useState<string>('')
  const [editComment, setEditComment] = useState<null | {
    id: string
    comment: string
  }>(null)
  const { loading, error, data } = usePost(params.id)
  const {
    createComment,
    loading: loadingComment,
    error: commentError,
  } = useCreateComment()
  const {
    updateComment,
    loading: loadingCommentUpdate,
    error: commentUpdateError,
  } = useUpdateComment()

  if (loading) {
    return <div>Loading post...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  console.log(data)
  return (
    <div>
      <p className="text-gray-500 text-sm pt-2">Post ID: {params.id}</p>
      <h1 className="text-xl font-bold">{data.post.title}</h1>
      <div className="pb-2">
        {data.post.comments.map((c) => (
          <div key={c.id}>
            {editComment?.id === c.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (editComment)
                    updateComment(editComment.id, editComment.comment).then(
                      () => {
                        setEditComment(null)
                      }
                    )
                }}
                className="flex justify-between"
              >
                <input
                  className="outline outline-1"
                  value={editComment?.comment}
                  onChange={(e) =>
                    setEditComment({ id: c.id, comment: e.target.value })
                  }
                  disabled={loadingCommentUpdate}
                />
                <div className="flex gap-1">
                  <button
                    type="submit"
                    className="bg-gray-100 px-1 hover:bg-green-300"
                    disabled={loadingCommentUpdate}
                  >
                    Update
                  </button>
                  <button className="bg-red-100 px-1 hover:bg-red-300">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between">
                <p>{c.comment}</p>
                <button
                  onClick={() =>
                    setEditComment({ id: c.id, comment: c.comment })
                  }
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr/>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createComment(params.id, newComment).then(() => setNewComment(''))
        }}
        className="flex justify-between py-2"
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
