import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      // check if userName or email are already on DB.
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              userName,
            },
            {
              email,
            },
          ],
        },
      });
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
      // hash password , hashing makes the passwork looks ugly
      // save and return the user
    },
  },
};
