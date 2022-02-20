import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protetedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
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
      error: "Not autorized",
    };
  } else {
    await client.comment.delete({
      where: { id },
    });
    return {
      ok: true,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protetedResolver(resolverFn),
  },
};

export default resolvers;
