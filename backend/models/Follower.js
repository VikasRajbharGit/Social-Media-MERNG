const { model, Schema } = require("mongoose");

const followerSchema = new Schema({
  user: String,
  follower: String,
});

module.exports = model("Follower", followerSchema);
