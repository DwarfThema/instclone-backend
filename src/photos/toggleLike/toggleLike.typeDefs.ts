import { gql } from "apollo-server";

export default gql`
  type toggleLikeResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    toggleLike(id: Int!): toggleLikeResult
  }
`;
