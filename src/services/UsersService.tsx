import { gql, useQuery } from '@apollo/client';

export const USERS_QUERY = gql`
  query getUsers {
    users {
      id
      email
      name
    }
  }
`;

export const useUserQuery = (options = {}) => useQuery(USERS_QUERY, options);
