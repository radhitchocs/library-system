import React, { useState, useEffect } from 'react';

function BookForm({ book, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, year: parseInt(year) });
    setTitle('');
    setAuthor('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
        {book ? 'Update' : 'Add'} Book
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
}

export default BookForm;
