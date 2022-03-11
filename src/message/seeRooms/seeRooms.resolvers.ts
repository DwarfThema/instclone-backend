import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, __, { loggedInUser }) =>
  await client.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(resolver),
  },
};

export default resolvers;
