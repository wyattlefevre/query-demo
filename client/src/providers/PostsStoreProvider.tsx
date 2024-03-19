'use client'
import { createContext, Dispatch, useContext, useReducer } from 'react'
import { Post } from '@/types/Post'

export enum PostActionTypes {
  setPost,
  setPostResponse,
}

export interface PostAction {
  type: PostActionTypes
  payload: any // AVOID THIS! Leads to unreliable types
}

export type PostState = {
  post: Post
  postResponse: {
    responseCode: string
    errorMessage: string
    post: Post
  }
}

export const emptyPost: Post = {
  title: '',
  comments: [],
}

export const emptyPostState: PostState = {
  post: emptyPost,
  postResponse: {
    responseCode: '',
    errorMessage: '',
    post: {
      title: '',
      comments: [],
    },
  },
}

function postStateReducer(state: PostState, action: PostAction) {
  switch (action.type) {
    case PostActionTypes.setPost: {
      return { ...state, post: action.payload }
    }
    case PostActionTypes.setPostResponse: {
      return {
        ...state,
        post: action.payload.loadSheet,
        postResponse: action.payload,
      }
    }
  }
}

export interface PostStoreProviderProps {
  children: React.ReactNode
  initializeFromStorage: boolean
}

export function PostStoreProvider(props: PostStoreProviderProps) {
  const [state, dispatch] = useReducer(postStateReducer, emptyPostState)

  return (
    <PostStoreContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        {props.children}
      </PostDispatchContext.Provider>
    </PostStoreContext.Provider>
  )
}

export const PostStoreContext = createContext<PostState>(emptyPostState)
export const PostDispatchContext = createContext<Dispatch<PostAction>>(
  (value: PostAction) => undefined
)

export function usePostStore() {
  return useContext(PostStoreContext)
}

export function usePostStoreDispatch() {
  return useContext(PostDispatchContext)
}
