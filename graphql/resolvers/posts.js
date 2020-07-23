const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort([
          ["score", -1],
          ["createdAt", -1],
        ]);
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { url, title, tag }, context) {
      const user = checkAuth(context);

      if (url.trim() === "") {
        throw new Error("Url must not be empty");
      }

      if (title.trim() === "") {
        throw new Error("Title must not be empty");
      }

      const newPost = new Post({
        url,
        title,
        tag,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        score: 100,
        commentCount: 0,
        upvoteCount: 0,
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async upvotePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.upvotes.find((upvote) => upvote.username === username)) {
          // post already upvoted, remove upvote
          post.upvotes = post.upvotes.filter(
            (upvote) => upvote.username !== username
          );
          post.upvoteCount = post.upvoteCount - 1;
        } else {
          // not upvoted, upvote post
          post.upvotes.push({
            username,
            createdAt: new Date().toISOString(),
          });
          post.upvoteCount = post.upvoteCount + 1;
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
