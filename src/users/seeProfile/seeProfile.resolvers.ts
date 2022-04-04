import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { userName }) =>
      client.user.findUnique({
        where: {
          userName,
        },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};

export default resolvers;
