import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn: Resolver = async (_, { userName }, { loggedInUser }) => {
  const checkUser = await client.user.findUnique({ where: { userName } });
  if (!checkUser) {
    return {
      ok: false,
      error: "That user dose not exist.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        disconnect: {
          userName,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(resolverFn),
  },
};

export default resolvers;
