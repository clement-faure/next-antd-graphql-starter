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
    name: String
    email: String
  }

  ### Inputs

  input UserInput {
    name: String!
  }
`;

export default typeDefs;
