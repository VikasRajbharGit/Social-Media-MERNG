const { UserInputError, AuthenticationError } = require("apollo-server");

const Following = require("../../models/Following");
const User = require("../../models/User");
const checkAuth = require("../../Util/check-auth");

module.exports = {
  Mutation: {
    async follow(_, { followingName }, context) {
      const user = checkAuth(context);
      if (user) {
        const following = await Following.findOne({
          user: user.username,
          following: followingName,
        });

        if (following) {
          throw new UserInputError("Already following!");
        } else {
          const followUser = await User.findOne({ username: followingName });
          if (followUser) {
            const newFollow = new Following({
              user: user.username,
              following: followingName,
            });
            res = await newFollow.save();
            return "Follow successfull";
          } else {
            throw new UserInputError("User to follow does not exist!");
          }
        }
      } else {
        throw new AuthenticationError("User must be authenticated!");
      }
    },
    async unfollow(_, { followingName }, context) {
      const user = checkAuth(context);
      if (user) {
        console.log(followingName);
        const following = await Following.findOne({
          user: user.username,
          following: followingName,
        });

        if (following) {
          await following.delete();
          return "Unfollowed successful";
        } else {
          throw new UserInputError("User id not in following list!");
        }
      } else {
        throw new AuthenticationError("User must be authenticated!");
      }
    },
  },
};
