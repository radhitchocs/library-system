import React from 'react';

function BookItem({ book, onEdit, onDelete }) {
  return (
    <tr>
      <td className="border p-2">{book.title}</td>
      <td className="border p-2">{book.author}</td>
      <td className="border p-2">{book.year}</td>
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

export default BookItem;
