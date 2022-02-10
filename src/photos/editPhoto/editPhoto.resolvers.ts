import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn: Resolver = async (_, { id, caption }, { loggedInUser }) => {
  const oldPhoto = await client.photo.findFirst({
    where: {
      id: id, //id로 해도 된다.
      userId: loggedInUser.id,
    },
    include: {
      hashtag: {
        select: {
          hashtag: true,
        },
      },
    },
  });
  if (!oldPhoto) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  await client.photo.update({
    where: {
      id,
    },
    data: {
      caption,
      hashtag: {
        disconnect: oldPhoto.hashtag,
        connectOrCreate: processHashtags(caption),
      },
    },
  });
  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(resolverFn),
  },
};

export default resolvers;
