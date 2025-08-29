import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { pricingPlansService } from '../../../services/adminAPI';

const AdminPricing = () => {
  const columns = [
    { key: 'name', label: 'Nom du plan', type: 'text' },
    { key: 'price', label: 'Prix', type: 'number' },
    { key: 'icon', label: 'Icône', type: 'text' },
    { key: 'popular', label: 'Populaire', type: 'boolean' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="pricing">
      <CRUDPage
        service={pricingPlansService}
        entityKey="pricing-plans"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminPricing;