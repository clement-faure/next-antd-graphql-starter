import mongoose from 'mongoose';

const getUser = async (root, { input: { name } }) => {
  // retrieve my model
  const User = mongoose.model('User');

  return User.findOne({ name });
};

export default getUser;
