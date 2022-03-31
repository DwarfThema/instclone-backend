import { gql } from "apollo-server";

export default gql`
  type CreateCommentResult {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createComment(photoId: Int!, payload: String!): CreateCommentResult
  }
`;
