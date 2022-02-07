import { gql } from "apollo-server-express";

export default gql`
  type seeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }
  type Query {
    seeFollowing(userName: String!, lastId: Int): seeFollowingResult!
  }
`;