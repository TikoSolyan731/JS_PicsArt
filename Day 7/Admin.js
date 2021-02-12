const User = require('./User.js');

function Admin(username, email, password) {
  User.call(this, username, email, password);

  this.deletedPostCount = 0;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.deletePost = function (user, postId, reason) {
  const toDelete = User.getPostById(user, postId);

  for (let i = 0; i < user.posts.length; i++) {
    if (user.posts[i] === toDelete) {
      user.posts.splice(i, 1);
      console.log(`Admin ${this.username} deleted post ${postId}, as ${reason}.`)

      this.deletedPostCount++;
      return toDelete;
    }
  }
};

Admin.prototype.deleteComment = function () {
  /// can be easily implemented...
};

module.exports = Admin;
