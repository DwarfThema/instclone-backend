import client from "../../client";
import { Resolver } from "../../types";
import { protetedResolver } from "../users.utils";

const resolverFn: Resolver = (_, __, { loggedInUser }) => {
  client.user.findUnique({
    where: {
      id: loggedInUser.id,
    },
  });
};

export default {
  Query: {
    me: protetedResolver(resolverFn),
  },
};
