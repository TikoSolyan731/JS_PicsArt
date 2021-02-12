const User = require('./User.js');
const Admin = require('./Admin.js');
const Post = require('./Post.js');

const user1 = new User('Moist Critical', 'moistymoist@gmail.com', 'HNDKAHAV');
const user2 = new User(
  'Charlie the Hangman',
  'charleswhite@yahoo.com',
  'StrongPassword'
);

user1.post(
  'Dirt.img',
  'This is dirt, the simplest yet the most beautiful thing in the world.'
);
user1.post(
  'Minecraft.png',
  'Remember the dirt from the previous post. This is him now. Feel old yet?'
);

const post1 = User.getPostById(user1, 1);
const cobblestoneComment = user2.comment(post1, 'Ever heard of cobblestone?');

const reply1 = user1.reply(
  post1,
  'Cobblestone is not even closely enough to recreate the heritage of the Dirt. Get outta here',
  cobblestoneComment
);

reply1.edit(
  'Update: I have finally seen and acknowledged the true beauty of cobblestone. Sorry for my pathetic ignorance.'
);

const admin1 = new Admin(
  'Naruto > Boruto',
  'nothingtocheck@gmail.com',
  'coyzhivvv'
);
admin1.deletePost(
  user1,
  Post.getId(post1),
  'In Imaginastan you cannot talk about The Dirt, as it is the enemy of our nation. Consequences may follow'
);

console.log(admin1);
console.log(user1);
