import React from 'react';

function BorrowingItem({ borrowing, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date provided';
    
    // Try parsing as ISO string
    let date = new Date(dateString);
    
    // If invalid, try parsing as Unix timestamp
    if (isNaN(date.getTime())) {
      date = new Date(parseInt(dateString));
    }
    
    // If still invalid, return the raw string and log the error
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return dateString;
    }
    
    return date.toLocaleDateString();
  };

  return (
    <tr>
      <td className="border p-2">{borrowing.user.name}</td>
      <td className="border p-2">{borrowing.book.title}</td>
      <td className="border p-2">{formatDate(borrowing.borrowDate)}</td>
      <td className="border p-2">{formatDate(borrowing.returnDate)}</td>
      <td className="border p-2">
        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={onEdit}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BorrowingItem;