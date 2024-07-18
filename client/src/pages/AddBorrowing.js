import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BORROWING, GET_BORROWINGS } from '../graphql/queries';
import BorrowingForm from '../components/BorrowingForm';
import { useNavigate } from 'react-router-dom';

function AddBorrowing() {
  const [addBorrowing] = useMutation(ADD_BORROWING, {
    refetchQueries: [{ query: GET_BORROWINGS }],
  });
  const navigate = useNavigate();

  const handleSubmit = (borrowingData) => {
    // Format dates to ISO strings before sending to server
    const formattedData = {
      ...borrowingData,
      borrowDate: new Date(borrowingData.borrowDate).toISOString(),
      returnDate: new Date(borrowingData.returnDate).toISOString()
    };
    addBorrowing({ variables: formattedData });
    navigate('/borrowings');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Borrowing</h2>
      <BorrowingForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/borrowings')} 
      />
    </div>
  );
}

export default AddBorrowing;