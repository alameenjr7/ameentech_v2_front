import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { toolsService } from '../../../services/adminAPI';

const AdminTools = () => {
  const columns = [
    { key: 'name', label: 'Nom de l\'outil', type: 'text' },
    { key: 'percent', label: 'Maîtrise (%)', type: 'number' },
    { key: 'icon', label: 'Icône', type: 'text' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="tools">
      <CRUDPage
        service={toolsService}
        entityKey="tools"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminTools;