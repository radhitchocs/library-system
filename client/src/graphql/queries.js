import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      year
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      year
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_BORROWINGS = gql`
  query GetBorrowings {
    borrowings {
      id
      user {
        id
        name
      }
      book {
        id
        title
      }
      borrowDate
      returnDate
    }
  }
`;

export const GET_BORROWING = gql`
  query GetBorrowing($id: ID!) {
    borrowing(id: $id) {
      id
      user {
        id
        name
      }
      book {
        id
        title
      }
      borrowDate
      returnDate
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $year: Int!) {
    addBook(title: $title, author: $author, year: $year) {
      id
      title
      author
      year
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const ADD_BORROWING = gql`
  mutation AddBorrowing($userId: ID!, $bookId: ID!, $borrowDate: String!, $returnDate: String!) {
    addBorrowing(userId: $userId, bookId: $bookId, borrowDate: $borrowDate, returnDate: $returnDate) {
      id
      user {
        id
        name
      }
      book {
        id
        title
      }
      borrowDate
      returnDate
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!, $year: Int!) {
    updateBook(id: $id, title: $title, author: $author, year: $year) {
      id
      title
      author
      year
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const UPDATE_BORROWING = gql`
  mutation UpdateBorrowing($id: ID!, $userId: ID!, $bookId: ID!, $borrowDate: String!, $returnDate: String!) {
    updateBorrowing(id: $id, userId: $userId, bookId: $bookId, borrowDate: $borrowDate, returnDate: $returnDate) {
      id
      user {
        id
        name
      }
      book {
        id
        title
      }
      borrowDate
      returnDate
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const DELETE_BORROWING = gql`
  mutation DeleteBorrowing($id: ID!) {
    deleteBorrowing(id: $id) {
      id
    }
  }
`;