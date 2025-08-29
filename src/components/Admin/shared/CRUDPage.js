import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import DataTable from './DataTable';
import DynamicForm from './DynamicForm';
import Modal from './Modal';
import { entityConfigs } from '../../../services/adminAPI';
import './CRUDPage.css';

const CRUDPage = ({ 
  service, 
  entityKey, 
  title,
  columns,
  customActions = null,
  onCustomAction = null
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formModal, setFormModal] = useState({ open: false, data: null, isEdit: false });
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
  const [viewModal, setViewModal] = useState({ open: false, item: null });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const config = entityConfigs[entityKey];

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Vérification de sécurité pour éviter l'erreur si config est undefined
  if (!config) {
    return (
      <div className="crud-page-error">
        <h2>Erreur de configuration</h2>
        <p>La configuration pour "{entityKey}" n'a pas été trouvée.</p>
        <p>Configurations disponibles: {Object.keys(entityConfigs).join(', ')}</p>
      </div>
    );
  }

  // Fonction utilitaire pour vérifier si l'entité est en lecture seule
  const isEntityReadonly = () => {
    return config.readonly === true;
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await service.getAll();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      showMessage('error', 'Erreur lors du chargement des données');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleCreate = () => {
    if (isEntityReadonly() || config.canCreate === false) return;
    setFormModal({ open: true, data: null, isEdit: false });
  };

  const handleEdit = (item) => {
    if (isEntityReadonly() || config.canEdit === false) return;
    setFormModal({ open: true, data: item, isEdit: true });
  };

  const handleView = (item) => {
    setViewModal({ open: true, item });
  };

  const handleDelete = (item) => {
    if (isEntityReadonly() || config.canDelete === false) return;
    setDeleteModal({ open: true, item });
  };

  const handleToggle = async (item) => {
    try {
      if (config.hasToggle) {
        await service.toggle(item.id);
      } else if (config.hasToggleActive) {
        await service.toggleActive(item.id);
      }
      await fetchData();
      alert('Statut mis à jour avec succès ✅');
    } catch (error) {
      console.error('Error toggling item:', error);
      showMessage('error', 'Erreur lors de la mise à jour du statut');
    }
  };

  const cleanFormData = (data) => {
    const cleaned = { ...data };
    const config = entityConfigs[entityKey];
    
    if (config && config.fields) {
      config.fields.forEach(field => {
        const value = cleaned[field.name];
        
        // Skip file fields that are actually File objects
        if (field.type === 'file' && value instanceof File) {
          return; // Keep the file object as-is
        }
        
        // Handle empty strings for non-required fields (but not file fields)
        if (value === '' && !field.required && field.type !== 'file') {
          delete cleaned[field.name];
        }
        
        // Handle numbers
        if (field.type === 'number' && (value === '' || value === null)) {
          if (!field.required) {
            delete cleaned[field.name];
          } else {
            cleaned[field.name] = 0;
          }
        }
        
        // Handle checkboxes
        if (field.type === 'checkbox' && typeof value === 'undefined') {
          cleaned[field.name] = false;
        }
        
        // Handle email/tel/url fields - convert empty strings to null for non-required fields
        if (['email', 'tel', 'url'].includes(field.type) && value === '' && !field.required) {
          delete cleaned[field.name];
        }
        
        // Remove empty file fields (when no file selected)
        if (field.type === 'file' && !value) {
          delete cleaned[field.name];
        }
      });
    }
    
    return cleaned;
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSaving(true);
      const cleanedData = cleanFormData(formData);
      console.log('Sending data:', cleanedData);
      
      if (formModal.isEdit) {
        await service.update(formModal.data.id, cleanedData);
        alert('Élément mis à jour avec succès ✅');
      } else {
        await service.create(cleanedData);
        alert('Élément créé avec succès ✅');
      }
      
      setFormModal({ open: false, data: null, isEdit: false });
      await fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await service.delete(deleteModal.item.id);
      setDeleteModal({ open: false, item: null });
      await fetchData();
      alert('Élément supprimé avec succès ✅');
    } catch (error) {
      console.error('Error deleting item:', error);
      showMessage('error', 'Erreur lors de la suppression: ' + (error.response?.data?.message || error.message));
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="crud-page">
      <motion.div className="crud-header" {...fadeIn}>
        <div className="header-content">
          <h2 className="page-title">{title || config.title}</h2>
          <p className="page-description">
            Gérez {(title || config.title).toLowerCase()} de votre site
          </p>
        </div>

        {!isEntityReadonly() && config.canCreate !== false && (
          <motion.button
            className="create-btn"
            onClick={handleCreate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus />
            <span>Ajouter</span>
          </motion.button>
        )}
      </motion.div>

      {message.text && (
        <motion.div 
          className={`message ${message.type}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      {customActions && (
        <motion.div 
          className="custom-actions"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          {customActions}
        </motion.div>
      )}

      <motion.div 
        className="crud-content"
        {...fadeIn}
        transition={{ delay: 0.4 }}
      >
        <DataTable
          data={data}
          columns={columns}
          onEdit={!isEntityReadonly() && config.canEdit !== false ? handleEdit : null}
          onDelete={!isEntityReadonly() && config.canDelete !== false ? handleDelete : null}
          onView={handleView}
          onToggle={(config.hasToggle || config.hasToggleActive) ? handleToggle : null}
          onCustomAction={onCustomAction}
          canEdit={!isEntityReadonly() && config.canEdit !== false}
          canDelete={!isEntityReadonly() && config.canDelete !== false}
          canView={true}
          canToggle={config.hasToggle || config.hasToggleActive}
          isLoading={loading}
        />
      </motion.div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, data: null, isEdit: false })}
        title={`${formModal.isEdit ? 'Modifier' : 'Créer'} ${(title || config.title).toLowerCase().slice(0, -1)}`}
        size="large"
      >
        <DynamicForm
          fields={config.fields}
          initialData={formModal.data || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormModal({ open: false, data: null, isEdit: false })}
          isLoading={saving}
          isEdit={formModal.isEdit}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={viewModal.open}
        onClose={() => setViewModal({ open: false, item: null })}
        title="Détails"
        size="large"
      >
        {viewModal.item && (
          <div className="view-details">
            {config.fields.map((field) => (
              <div key={field.name} className="detail-row">
                <label className="detail-label">{field.label}:</label>
                <div className="detail-value">
                  {field.type === 'checkbox' 
                    ? (viewModal.item[field.name] ? 'Oui' : 'Non')
                    : field.type === 'date'
                    ? (viewModal.item[field.name] ? new Date(viewModal.item[field.name]).toLocaleDateString('fr-FR') : '-')
                    : field.type === 'datetime-local'
                    ? (viewModal.item[field.name] ? new Date(viewModal.item[field.name]).toLocaleString('fr-FR') : '-')
                    : field.type === 'url' && viewModal.item[field.name]
                    ? <a href={viewModal.item[field.name]} target="_blank" rel="noopener noreferrer" className="detail-link">Voir le lien</a>
                    : field.type === 'email' && viewModal.item[field.name]
                    ? <a href={`mailto:${viewModal.item[field.name]}`} className="detail-link">{viewModal.item[field.name]}</a>
                    : (viewModal.item[field.name] || '-')
                  }
                </div>
              </div>
            ))}
            <div className="detail-row">
              <label className="detail-label">Créé le:</label>
              <div className="detail-value">
                {viewModal.item.createdAt ? new Date(viewModal.item.createdAt).toLocaleString('fr-FR') : '-'}
              </div>
            </div>
            <div className="detail-row">
              <label className="detail-label">Modifié le:</label>
              <div className="detail-value">
                {viewModal.item.updatedAt ? new Date(viewModal.item.updatedAt).toLocaleString('fr-FR') : '-'}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        title="Confirmer la suppression"
        size="small"
      >
        <div className="delete-confirmation">
          <div className="delete-icon">
            <FaExclamationTriangle />
          </div>
          <p className="delete-message">
            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
          </p>
          <div className="delete-actions">
            <motion.button
              className="confirm-delete-btn"
              onClick={confirmDelete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTrash />
              Supprimer
            </motion.button>
            <motion.button
              className="cancel-delete-btn"
              onClick={() => setDeleteModal({ open: false, item: null })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Annuler
            </motion.button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CRUDPage;