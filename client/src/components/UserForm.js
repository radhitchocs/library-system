import React, { useState, useEffect } from 'react';

function UserForm({ user, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
        {user ? 'Update' : 'Add'} User
      </button>
      <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
        Cancel
      </button>
    </form>
  );
}

export default UserForm;