const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type User {
    id: String
    email: String!
    token: String
    username: String!
    createdAt: String!
  }
  type Follower {
    id: String!
    user: String!
    follower: String!
  }
  type Following {
    id: String!
    user: String!
    following: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    searchUsers(query: String!): [User]
    # getFollowers(userId: ID!): [Follower]
    # getFollowings(userId: ID!): [Following]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    follow(followingName: String!): String!
    unfollow(followingName: String!): String!
  }
  type Subscription {
    newPost: Post!
  }
`;
