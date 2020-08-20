const express = require('express');
//one of the rare times graphqlHTTP doesn't match the name of the package express-graphql
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
    //schema goes here
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})