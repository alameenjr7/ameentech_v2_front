import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { apiClient } from '../../apiConfig';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score++;
    else feedback.push('Au moins 8 caractères');
    
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Une majuscule');
    
    if (/[a-z]/.test(password)) score++;
    else feedback.push('Une minuscule');
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push('Un chiffre');
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Un caractère spécial');

    const strengthLevels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    return {
      score,
      level: strengthLevels[Math.min(score, 4)],
      feedback: feedback.length > 0 ? `Manque: ${feedback.join(', ')}` : 'Mot de passe fort!'
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    if (error) setError('');
    
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setFieldErrors(prev => ({ ...prev, email: 'Format d\'email invalide' }));
      }
    }
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newFieldErrors = {};
    
    if (!formData.email) {
      newFieldErrors.email = 'Email requis';
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      newFieldErrors.email = 'Format d\'email invalide';
      hasErrors = true;
    }
    
    if (!formData.password) {
      newFieldErrors.password = 'Mot de passe requis';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', formData);
      
      if (response.data && response.data.token) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Échec de la connexion. Vérifiez vos identifiants.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <motion.div 
          className="admin-login-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin-login-header">
            <motion.div 
              className="admin-logo"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="logo-circle">
                <span>A</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="admin-title"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              Administration
            </motion.h1>
            
            <motion.p 
              className="admin-subtitle"
              {...fadeIn}
              transition={{ delay: 0.6 }}
            >
              Connectez-vous pour gérer votre site
            </motion.p>
          </div>

          <motion.form 
            className="admin-login-form"
            onSubmit={handleSubmit}
            {...fadeIn}
            transition={{ delay: 0.8 }}
          >
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={isLoading}
                  aria-label="Adresse email"
                  aria-invalid={!!fieldErrors.email}
                  className={fieldErrors.email ? 'error' : ''}
                />
                {fieldErrors.email && (
                  <div className="field-error">
                    <FaExclamationTriangle />
                    <span>{fieldErrors.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={isLoading}
                  aria-label="Mot de passe"
                  aria-invalid={!!fieldErrors.password}
                  className={fieldErrors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {formData.password && (
                <motion.div 
                  className="password-strength"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill strength-${passwordStrength.score}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="strength-text">
                    <span className={`strength-level-${passwordStrength.score}`}>
                      {passwordStrength.level}
                    </span>
                    <span className="strength-feedback">{passwordStrength.feedback}</span>
                  </div>
                </motion.div>
              )}
              
              {fieldErrors.password && (
                <div className="field-error">
                  <FaExclamationTriangle />
                  <span>{fieldErrors.password}</span>
                </div>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkmark">
                  {rememberMe && <FaCheck />}
                </span>
                <span className="remember-text">Se souvenir de moi</span>
              </label>
              
              <a href="#forgot-password" className="forgot-password">
                Mot de passe oublié?
              </a>
            </div>

            <motion.button
              type="submit"
              className="admin-login-btn"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="btn-loading">
                  <div className="spinner"></div>
                  <span>Connexion...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="admin-login-footer"
            {...fadeIn}
            transition={{ delay: 1 }}
          >
            <div className="keyboard-shortcuts">
              <small>Raccourci: <kbd>Entrée</kbd> pour se connecter</small>
            </div>
            <p>© 2024 AmeenTECH - Interface d'administration</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;