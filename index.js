require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const cron = require("node-cron");
const { updatePostRankings } = require("./util/postRanking");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// update scores at the 59th minute of every hour
cron.schedule("* * * * *", updatePostRankings);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
