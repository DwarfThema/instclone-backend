import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password: newPassword, token }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      // verify 는 token 을 받고 token 이 true 면 verify한다.
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(uglyPassword && { password: uglyPassword }),
          //uglyPassword가 true 면 Password = uglyPassword 한다. ...은 중괄호를 풀어주는 역할.
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update profile",
        };
      }
    },
  },
};
