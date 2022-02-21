import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id, payload }, { loggedInUser }) => {
  const comment = await client.comment.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.comment.update({ where: { id }, data: { payload } });
    return {
      ok: true,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(resolverFn),
  },
};

export default resolvers;
