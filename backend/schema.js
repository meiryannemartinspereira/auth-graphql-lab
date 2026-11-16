
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    user: User!
    message: String!
  }

  type Query {
    health: String!
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: String!
  }
`;

module.exports = typeDefs;
