
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    health: String!
  }
`;

module.exports = typeDefs;
