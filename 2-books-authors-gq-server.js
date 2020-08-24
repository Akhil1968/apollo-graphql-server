/*
* This explample fetches data from REST APIs served by json-server.
* Fetching the data is done using axios library.
*/

const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type BookType {
    id: String
    title: String
  }

  type AuthorType {
    id: String
    name: String
    dob: String
    country: String
  }
  

  type Query {
    books: [BookType],
    authors: [AuthorType]
  }
`;


  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => {
        return axios.get(`http://localhost:3000/myFavBooks`)
          .then(res => res.data)
      },
      authors:  (parentValue, args) => {
        return axios.get(`http://localhost:3000/myFavAuthors`)
          .then(res => res.data)
      }
  },
    
};
  


const server = new ApolloServer({ typeDefs, resolvers });


server.listen(4001).then(({ url }) => {
  console.log(`GraphQL  Server is ready at ${url}`);
});

