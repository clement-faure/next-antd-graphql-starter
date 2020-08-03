import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const USERS_QUERY = gql`
  query getUsers {
    users {
      id
      email
      username
    }
  }
`;

const UsersContainer = () => {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { users } = data;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
};

export default UsersContainer;
