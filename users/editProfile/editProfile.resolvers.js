import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password: newPassword },
      { token }
    ) =>
      //context는 graphql의 4번째 arg. 모든 resolver에서 접근가능한 정보를 넣을 수 있는 object : 여기 말고도 createAccout나 login 에서도 접근 가능하다는것
      //Constext의 정의는 appoloserver가 있는 server 에서 정의할 수 있음
      //위에서는 {token}의 obejct 정보를 갖고와서 여기서 사용된다.
      {
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        // verify 는 token 을 받고 token 이 true 면 verify한다.
        // veryfy 는 id와 Iat를 리턴하는데 그중에 Id만 받아와서 아래의 where id에게 아이디정보를 보낸다.
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
