import React from 'react';
import PropTypes from 'prop-types';

import { UserPropType } from '~/models/user';

const UsersList = ({ users }) => (
  <ul>
    {users.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(UserPropType).isRequired,
};

export default UsersList;
