import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://buckingham.stepzen.net/api/clunky-seagull/__graphql",
  headers: {
    Authorization: `Apikey buckingham::stepzen.net+1000::d9b0d62dd70f0c1aa95dc0fa6f476fb7f710cd81d199394c14133ef556bb0355`,
  },
  cache: new InMemoryCache(),
});

export default client;
