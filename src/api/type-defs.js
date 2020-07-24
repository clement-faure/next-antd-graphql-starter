import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  ### Queries

  type Query {
    users: [User!]!
    user(input: UserInput!): User
  }

  ### Types

  type User {
    id: String
    username: String
    email: String
  }

  ### Inputs

  input UserInput {
    username: String!
  }
`;

export default typeDefs;
