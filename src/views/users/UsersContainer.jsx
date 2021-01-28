import React from 'react';

import { useUserQuery } from '~/services/UsersService';

import UsersList from '~/components/users/UsersList';

import Error from '~/components/ui/Error';
import Loading from '~/components/ui/Loading';

const UsersContainer = () => {
  const { loading, error, data } = useUserQuery({
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <Error />;
  if (loading) return <Loading />;

  const { users } = data;

  return <UsersList users={users} />;
};

export default UsersContainer;
