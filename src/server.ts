require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import * as logger from "morgan";

const PORT = process.env.PORT;

const startServer = async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        //우리가 users.utils.js에서 만든 getUser 유틸을 사용해서 유저가 누구인지 확인하자.
        // token: req.headers.token,
        //html 에서 보내는 headers 정보를 vsc에서 사용 할 수 있다. 우리는 token 정보를 이용하자.
        client
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apollo.start();
  const app = express();
  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());
  apollo.applyMiddleware({ app });
  await new Promise((func : any) => app.listen({ port: PORT }, func));
  console.log(
    `🤖 Server is Ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
};
startServer();
