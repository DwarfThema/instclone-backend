import { withFilter } from "graphql-subscriptions";
import { NEW__MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW__MESSAGE),
        ({ roomUpdates }, { id }) => {
          return roomUpdates.roomId === id;
        }
      ),
    },
  },
};
