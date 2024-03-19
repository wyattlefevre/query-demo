import { PostActionTypes, emptyPostState, usePostStore, usePostStoreDispatch } from '@/providers/PostsStoreProvider'
import { CREATE_COMMENT, usePost } from '@/queries/blogQueries'
import { Post } from '@/types/Post'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

function PostViewBad({ id }: { id: string }) {
  // Always put useState hooks at the top
  const [newComment, setNewComment] = useState<string>('')
  const [post, setPost] = useState<Post>(emptyPostState.post)
  const [commentCount, setCommentCount] = useState<number>(0)
  const store = usePostStore()
  const dispatch = usePostStoreDispatch()
  const { loading, error, data } = usePost(id)
  const [
    createCommentMutate,
    { loading: loadingCreateComment, error: createCommentError, data: commentData },
  ] = useMutation(CREATE_COMMENT)

  useEffect(() => {
    if(store.post) {
      setPost(store.post)
    }
  }, [store])

  useEffect(() => {
    const newPost = data?.post
    if (newPost) {
      setPost(newPost)
      dispatch({type: PostActionTypes.setPost, payload: newPost})
    }
  }, [data])

  useEffect(() => {
    if (post) {
      setCommentCount(post.comments.length)
    }
  }, [post])

  useEffect(() => {
    const newPost = commentData?.addComment?.post
    if (newPost) {
      setPost(newPost)
      dispatch({type: PostActionTypes.setPost, payload: newPost})
    }
  }, [commentData])

  if (loading) {
    return <div>Loading post...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <p className="text-gray-500 text-sm pt-2">Post ID: {id}</p>
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-xs">Comments ({commentCount})</p>
      <div className="pb-2">
        {post.comments.map((c) => (
          <div key={c.id}>
            <div className="flex justify-between">
              <p>{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createCommentMutate({
            variables: { postId: id, comment: newComment },
          }).then(() => setNewComment(''))
        }}
        className="flex justify-between py-2"
      >
        <input
          className="outline outline-1"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loadingCreateComment}
        />
        <button
          type="submit"
          className="bg-gray-100 px-1 hover:bg-blue-300"
          disabled={loadingCreateComment}
        >
          Post Comment
        </button>
      </form>
      {error && (
        <p className="text-red-700">
          Comment error: {createCommentError?.message}
        </p>
      )}
    </div>
  )
}

export default PostViewBad
