import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { testimonialsService } from '../../../services/adminAPI';

const AdminTestimonials = () => {
  const columns = [
    { key: 'name', label: 'Nom', type: 'text' },
    { key: 'role', label: 'Rôle/Poste', type: 'text' },
    { key: 'text', label: 'Témoignage', type: 'truncate' },
    { key: 'rating', label: 'Note', type: 'number' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="testimonials">
      <CRUDPage
        service={testimonialsService}
        entityKey="testimonials"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminTestimonials;