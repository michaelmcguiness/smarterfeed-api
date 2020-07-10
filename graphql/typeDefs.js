const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    url: String!
    tag: String!
    createdAt: String!
    score: Int!
    username: String
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
