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
    authorId: String
    author: AuthorType
  }

  type AuthorType {
    id: String
    name: String
    dob: String
    country: String
  }
  

  type Query {
    book(id: String): BookType,
    books: [BookType],
    author(id: String): AuthorType,
    authors(id: String): [AuthorType]
  }

`;


const resolvers = {
    Query: {
      book: async (parentValue, args) => {
        try{
          const bookResponse = await axios.get(`http://localhost:3000/myFavBooks/${args.id}`)
          const bookData = bookResponse.data;

          const authorResponse = await axios.get(`http://localhost:3000/myFavAuthors/${bookData.authorId}`)
          const authorData = authorResponse.data;

          console.log("bookData", bookData);
          console.log("authorData", authorData);

          const bookFinalData = {
            ...bookData,
            author: authorData
          }
          return bookFinalData;
      }catch(err) {
        console.error(err);
      }
      },
      books: () => {
        return axios.get(`http://localhost:3000/myFavBooks`)
          .then(res => res.data)
      },
      author:  (parentValue, args) => {
          return axios.get(`http://localhost:3000/myFavAuthors/${args.id}`)
          .then(res => res.data)
      },
      authors:  (parentValue, args) => {
        return axios.get(`http://localhost:3000/myFavAuthors/`)
        .then(res => res.data)
    }
  },
    
};
  


const server = new ApolloServer({ typeDefs, resolvers });


server.listen(4001).then(({ url }) => {
  console.log(`GraphQL  Server is ready at ${url}`);
});

