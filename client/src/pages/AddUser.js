import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, GET_USERS } from '../graphql/queries';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const navigate = useNavigate();

  const handleSubmit = (userData) => {
    addUser({ variables: userData });
    navigate('/users');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <UserForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/users')} 
      />
    </div>
  );
}

export default AddUser;