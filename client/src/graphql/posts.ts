import { gql } from "@apollo/client";

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
