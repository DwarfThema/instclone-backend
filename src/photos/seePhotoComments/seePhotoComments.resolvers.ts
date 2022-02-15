import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { id }) =>
      client.comment.findMany({
        where: { photoId: id },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};

export default resolvers;
