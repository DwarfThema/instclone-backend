require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import * as logger from "morgan";
import pubsub from "./pubsub";

import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const PORT = process.env.PORT;
const app = express();

//ws setting
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);
//ws setting

const startServer = async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        //우리가 users.utils.js에서 만든 getUser 유틸을 사용해서 유저가 누구인지 확인하자.
        // token: req.headers.token,
        //html 에서 보내는 headers 정보를 vsc에서 사용 할 수 있다. 우리는 token 정보를 이용하자.
        client,
      };
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),

      //ws setting
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      //ws setting
    ],
  });
  await apollo.start();

  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());
  apollo.applyMiddleware({ app });
  await new Promise((func: any) => app.listen({ port: PORT }, func));
  console.log(
    `🤖 Server is Ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
};
startServer();
