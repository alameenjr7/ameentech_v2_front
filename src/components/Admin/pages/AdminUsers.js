import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { usersService } from '../../../services/adminAPI';

const AdminUsers = () => {
  const columns = [
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'firstName', label: 'Prénom', type: 'text' },
    { key: 'lastName', label: 'Nom de famille', type: 'text' },
    { key: 'role', label: 'Rôle', type: 'text' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="users">
      <CRUDPage
        service={usersService}
        entityKey="users"
        columns={columns}
        title="Gestion des Utilisateurs"
      />
    </AdminDashboard>
  );
};

export default AdminUsers;