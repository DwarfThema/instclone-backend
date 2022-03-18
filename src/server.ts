require("dotenv").config();
import express from "express";
import client from "./client";
import logger from "morgan";

import { typeDefs, resolvers } from "./schema";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { getUser } from "./users/users.utils";
import pubsub from "./pubsub";

import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

const PORT = process.env.PORT;

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const startServer = async () => {
  const apollo = new ApolloServer({
    schema,
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
          //우리가 users.utils.js에서 만든 getUser 유틸을 사용해서 유저가 누구인지 확인하자.
          // token: req.headers.token,
          //html 에서 보내는 headers 정보를 vsc에서 사용 할 수 있다. 우리는 token 정보를 이용하자.
          client,
        };
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await apollo.start();
  //app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());
  apollo.applyMiddleware({ app });

  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({ token }: { token?: string }, webSoket, context) => {
        if (!token) {
          throw new Error("You can't listen.");
        }
        console.log("onConnect!");
        const loggedInUser = await getUser(token);
        return {
          loggedInUser,
        };
      },
      onDisconnect(webSokent, context) {
        console.log("onDisconnect!");
      },
    },
    {
      server: httpServer,
      path: apollo.graphqlPath,
    }
  );

  await new Promise((func: any) => httpServer.listen({ port: PORT }, func));
  console.log(
    `🤖 Server is Ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
};
startServer();
