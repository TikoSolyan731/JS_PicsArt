function Post(image, description, user) {
  this.image = image;
  this.description = description;
  this.user = user;

  this.date = Date.now();
  this.comments = [];
}

Post.prototype.edit = function(description) {
  this.description = description;
}

Post.getId = function (post) {
  return post._id;
};

module.exports = Post;
