import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { mailingService } from '../../../services/adminAPI';

const AdminMailing = () => {
  const columns = [
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'name', label: 'Nom', type: 'text' },
    { key: 'subscribed_at', label: 'Date d\'inscription', type: 'datetime' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="mailing">
      <CRUDPage
        service={mailingService}
        entityKey="mailing"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminMailing;