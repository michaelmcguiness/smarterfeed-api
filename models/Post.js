const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  url: String,
  createdAt: String,
  score: Number,
  tag: String,
  username: String,
  comments: [
    {
      username: String,
      createdAt: String,
      body: String,
    },
  ],
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
