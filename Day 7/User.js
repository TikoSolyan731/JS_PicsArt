const Post = require('./Post.js');
const Comment = require('./Comment.js');

function User(username, email, password) {
  this.username = username;
  this.email = email;
  this.password = password;

  this.posts = [];
  this.comments = [];
  this.friends = [];
}

User.prototype.post = function (image, description) {
  const newPost = new Post(image, description, this);
  newPost._id = this.posts.length + 1;

  this.posts.push(newPost);
  console.log(
    `${this.username} has posted an image:\n${image}\n${description}.`
  );
};

User.prototype.comment = function (post, text) {
  const newComment = new Comment(post, text, this);

  this.comments.push(newComment);
  post.comments.push(newComment);
  console.log(`${this.username} commented under the post ${post.image}:\n${text}.`);

  return newComment;
};

User.prototype.reply = function (post, text, parentComment) {
  const newReply = new Comment(post, text, this, true, parentComment);

  this.comments.push(newReply);
  parentComment.replies.push(newReply);
  console.log(
    `${this.username} replied to ${parentComment.user} under the post ${post}:\n${text}.`
  );

  return newReply;
};

User.prototype.addFriend = function (user) {
  this.friends.push(user);
  user.friends.push(this);
}

User.getPost = function(user, index) {
  return user.posts[index];
}

User.getPostById = function (user, id) {
  if (id > user.posts.length || id <= 0)
    throw new Error('Wrong ID');

  for (const post of user.posts)
    if (post._id === id)
      return post;

  return;
}

User.getRandomPost = function(user) {
  if (!user.posts.length) return;

  const postIndex = Math.floor(Math.random() * user.posts.length);
  return user.posts[postIndex];
}

module.exports = User;
