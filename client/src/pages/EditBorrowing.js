import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BORROWING, UPDATE_BORROWING, GET_BORROWINGS } from '../graphql/queries';
import BorrowingForm from '../components/BorrowingForm';
import { useParams, useNavigate } from 'react-router-dom';

function EditBorrowing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BORROWING, { variables: { id } });
  const [updateBorrowing] = useMutation(UPDATE_BORROWING, {
    refetchQueries: [{ query: GET_BORROWINGS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = (borrowingData) => {
    updateBorrowing({ variables: { id, ...borrowingData } });
    navigate('/borrowings');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Borrowing</h2>
      <BorrowingForm 
        borrowing={data.borrowing} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/borrowings')} 
      />
    </div>
  );
}

export default EditBorrowing;