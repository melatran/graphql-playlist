const graphql = require('graphql');
const _ = require('lodash')

const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
    fields:() => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author: {
        type: AuthorType, //already defined this type
        resolve(parent, args){
          console.log(parent);
          return _.find(authors, {id: parent.authorId});
          //find the author whose id property matches the parent
        }
      }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        //code to get data from db/other source
        //used resolve in query for looking at the actual data and return what is needed (similar to api serializer)
        console.log(typeof(args.id))
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(authors, {id: args.id}) //id is one the came with the query for book
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});