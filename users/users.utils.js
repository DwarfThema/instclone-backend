import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    // await 를 아래에서 사용하니 어떤 문제가 생길지 모르니 try / catch 문을 사용해주는게 좋다.
    if (!token) {
      return null;
    }
    // token 이 없는 경우도 고려해줘야한다.
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    // verify 는 token 을 받고 token 이 true 면 verify한다.
    // veryfy 는 id와 Iat를 리턴하는데 그중에 Id만 받아와서 아래의 where id에게 아이디정보를 보낸다.
    const user = await client.user.findUnique({ where: { id } });
    // 위의 Id 로 user가 누군지 찾는 과정이다.
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
