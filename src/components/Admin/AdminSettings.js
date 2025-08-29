import React from 'react';
import AdminDashboard from './AdminDashboard';
import CRUDPage from './shared/CRUDPage';
import { settingsService } from '../../services/adminAPI';

const AdminSettings = () => {
  const columns = [
    { key: 'title', label: 'Titre du site', type: 'text' },
    { key: 'phone', label: 'Téléphone', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'address', label: 'Adresse', type: 'text' },
    { key: 'slogan', label: 'Slogan', type: 'text' },
    { key: 'isActive', label: 'Actif', type: 'boolean' },
    { key: 'domain', label: 'Domaine', type: 'url' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="settings">
      <CRUDPage
        service={settingsService}
        entityKey="settings"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminSettings;