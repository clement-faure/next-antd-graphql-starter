import mongoose from 'mongoose';

const getUsers = async () => {
  // retrieve my model
  const User = mongoose.model('User');

  return User.find();
};

export default getUsers;
