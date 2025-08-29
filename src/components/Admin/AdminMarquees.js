import React from 'react';
import { motion } from 'framer-motion';
import AdminDashboard from './AdminDashboard';
import CRUDPage from './shared/CRUDPage';
import { marqueesService } from '../../services/adminAPI';
import './AdminMarquees.css';

const AdminMarquees = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const columns = [
    { 
      key: 'id', 
      label: 'ID', 
      type: 'text',
      width: '60px'
    },
    { 
      key: 'items', 
      label: 'Messages défilants', 
      type: 'custom',
      width: '50%',
      render: (value) => {
        try {
          const items = JSON.parse(value);
          return (
            <div className="marquee-items-preview">
              <div className="items-count">{items.length} élément(s)</div>
              <div className="items-sample">
                {items.slice(0, 2).map((item, index) => (
                  <span key={index} className="item-tag">
                    {item.length > 30 ? item.substring(0, 30) + '...' : item}
                  </span>
                ))}
                {items.length > 2 && <span className="more-items">+{items.length - 2}</span>}
              </div>
            </div>
          );
        } catch (e) {
          return <span className="error-text">Format JSON invalide</span>;
        }
      }
    },
    { 
      key: 'createdAt', 
      label: 'Créé le', 
      type: 'date',
      width: '140px'
    },
    { 
      key: 'updatedAt', 
      label: 'Modifié le', 
      type: 'date',
      width: '140px'
    }
  ];

  return (
    <AdminDashboard currentSection="marquees">
      <motion.div className="admin-marquees" {...fadeIn}>
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="title-icon">📰</span>
              Gestion des Marquees
            </h1>
            <p className="page-description">
              Gérez les messages défilants qui apparaissent sur votre site web. Les marquees permettent d'afficher 
              des informations importantes ou des actualités de manière dynamique.
            </p>
            <div className="header-info">
              <div className="info-card">
                <span className="info-icon">💡</span>
                <div className="info-content">
                  <strong>Format JSON</strong>
                  <p>Les éléments doivent être au format: ["Message 1", "Message 2"]</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">🔄</span>
                <div className="info-content">
                  <strong>Défilement automatique</strong>
                  <p>Les messages s'affichent en boucle continue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <CRUDPage
            service={marqueesService}
            entityKey="marquees"
            columns={columns}
            title="Messages Défilants"
          />
        </div>
      </motion.div>
    </AdminDashboard>
  );
};

export default AdminMarquees;