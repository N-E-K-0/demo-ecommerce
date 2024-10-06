import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.escuelajs.co/graphql", // Mock API
  cache: new InMemoryCache(),
});

export default client;
