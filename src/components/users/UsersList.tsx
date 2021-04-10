import React from 'react';

const UsersList = ({ users }) => (
  <ul>
    {users.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

export default UsersList;
