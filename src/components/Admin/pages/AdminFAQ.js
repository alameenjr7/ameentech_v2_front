import React from 'react';
import AdminDashboard from '../AdminDashboard';
import CRUDPage from '../shared/CRUDPage';
import { faqsService } from '../../../services/adminAPI';

const AdminFAQ = () => {
  const columns = [
    { key: 'question', label: 'Question', type: 'text' },
    { key: 'answer', label: 'Réponse', type: 'truncate' },
    { key: 'order', label: 'Ordre', type: 'number' },
    { key: 'createdAt', label: 'Créé le', type: 'date' }
  ];

  return (
    <AdminDashboard currentSection="faq">
      <CRUDPage
        service={faqsService}
        entityKey="faqs"
        columns={columns}
      />
    </AdminDashboard>
  );
};

export default AdminFAQ;