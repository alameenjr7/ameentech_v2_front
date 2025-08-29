import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { blogsService } from '../../../services/adminAPI';

const AdminBlogs = () => {
  const columns = [
    { key: 'category', label: 'Catégorie', type: 'text' },
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'excerpt', label: 'Extrait', type: 'truncate' },
    { key: 'link', label: 'Lien', type: 'url' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="blog">
      <CRUDPage
        service={blogsService}
        entityKey="blogs"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminBlogs;