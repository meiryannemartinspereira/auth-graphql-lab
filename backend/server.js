
const express = require("express");
const cors = require("cors");
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

  app.use(cors());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`GraphQL disponível em http://localhost:${PORT}/graphql`);
  });
}

startServer();
