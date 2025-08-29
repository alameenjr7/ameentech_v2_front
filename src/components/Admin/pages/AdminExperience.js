import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { workExperiencesService } from '../../../services/adminAPI';

const AdminExperience = () => {
  const columns = [
    { key: 'period', label: 'Période', type: 'text' },
    { key: 'company', label: 'Entreprise', type: 'text' },
    { key: 'role', label: 'Rôle/Poste', type: 'text' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="experience">
      <CRUDPage
        service={workExperiencesService}
        entityKey="work-experiences"
        columns={columns}
        title="Expériences Professionnelles"
      />
    </AdminDashboard>
  );
};

export default AdminExperience;