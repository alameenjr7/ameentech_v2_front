import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { servicesService } from '../../../services/adminAPI';

const AdminServices = () => {
  const columns = [
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'description', label: 'Description', type: 'truncate' },
    { key: 'icon', label: 'Icône', type: 'text' },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'isActive', label: 'Actif', type: 'boolean' },
    { key: 'order', label: 'Ordre', type: 'number' },
    { key: 'isNew', label: 'Nouveau', type: 'boolean' },
    { key: 'isFeatured', label: 'Mis en avant', type: 'boolean' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="services">
      <CRUDPage
        service={servicesService}
        entityKey="services"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminServices;