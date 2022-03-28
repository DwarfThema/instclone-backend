import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { userName, password }, { client }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { userName } });
      //findFirst 는 필터에 적용되는 첫번째 UserName을 찾아준다.
      if (!user) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
          //throw 와는 다르게 throw 는 생성되는순간 모든걸 다 폭파시키는 느낌이라면 이건 error를 보여줄 수 있는 느낌.
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      // compare는 2가지 args를 받는데 첫번째는 패스워드(유저가 로그인할 때 보내는것) / 두번째는 encrtypedpassword(암호화된 패스워드) 이다.
      if (!passwordOk) {
        return {
          ok: false,
          error: "패스워드가 맞지 않습니다.",
        };
      }
      // check password with args.password
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      // SECRET_KEY는 Private key이다. 이걸 이용해서 sing을 할 수 있다. 이 키가 있어야지 사인된 정보를 식별할 수 있고, 토큰의 만들어지는 키의 방식도 확인 할 수 있다.
      // 첫번째 arg인 payload는 아무나 다 봐도 상관없는걸 넣으면 된다.
      return {
        ok: true,
        token,
      };

      // issue a tocken and send it to the user
    },
  },
};

export default resolvers;
