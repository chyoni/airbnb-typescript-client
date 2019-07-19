import { gql } from "apollo-boost";

export const IS_LOGGEDIN = gql`
  {
    isLoggedIn @client
  }
`;

export const LOG_IN = gql`
  mutation logIn($token: String!) {
    logIn(token: $token) @client
  }
`;
