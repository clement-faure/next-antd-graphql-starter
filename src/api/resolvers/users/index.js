import getUsers from './getUsers';
import getUser from './getUser';

export default {
  Query: {
    users: getUsers,
    user: getUser,
  },
  Mutation: {},
};
