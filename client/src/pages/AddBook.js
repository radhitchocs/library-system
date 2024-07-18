import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_BOOK, GET_BOOKS } from '../graphql/queries';
import BookForm from '../components/BookForm';

function AddBook() {
  const navigate = useNavigate();
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (bookData) => {
    addBook({ variables: bookData });
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <BookForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  );
}

export default AddBook;