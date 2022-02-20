import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
  const photo = await client.photo.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!photo) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  } else if (photo.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not autorized",
    };
  } else {
    await client.photo.delete({ where: { id } });
    return {
      ok: true,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(resolverFn),
  },
};

export default resolvers;
