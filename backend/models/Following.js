const { model, Schema } = require("mongoose");

const followingSchema = new Schema({
  user: String,
  following: String,
});

module.exports = model("Following", followingSchema);
