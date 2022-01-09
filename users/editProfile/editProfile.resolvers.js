export default {
  Mutation: {
    editProfile: (_, { firstName, lastName, userName, email, password }) =>
      console.log(firstName, lastName, userName, email, password),
  },
};
