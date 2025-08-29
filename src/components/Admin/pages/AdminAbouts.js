import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { aboutsService } from '../../../services/adminAPI';

const AdminAbouts = () => {
  const columns = [
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'description', label: 'Description', type: 'truncate' },
    { key: 'signature', label: 'Signature', type: 'text' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="abouts">
      <CRUDPage
        service={aboutsService}
        entityKey="abouts"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminAbouts;