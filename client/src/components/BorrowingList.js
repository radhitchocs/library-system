import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BORROWINGS, ADD_BORROWING, UPDATE_BORROWING, DELETE_BORROWING } from '../graphql/queries';
import BorrowingItem from './BorrowingItem';
import BorrowingForm from './BorrowingForm';

function BorrowingList() {
  const [showForm, setShowForm] = useState(false);
  const [editBorrowing, setEditBorrowing] = useState(null);
  const { loading, error, data } = useQuery(GET_BORROWINGS);
  const [addBorrowing] = useMutation(ADD_BORROWING, {
    refetchQueries: [{ query: GET_BORROWINGS }],
  });
  const [updateBorrowing] = useMutation(UPDATE_BORROWING, {
    refetchQueries: [{ query: GET_BORROWINGS }],
  });
  const [deleteBorrowing] = useMutation(DELETE_BORROWING, {
    refetchQueries: [{ query: GET_BORROWINGS }],
  });

  const handleAddBorrowing = (borrowingData) => {
    addBorrowing({ variables: borrowingData });
    setShowForm(false);
  };

  const handleUpdateBorrowing = (id, borrowingData) => {
    updateBorrowing({ variables: { id, ...borrowingData } });
    setEditBorrowing(null);
  };

  const handleDeleteBorrowing = (id) => {
    if (window.confirm('Are you sure you want to delete this borrowing?')) {
      deleteBorrowing({ variables: { id } });
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
        Add Borrowing
      </button>
      {showForm && (
        <BorrowingForm onSubmit={handleAddBorrowing} onCancel={() => setShowForm(false)} />
      )}
      {editBorrowing && (
        <BorrowingForm
          borrowing={editBorrowing}
          onSubmit={(borrowingData) => handleUpdateBorrowing(editBorrowing.id, borrowingData)}
          onCancel={() => setEditBorrowing(null)}
        />
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Book</th>
            <th className="border p-2">Borrow Date</th>
            <th className="border p-2">Return Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.borrowings.map(borrowing => (
            <BorrowingItem
              key={borrowing.id}
              borrowing={borrowing}
              onEdit={() => setEditBorrowing(borrowing)}
              onDelete={() => handleDeleteBorrowing(borrowing.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowingList;