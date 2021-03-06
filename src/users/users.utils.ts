import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

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

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const queryOk = (info.operation.operation = "query");
      if (queryOk) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please login to perform this action.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
// Resolver 자체를 받아서 graphql resolver 4가지 args를 받아서 거기서 검증과정을 거친뒤 리턴한다는 과정.

export function protetedResolver(ourResolver: Resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
}
