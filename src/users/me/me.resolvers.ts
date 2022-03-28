import client from "../../client";
import { Resolver, Resolvers } from "../../types";
import { protetedResolver } from "../users.utils";

const resolverFn: Resolver = (_, __, { loggedInUser }) => {
  client.user.findUnique({
    where: {
      id: loggedInUser.id,
    },
  });
};

const resolvers: Resolvers = {
  Query: {
    me: protetedResolver(resolverFn),
  },
};

export default resolvers;
