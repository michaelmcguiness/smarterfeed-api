const Post = require("../models/Post");

module.exports.updatePostRankings = async () => {
  // ranking formula for posts
  // exponent on time is higher than exponent on upvotes
  // (evn if item keeps getting upvotes, eventually denominator will overwhelm and ranking will drop)
  const today = new Date();
  const posts = await Post.find();
  posts.forEach(async function (post) {
    const postDate = new Date(post.createdAt);
    const ageInHours = Math.floor((today - postDate) / 3600000);
    post.score =
      Math.pow(post.upvoteCount, 0.8) / Math.pow(ageInHours + 2, 1.8);
    await post.save();
  });
};
