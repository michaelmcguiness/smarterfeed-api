const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  url: String,
  createdAt: String,
  score: Number,
  tag: String,
  username: String,
  commentCount: Number,
  comments: [
    {
      username: String,
      createdAt: String,
      body: String,
    },
  ],
  upvoteCount: Number,
  upvotes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", postSchema);
