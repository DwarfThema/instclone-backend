import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id, caption }, { loggedInUser }) => {
  const ok = await client.photo.findFirst({
    where: {
      id: id, //id로 해도 된다.
      userId: loggedInUser.id,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  const photo = await client.photo.update({
    where: {
      id,
    },
    data: {
      caption,
    },
  });
  console.log(photo);
};

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(resolverFn),
  },
};

export default resolvers;
