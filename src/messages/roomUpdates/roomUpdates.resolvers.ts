import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW__MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (root, args, context, info) => {
  const room = await client.room.findUnique({
    where: {
      id: args.id,
    },
    select: {
      id: true,
    },
  });
  if (!room) {
    throw new Error("You shall not see this.");
  }
  return withFilter(
    () => pubsub.asyncIterator(NEW__MESSAGE),
    ({ roomUpdates }, { id }) => {
      return roomUpdates.roomId === id;
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    roomUpdates: {
      subscribe: resolverFn,
    },
  },
};
