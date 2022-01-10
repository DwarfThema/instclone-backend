require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      //우리가 users.utils.js에서 만든 getUser 유틸을 사용해서 유저가 누구인지 확인하자.

      // token: req.headers.token,
      //html 에서 보내는 headers 정보를 vsc에서 사용 할 수 있다. 우리는 token 정보를 이용하자.
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => {
  console.log(`🤖 Server is Ready at http://localhost:${PORT}`);
});
