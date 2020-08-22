# Notes From Videos

## Building the Express App
`npm init` get inside the folder and it will build out package.json

`npm install express --save` create express app (also package lock and save dependencies in package)

`nodemon app` acts like rails s where it reacts with the changes made and you don't have to keep closing and opening with every change (node app.js does not update while running)

- require the express app
- app listen sets up a portal
- graphql hasn't been set up

## Setup GraphQL
`npm install graphql express-graphql` installs the graphql package while the second creates the interaction between graphql and express

- provides simple way for express server to run graphql api
- in the setup based on [documentation](https://www.npmjs.com/package/express-graphql#simple-setup)

```
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
 
const app = express();
 
app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
);
 
app.listen(4000);
```

- if you get `message": "GraphQL middleware options must contain a schema."` this means that schema tells graphql how to look
- schema tells us what data structures and how to walk the graph to get the data

## Building the schema
- schema describes data on the graph (similar to AR)
- start with describing object types (books and authors), relationships, and the queries
- `
const {GraphQLObjectType} = graphql;` grabs this object from the package graphql and store it to use inside the schema file; then define the type
- GraphQLObjectType is a function ()
- things like `GraphQLString` goes in here because it needs to be grabbed from the package
- fields are attributes and a function()
- {} used for objects
- use fields as a function to overcome reference type errors when there are multiple objects
- `GraphQLID` allows user to enter int or string to return data

## Root Queries
- in rootquery, fields doesn't need to be wrapped up in a function because the order doesn't matter
- rootquery explains how we initially jump on the graph
- when someone queries a booktype, I expect them to pass some argument along; I don't know what book they want to query
- define arguments inside query
- parent comes into play with relationships and data
- define which query user can use on the FE

## Resolve Function
- i know the query I'm working with
- takes in the id of 2 from args
- resolve has the function and describes how we get that data from where its store

## Testing Queries in Graphiql
- not meant to go to /graphql
- to test graphql server, use graphiql
- look at the docs to see what query you have access to and what fields and arguments are required
- the docs are essentially a document for this api we've made
- query entry (if id doesn't exist, then returns null)

```
{
  book(id: "1"){
    name
    genre
  }
}
```

## Type Relations
- every book has an author and every author has an array of books
- similar to building one to many relationships and identify where it joins and add the id as part of the attribute
- use the author id for the BE to send information back to the FE
- parent data comes into play with nested data
- when we enter a book id, the book properties serve as our parent
- from the parent, i see i have an author id and now i can use the author id to find the information
- use the resolve function to take in the parent and return other information in the nested data in graphql

- in AuthorType, we cant use `type: BookType` implies author has only one book
-  filter through books array and look for objects that match the criteria
- the authorId is equal to the parent.id(initial author wanted) and authorId is the property with books

- fields needs to be a function => because once it comes down to the AuthorType, it brings an error on Booktype because it can't find it
- you can't move around the object types order
- wrap fields in a function so it's not executing the function until the file runs and it knows the  booktype from previously instead of starting at 0 every single object type