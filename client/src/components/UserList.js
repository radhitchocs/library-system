import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../graphql/queries';
import UserItem from './UserItem';
import UserForm from './UserForm';

function UserList() {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const { loading, error, data } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleAddUser = (userData) => {
    addUser({ variables: userData });
    setShowForm(false);
  };

  const handleUpdateUser = (id, userData) => {
    updateUser({ variables: { id, ...userData } });
    setEditUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser({ variables: { id } });
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
        Add User
      </button>
      {showForm && (
        <UserForm onSubmit={handleAddUser} onCancel={() => setShowForm(false)} />
      )}
      {editUser && (
        <UserForm
          user={editUser}
          onSubmit={(userData) => handleUpdateUser(editUser.id, userData)}
          onCancel={() => setEditUser(null)}
        />
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={() => setEditUser(user)}
              onDelete={() => handleDeleteUser(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;