import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver, protetedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { id }, { loggedInUser }) => {
  const message = await client.message.findFirst({
    where: {
      id,
      userId: {
        not: loggedInUser.id,
      },
      room: {
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (!message) {
    return {
      ok: false,
      error: "Message not found",
    };
  }
  await client.message.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protetedResolver(resolver),
  },
};

export default resolvers;
