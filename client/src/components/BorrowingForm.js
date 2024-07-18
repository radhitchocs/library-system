import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS, GET_USERS } from '../graphql/queries';

function BorrowingForm({ borrowing, onSubmit, onCancel }) {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const { data: userData } = useQuery(GET_USERS);
  const { data: bookData } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (borrowing) {
      setUserId(borrowing.user.id);
      setBookId(borrowing.book.id);
      setBorrowDate(borrowing.borrowDate.split('T')[0]); // Pastikan hanya mengambil bagian tanggal
      setReturnDate(borrowing.returnDate.split('T')[0]); // Pastikan hanya mengambil bagian tanggal
    }
  }, [borrowing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userId, bookId, borrowDate, returnDate });
    setUserId('');
    setBookId('');
    setBorrowDate('');
    setReturnDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 mr-2"
        required
      >
        <option value="">Select User</option>
        {userData?.users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <select
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        className="border p-2 mr-2"
        required
      >
        <option value="">Select Book</option>
        {bookData?.books.map(book => (
          <option key={book.id} value={book.id}>{book.title}</option>
        ))}
      </select>
      <input
        type="date"
        value={borrowDate}
        onChange={(e) => setBorrowDate(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
        {borrowing ? 'Update' : 'Add'} Borrowing
      </button>
      <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
        Cancel
      </button>
    </form>
  );
}

export default BorrowingForm;
