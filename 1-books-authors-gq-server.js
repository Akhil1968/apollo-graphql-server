/*
* This explample serves  hardcoded data.
* Data is available withing the code.
*/

const { ApolloServer, gql } = require('apollo-server');
const data = require('./data');

const typeDefs = gql`
  type BookType {
    title: String
    author: String
  }

  type AuthorType {
    name: String
    dob: String
    country: String
  }
  

  type Query {
    books: [BookType],
    authors: [AuthorType]
  }
`;



const resolvers = {
    Query: {
      books: () => data.myFavBooks,
      authors: () => data.myFavAuthors,
    },

  };


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`GraphQL  Server ready at ${url}`);
});

