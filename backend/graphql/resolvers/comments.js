const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../Util/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comments must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        console.log(commentIndex);

        if (commentIndex !== -1) {
          if (post.comments[commentIndex].username === user.username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else throw new UserInputError("Comment not found");
      } else throw new UserInputError("Post not found");
    },
    likePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const likeIndex = post.likes.findIndex(
          (l) => l.username === user.username
        );
        if (likeIndex === -1) {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          post.likes.splice(likeIndex, 1);
          await post.save();
          return post;
        }
      } else throw UserInputError("Post not found");
    },
  },
};
