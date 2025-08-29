import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import MarqueeItemsEditor from './MarqueeItemsEditor';
import './DynamicForm.css';

const DynamicForm = ({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  isEdit = false,
  title
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    const initialFormData = {};
    fields.forEach(field => {
      // Use initialData value if it exists (even if falsy), otherwise use default
      initialFormData[field.name] = initialData.hasOwnProperty(field.name) 
        ? initialData[field.name] 
        : getDefaultValue(field);
    });
    setFormData(initialFormData);
  }, [fields, initialData]);

  const getDefaultValue = (field) => {
    switch (field.type) {
      case 'checkbox':
        return false;
      case 'number':
        return '';
      case 'date':
      case 'datetime-local':
        return '';
      case 'marquee-items':
        return '[]';
      default:
        return '';
    }
  };

  // Memoize validateField to prevent unnecessary re-creation
  const validateField = useCallback((field, value) => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} est requis`;
    }

    if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Format d\'email invalide';
    }

    if (field.type === 'url' && value && !/^https?:\/\/.+/.test(value)) {
      return 'URL invalide (doit commencer par http:// ou https://)';
    }

    if (field.min && value && Number(value) < field.min) {
      return `La valeur doit être au minimum ${field.min}`;
    }

    if (field.max && value && Number(value) > field.max) {
      return `La valeur doit être au maximum ${field.max}`;
    }

    // Validation JSON pour différents champs
    if ((field.name === 'items' || field.name === 'paragraphs' || field.name === 'technologies' || field.name === 'tags') && value) {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
          return 'Le format doit être un tableau JSON (ex: ["Item 1", "Item 2"])';
        }
        if (parsed.length === 0 && field.required) {
          return 'Le tableau ne peut pas être vide';
        }
        if (parsed.some(item => typeof item !== 'string' || item.trim() === '')) {
          return 'Tous les éléments doivent être des chaînes de caractères non vides';
        }
      } catch (e) {
        return 'Format JSON invalide. Exemple: ["Item 1", "Item 2", "Item 3"]';
      }
    }

    // Validation JSON pour les stats/features
    if ((field.name === 'stats' || field.name === 'yearExperience' || field.name === 'clients' || field.name === 'features') && value) {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
          return 'Le format doit être un tableau JSON';
        }
        if (field.name === 'features') {
          // Validation simple pour features (tableau de strings)
          if (parsed.some(item => typeof item !== 'string' || item.trim() === '')) {
            return 'Toutes les fonctionnalités doivent être des chaînes de caractères non vides';
          }
        } else {
          // Validation pour stats (objets avec number et label)
          if (parsed.some(item => !item.number || !item.label || typeof item.number !== 'string' || typeof item.label !== 'string')) {
            return 'Format invalide. Exemple: [{"number":"10+","label":"Projets"}]';
          }
        }
      } catch (e) {
        return 'Format JSON invalide';
      }
    }

    if (field.type === 'tel' && value && !/^[+]?[\d\s\-()]+$/.test(value)) {
      return 'Format de téléphone invalide';
    }

    return '';
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field.name]: value
    }));

    // Clear error when user starts typing
    if (errors[field.name]) {
      setErrors(prev => ({
        ...prev,
        [field.name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    fields.forEach(field => {
      if (field.createOnly && isEdit) return; // Skip create-only fields in edit mode
      if (field.readonly) return; // Skip readonly fields
      
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Remove create-only fields from edit data
      const submitData = { ...formData };
      if (isEdit) {
        fields.forEach(field => {
          if (field.createOnly) {
            delete submitData[field.name];
          }
        });
      }
      
      onSubmit(submitData);
    }
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];
    const isDisabled = isLoading || field.readonly || (field.createOnly && isEdit);

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <textarea
              id={field.name}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
              disabled={isDisabled}
              rows={field.rows || 4}
              className={`form-textarea ${error ? 'error' : ''}`}
            />
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );

      case 'marquee-items':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <MarqueeItemsEditor
              value={value}
              onChange={(newValue) => handleInputChange(field, newValue)}
              placeholder={field.placeholder || 'Saisissez un message...'}
              disabled={isDisabled}
              error={error}
            />
            {field.help && <span className="form-help">{field.help}</span>}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <select
              id={field.name}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              disabled={isDisabled}
              className={`form-select ${error ? 'error' : ''}`}
            >
              <option value="">Sélectionner...</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => handleInputChange(field, e.target.checked)}
                disabled={isDisabled}
                className="form-checkbox"
              />
              <span className="checkbox-text">
                {field.label}
                {field.required && <span className="required">*</span>}
              </span>
            </label>
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );

      case 'password':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <div className="password-wrapper">
              <input
                id={field.name}
                type={showPasswords[field.name] ? 'text' : 'password'}
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
                disabled={isDisabled}
                className={`form-input ${error ? 'error' : ''}`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility(field.name)}
                disabled={isDisabled}
              >
                {showPasswords[field.name] ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );

      case 'color':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <div className="color-input-wrapper">
              <input
                id={field.name}
                type="color"
                value={value || '#000000'}
                onChange={(e) => handleInputChange(field, e.target.value)}
                disabled={isDisabled}
                className={`form-color-input ${error ? 'error' : ''}`}
              />
              <input
                type="text"
                value={value || '#000000'}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={field.placeholder || '#000000'}
                disabled={isDisabled}
                className={`form-input color-text ${error ? 'error' : ''}`}
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              id={field.name}
              type="file"
              onChange={(e) => handleInputChange(field, e.target.files[0])}
              disabled={isDisabled}
              accept={field.accept}
              className={`form-file-input ${error ? 'error' : ''}`}
            />
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );

      default:
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              id={field.name}
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
              disabled={isDisabled}
              min={field.min}
              max={field.max}
              step={field.step}
              className={`form-input ${error ? 'error' : ''}`}
            />
            {field.help && <span className="form-help">{field.help}</span>}
            {error && <span className="form-error">{error}</span>}
          </div>
        );
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div className="dynamic-form" {...fadeIn}>
      {title && <h3 className="form-title">{title}</h3>}
      
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-fields">
          {fields.map(renderField)}
        </div>

        <div className="form-actions">
          <motion.button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="btn-loading">
                <div className="spinner"></div>
                <span>Sauvegarde...</span>
              </div>
            ) : (
              <>
                <FaSave />
                <span>{isEdit ? 'Mettre à jour' : 'Créer'}</span>
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaTimes />
            <span>Annuler</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default DynamicForm;