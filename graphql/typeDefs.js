const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    url: String!
    tag: AllowedTag!
    createdAt: String!
    score: Float!
    username: String!
    comments: [Comment]!
    upvotes: [Upvote]!
    upvoteCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type Upvote {
    id: ID!
    createdAt: String!
    username: String!
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
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(url: String!, title: String!, tag: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    upvotePost(postId: ID!): Post!
  }

  enum AllowedTag {
    NEWS
    TECHNOLOGY
    FINANCE
  }
`;
