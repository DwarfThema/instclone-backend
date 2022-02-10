import { gql } from "apollo-server";

export default gql`
  type toggleLikesult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    toggleLike(id: Int!): toggleLikeResult
  }
`;
