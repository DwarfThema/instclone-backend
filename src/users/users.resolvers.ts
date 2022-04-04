import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user
        .findUnique({ where: { userName: loggedInUser.userName } })
        .following({ where: { id } });

      //return exists.length !== 0;

      const countExists = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(countExists);
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};

export default resolvers;
