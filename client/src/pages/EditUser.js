import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, UPDATE_USER, GET_USERS } from '../graphql/queries';
import UserForm from '../components/UserForm';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER, { variables: { id } });
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = (userData) => {
    updateUser({ variables: { id, ...userData } });
    navigate('/users');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <UserForm 
        user={data.user} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/users')} 
      />
    </div>
  );
}

export default EditUser;