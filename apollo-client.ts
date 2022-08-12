import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5001/api/clunky-seagull",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    Authorization: `APIKey ${process.env.API_KEY}`,
  },
});

export default client;
