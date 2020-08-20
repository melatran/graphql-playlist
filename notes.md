# GraphQL Working With React

## REST API

`/authors/:id/books`

```
[
    {
        id: 1,
        name: "Shakespeare",
        age: 36,
        hometown: "England",
        favorite_color: "black
        books: {
            {
                id: 1
                name: "Midsummer Night's Dream"
                publish: 1800
            },
            {
                another book
            }
        }
    }
]
```
- brings backk all the information about the author
- can't select what information you want
- call on the server 5x if there are 5 authors
- multiple endpoints

## GraphQL

```
{
  authors{
    name
    books{
      name
    }
  }
} 
```

```
{
  "data": {
    "authors": [
      {
        "name": "J. K. Rowling",
        "books": [
          {
            "name": "Harry Potter and the Chamber of Secrets"
          },
          {
            "name": "Harry Potter and the Prisoner of Azkaban"
          },
          {
            "name": "Harry Potter and the Goblet of Fire"
          }
        ]
      },
      {
        "name": "J. R. R. Tolkien",
        "books": [
          {
            "name": "The Fellowship of the Ring"
          },
          {
            "name": "The Two Towers"
          },
          {
            "name": "The Return of the King"
          }
        ]
      },
      {
        "name": "Brent Weeks",
        "books": [
          {
            "name": "The Way of Shadows"
          },
          {
            "name": "Beyond the Shadows"
          }
        ]
      }
    ]
  }
}
```

- send one query to the server
- select the information you want return
- easier to access nested api
- one endpoint (/graphql)

<img width="1057" alt="Screen Shot 2020-08-20 at 10 53 52 AM" src="https://user-images.githubusercontent.com/59414750/90801770-9096cc00-e2d3-11ea-9612-d0d287c592c9.png">

- the front end sends a request (I want this information back from book id 1)
- the back end works through the flow to obtain the information (this all happens in 1 query request)
- our entry point is the book id and from the book id, get me the title, genre, and author
- then it jumps to the author and gathers the necessary information
- returns this info back to the FE
- flexible


# Project Overview

[FE](https://www.youtube.com/watch?v=g3IBx2RFl38)

- Node.js(server) graphql server and express app
- setup entry points and what information to be retrieved
- hook up using MongoDB(mLab)
- saves up creating DB locally
- client side app built in react(apollo allows us to use graphql)
- graphiql is a dummy graphql app for FE to test queries in graphql server
- query

**1. Start with {}**
**2. Write your entry point(books)**
**3. Write properties you want**
**3A. Relation queries (author) and choose properties**

```
{
    books{
        name
        genre
        id
        author{
            name
            age
        }
    }
}
```

- open `inspect`, click on `network` to see requests being made (request payload)
- not JS, it's a query language