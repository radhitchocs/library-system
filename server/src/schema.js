const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Borrowing {
    id: ID!
    user: User!
    book: Book!
    borrowDate: String!
    returnDate: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    users: [User!]!
    user(id: ID!): User
    borrowings: [Borrowing!]!
    borrowing(id: ID!): Borrowing
  }

  type Mutation {
    addBook(title: String!, author: String!, year: Int!): Book!
    updateBook(id: ID!, title: String!, author: String!, year: Int!): Book!
    deleteBook(id: ID!): Book

    addUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String!, email: String!): User!
    deleteUser(id: ID!): User

    addBorrowing(userId: ID!, bookId: ID!, borrowDate: String!, returnDate: String!): Borrowing!
    updateBorrowing(id: ID!, userId: ID!, bookId: ID!, borrowDate: String!, returnDate: String!): Borrowing!
    deleteBorrowing(id: ID!): Borrowing
  }
`;

module.exports = typeDefs;