function Comment(post, text, user, isReply = false, parentComment = null) {
  this.post = post;
  this.text = text;
  this.user = user;

  this.isReply = isReply;
  this.parentComment = parentComment;

  this.replies = [];
}

Comment.prototype.edit = function (newText) {
  this.text = newText;
};

module.exports = Comment;
