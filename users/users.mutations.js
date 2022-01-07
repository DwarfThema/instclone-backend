import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
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
          throw new Error("This username/password is already taken.");
        }
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
      } catch (e) {
        return e;
      }
    },
    login: async (_, { userName, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { userName } });
      //findFirst 는 필터에 적용되는 첫번째 UserName을 찾아준다.
      if (!user) {
        return {
          ok: false,
          error: "User not found",
          //throw 와는 다르게 throw 는 생성되는순간 모든걸 다 폭파시키는 느낌이라면 이건 error를 보여줄 수 있는 느낌.
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      // compare는 2가지 args를 받는데 첫번째는 패스워드(유저가 로그인할 때 보내는것) / 두번째는 encrtypedpassword(암호화된 패스워드) 이다.
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      // check password with args.password
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };

      // issue a tocken and send it to the user
    },
  },
};
