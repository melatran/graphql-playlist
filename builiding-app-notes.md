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