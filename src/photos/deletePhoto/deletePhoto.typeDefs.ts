import { gql } from "apollo-server";

export default gql`
  type deletePhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deletePhoto(id: Int): deletePhotoResult!
  }
`;
