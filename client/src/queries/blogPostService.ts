import { GET_POST_WITH_COMMENTS } from '@/graphql/posts'
import {useQuery } from '@apollo/client'

export function usePost(postId: string) {
  return useQuery(GET_POST_WITH_COMMENTS, { variables: { id: postId } })
}
