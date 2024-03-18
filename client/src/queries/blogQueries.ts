import { useMutation, useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`

export function usePosts() {
  return useQuery(GET_POSTS)
}

export const CREATE_POST = gql`
  mutation CreatePost($title: String!) {
    addPost(title: $title) {
      id
    }
  }
`
export function useCreatePost() {
  const [mutate, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS],
  })
  const createPost = async (title: string) => {
    mutate({ variables: { title } })
  }
  return { createPost, loading, error }
}

export const GET_POST_WITH_COMMENTS = gql`
  query GetPostWithComments($id: ID!) {
    post(id: $id) {
      id
      title
      comments {
        id
        comment
      }
    }
  }
`
export function usePost(postId: string) {
  return useQuery(GET_POST_WITH_COMMENTS, { variables: { id: postId } })
}

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      id
      comment
    }
  }
`

export function useCreateComment() {
  const [mutate, { loading, error }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [GET_POST_WITH_COMMENTS],
  })
  const createComment = async (postId: string, commentText: string) => {
    mutate({ variables: { postId: postId, comment: commentText } })
  }
  return { createComment, loading, error }
}

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: ID!, $updatedComment: String!) {
    updateComment(commentId: $commentId, updatedComment: $updatedComment) {
      id
      comment
    }
  }
`

export function useUpdateComment() {
  const [mutate, { loading, error }] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [GET_POST_WITH_COMMENTS],
  })
  const updateComment = async (commentId: string, updatedComment: string) => {
    mutate({ variables: { commentId, updatedComment } })
  }
  return { updateComment, loading, error }
}
