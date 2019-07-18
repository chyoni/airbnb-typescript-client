import ApolloClient, { Operation } from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

const client = new ApolloClient({
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  },
  clientState: {
    defaults,
    resolvers
  },
  uri: "http://localhost:4300/graphql"
});

export default client;
