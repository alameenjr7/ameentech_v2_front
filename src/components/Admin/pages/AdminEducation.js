import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { educationService } from '../../../services/adminAPI';

const AdminEducation = () => {
  const columns = [
    { key: 'period', label: 'Période', type: 'text' },
    { key: 'institution', label: 'Institution', type: 'text' },
    { key: 'degree', label: 'Diplôme', type: 'text' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="education">
      <CRUDPage
        service={educationService}
        entityKey="education"
        columns={columns}
        title="Formation & Éducation"
      />
    </AdminDashboard>
  );
};

export default AdminEducation;