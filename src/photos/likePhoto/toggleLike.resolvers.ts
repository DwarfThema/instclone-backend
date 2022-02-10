import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, loggedInUser) => {
  const ok = await client.photo.findUnique({
    where: { id },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(resolverFn),
  },
};

export default resolvers;
