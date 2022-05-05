// organize and import/export models
const User = require("./User");
const Post = require("./Post");


// create associations
// associations created refrence for Id of user model and forign_key pair.
User.hasMany(Post, {
    foreignKey: 'user_id'
});
//  reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });


module.exports = { User, Post };