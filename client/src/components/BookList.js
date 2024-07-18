import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../graphql/queries';
import BookItem from './BookItem';
import BookForm from './BookForm';

function BookList() {
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleAddBook = (bookData) => {
    addBook({ variables: bookData });
    setShowForm(false);
  };

  const handleUpdateBook = (id, bookData) => {
    updateBook({ variables: { id, ...bookData } });
    setEditBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook({ variables: { id } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Add Book
      </button>
      {showForm && (
        <BookForm
          onSubmit={handleAddBook}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editBook && (
        <BookForm
          book={editBook}
          onSubmit={(bookData) => handleUpdateBook(editBook.id, bookData)}
          onCancel={() => setEditBook(null)}
        />
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.books.map(book => (
            <BookItem
              key={book.id}
              book={book}
              onEdit={() => setEditBook(book)}
              onDelete={() => handleDeleteBook(book.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
