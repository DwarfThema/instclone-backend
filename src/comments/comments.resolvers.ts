export default {
  comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser.id;
      }
    },
  },
};
