import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
      { client }
    ) => {
      try {
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
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
            // hash password , hashing makes the passwork looks ugly
            // save and return the user
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "This username/password is already taken.",
        };
      }
    },
  },
};

export default resolvers;
