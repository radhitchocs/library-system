import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK, UPDATE_BOOK, GET_BOOKS } from '../graphql/queries';
import BookForm from '../components/BookForm';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOOK, { variables: { id } });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = (bookData) => {
    updateBook({ variables: { id, ...bookData } });
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <BookForm book={data.book} onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  );
}

export default EditBook;