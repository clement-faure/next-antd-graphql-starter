import mongoose from 'mongoose';

const getUser = async (root, { input: { username } }) => {
  // retrieve my model
  const User = mongoose.model('User');

  return User.findOne({ username });
};

export default getUser;
