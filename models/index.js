// organize and import/export models
const User = require("./User");
const Post = require("./Post");
const Vote = require('./Vote');
const Comment = require('./Comments')

// create associations
// associations created refrence for Id of user model and forign_key pair.
User.hasMany(Post, {
    foreignKey: 'user_id'
});
//  reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// create belongsToMany association for user/post to display how many votes a user creates, when user is queried, can view all posts they've voted on
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

// setting associaton for each model so that we can perform aggregated sql functions between them. 
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

// setting associations for comments
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };