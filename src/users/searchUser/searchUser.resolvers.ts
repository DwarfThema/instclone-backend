import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }) =>
      client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};

export default resolvers;
