import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = (_, { offset }, { loggedInUser }) =>
  client.photo.findMany({
    take: 2,
    skip: offset,
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        {
          userId: loggedInUser.id,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(resolverFn),
  },
};
export default resolvers;
