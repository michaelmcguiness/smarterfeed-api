module.exports.calcScore = (today, upvoteCount, createdAt) => {
  // ranking formula for posts
  // exponent on time is higher than exponent on upvotes
  // (evn if item keeps getting upvotes, eventually denominator will overwhelm and ranking will drop)
  const postDate = new Date(createdAt);
  const ageInHours = Math.floor(((today - postDate) % 86400000) / 3600000);
  console.log(Math.pow(upvoteCount - 1, 0.8));
  const newScore = Math.round(
    Math.pow(upvoteCount - 1, 0.8) / Math.pow(ageInHours + 2, 1.8)
  );
  if (isNaN(newScore)) {
    return 0;
  } else {
    return newScore;
  }
};
