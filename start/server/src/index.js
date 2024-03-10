const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils"); //highlight-line

//highlight-start
const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");
//highlight-end

const store = createStore(); //highlight-line

const server = new ApolloServer({
  typeDefs,
  //highlight-start
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
  //highlight-end
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});