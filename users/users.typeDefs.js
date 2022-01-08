import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
`;

/* Use 에는 패스워드는 해줄 필요가 없다. */
/* schema 를 새로 작성해주면 반드시 다시 Migrate 를 다시해줘야함 */
