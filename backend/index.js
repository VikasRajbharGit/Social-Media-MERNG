const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
const multer = require("multer");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname); //Appending .jpg
  //   },
  // });

  // const upload = multer({
  //   storage: storage,
  //   limits: { fileSize: 1000000 },
  // }).single("image");

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  await mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: ({ req }) => ({ req }),
  });
  // app.get("/test", (req, res) => {
  //   res.send("hello");
  // });
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,

      execute,
      subscribe,
      onConnect(connectionParams, webSocket, context) {
        console.log("Connected!");
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected!");
      },
    },
    {
      server: httpServer,

      path: server.graphqlPath,
    }
  );

  await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

// const app = express();
// const httpServer = http.createServer(app);

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [
//     ApolloServerPluginLandingPageGraphQLPlayground({
//       // options
//     }),
//     ApolloServerPluginDrainHttpServer({ httpServer })
//   ],
//   context: ({ req }) => ({ req, pubsub }),
// });

// mongoose
//   .connect(MONGODB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     return server.listen({ port: 5000 });
//   })
//   .then((res) => {
//     console.log(`Server running on ${res.url}`);
//   });
