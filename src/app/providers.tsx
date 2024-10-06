"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import client from "../graphql/apolloClient";
import store from "../redux/store";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
}
