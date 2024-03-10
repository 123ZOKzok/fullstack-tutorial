import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql, 
  useQuery,
} from "@apollo/client";
import { cache } from "./cache";
import ReactDOM from "react-dom/client";
import Pages from "./pages";
import injectStyles from "./styles";
import Login from "./pages/login"; 

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
  typeDefs, 
  resolvers: {},
});

injectStyles();


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>
);