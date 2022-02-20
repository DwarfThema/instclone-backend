import { gql } from "apollo-server";

export default gql`
  type deleteCommentResoult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteComment(id: Int!): deleteCommentResoult!
  }
`;
