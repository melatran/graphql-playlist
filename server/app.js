const express = require('express');
//one of the rare times graphqlHTTP doesn't match the name of the package express-graphql
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
   schema
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})