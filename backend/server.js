
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("@apollo/server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require("dotenv").config();

async function startServer() {
  const { expressMiddleware } = await import("@as-integrations/express5");

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res
      })
    })
  );

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();
