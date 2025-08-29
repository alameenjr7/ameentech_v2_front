import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { projectsService } from '../../../services/adminAPI';

const AdminProjects = () => {
  const columns = [
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'category', label: 'Catégorie', type: 'text' },
    { key: 'clientName', label: 'Client', type: 'text' },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'isNew', label: 'Nouveau', type: 'boolean' },
    { key: 'isFeatured', label: 'Mis en avant', type: 'boolean' },
    { key: 'isActive', label: 'Actif', type: 'boolean' },
    { key: 'order', label: 'Ordre', type: 'number' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="projects">
      <CRUDPage
        service={projectsService}
        entityKey="projects"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminProjects;