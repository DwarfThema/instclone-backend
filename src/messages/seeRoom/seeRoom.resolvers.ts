import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { id }, { loggedInUser }) =>
  client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectedResolver(resolver),
  },
};

export default resolvers;
