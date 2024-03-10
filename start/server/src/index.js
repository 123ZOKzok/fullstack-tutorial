// We will cover using dotenv in a later lesson
require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const server = new ApolloServer({ typeDefs });