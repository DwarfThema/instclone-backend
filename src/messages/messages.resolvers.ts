import client from "../client";

export default {
  Room: {
    users: ({ id }) =>
      client.room
        .findUnique({
          where: {
            id,
          },
        })
        .users(),
    messages: ({ id }, { cursor }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id, // 로그인한 유저(내가) 생성하지 않은 Message
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) =>
      client.message
        .findUnique({
          where: {
            id,
          },
        })
        .user(),
  },
};
