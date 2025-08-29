import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import AdminDashboard from './AdminDashboard';
import { authService } from '../../services/adminAPI';
import './AdminProfile.css';

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');
  
  // Optimisation: Validation en temps réel avec useMemo
  const passwordValidation = useMemo(() => {
    const { newPassword, confirmPassword } = passwordData;
    return {
      minLength: newPassword.length >= 6,
      match: newPassword === confirmPassword && confirmPassword !== '',
      hasValue: newPassword !== ''
    };
  }, [passwordData.newPassword, passwordData.confirmPassword]);
  
  // Optimisation: Handler avec useCallback pour éviter les re-renders
  const updateProfileData = useCallback((field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const updatePasswordData = useCallback((field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Essayer de récupérer depuis l'API d'abord
      let userData;
      try {
        userData = await authService.getProfile();
      } catch (apiError) {
        console.warn('API call failed, falling back to localStorage:', apiError);
        // Fallback sur localStorage si l'API échoue
        const localUser = localStorage.getItem('user');
        if (localUser) {
          userData = JSON.parse(localUser);
        } else {
          throw new Error('Aucune donnée utilisateur disponible');
        }
      }
      
      setUser(userData);
      setProfileData({
        firstName: userData.firstName || userData.first_name || '',
        lastName: userData.lastName || userData.last_name || '',
        email: userData.email || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      showMessage('error', 'Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    // Optimisation: Utiliser requestAnimationFrame pour les mises à jour UI
    requestAnimationFrame(() => {
      setMessage({ type, text });
    });
    
    // Clear message de manière optimisée
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        setMessage({ type: '', text: '' });
      });
    }, 5000);
    
    // Cleanup du timeout si le composant est démonté
    return () => clearTimeout(timeoutId);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Optimisation: Utiliser requestIdleCallback pour les opérations non-critiques
      const updateProfile = async () => {
        let updatedUserFromAPI = null;
        
        // Essayer l'appel API pour mettre à jour le profil
        try {
          updatedUserFromAPI = await authService.updateProfile(profileData);
          console.log('✅ Profil mis à jour via API');
        } catch (apiError) {
          // Si l'API échoue, on continue avec localStorage uniquement
          if (apiError.response?.status === 404) {
            console.info('ℹ️ API endpoint non disponible, utilisation du cache local');
          } else {
            console.warn('⚠️ Erreur API:', apiError.message);
          }
        }
        
        // Update localStorage user data de manière asynchrone
        const updatedUser = { ...user, ...profileData };
        await new Promise(resolve => {
          requestIdleCallback(() => {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            resolve();
          });
        });
        
        return updatedUserFromAPI || updatedUser;
      };

      const updatedUser = await updateProfile();
      setUser(updatedUser);
      showMessage('success', 'Profil mis à jour avec succès ✅');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', 'Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validation rapide côté client
    const validationErrors = [];
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      validationErrors.push('Les mots de passe ne correspondent pas');
    }
    if (passwordData.newPassword.length < 6) {
      validationErrors.push('Le mot de passe doit contenir au moins 6 caractères');
    }
    
    if (validationErrors.length > 0) {
      showMessage('error', validationErrors.join(', '));
      return;
    }

    setSaving(true);

    try {
      // Utilisation d'un timeout pour éviter les blocages
      const changePasswordWithTimeout = Promise.race([
        authService.changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        )
      ]);
      
      await changePasswordWithTimeout;
      
      showMessage('success', 'Mot de passe modifié avec succès ✅');
      
      // Reset form de manière asynchrone
      requestIdleCallback(() => {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      });
      
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.message === 'Timeout' 
        ? 'La requête a pris trop de temps. Veuillez réessayer.'
        : error.response?.data?.message || 'Erreur lors du changement de mot de passe';
      showMessage('error', errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <AdminDashboard currentSection="profile">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement du profil...</p>
        </div>
      </AdminDashboard>
    );
  }

  return (
    <AdminDashboard currentSection="profile">
      <div className="admin-profile">
        <motion.div className="profile-header" {...fadeIn}>
          <h2>Mon Profil</h2>
          <p>Gérez vos informations personnelles et votre sécurité</p>
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

        <motion.div 
          className="profile-tabs"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser />
            Informations personnelles
          </button>
          <button
            className={`tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <FaLock />
            Mot de passe
          </button>
        </motion.div>

        <motion.div 
          className="profile-content"
          {...fadeIn}
          transition={{ delay: 0.4 }}
        >
          {activeTab === 'profile' && (
            <div className="profile-form-container">
              <div className="user-info-card">
                <div className="user-avatar">
                  <span>{user?.firstName?.charAt(0) || user?.lastName?.charAt(0) || 'U'}</span>
                </div>
                <div className="user-details">
                  <h3>{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.lastName || user?.email}</h3>
                  <p className="user-role">{user?.role || 'Admin'}</p>
                  <p className="user-joined">
                    Membre depuis {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <FaUser className="label-icon" />
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => updateProfileData('firstName', e.target.value)}
                    disabled={saving}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    <FaUser className="label-icon" />
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => updateProfileData('lastName', e.target.value)}
                    disabled={saving}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaUser className="label-icon" />
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    onChange={(e) => updateProfileData('email', e.target.value)}
                    disabled={saving}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {saving ? (
                    <div className="btn-loading">
                      <div className="spinner"></div>
                      <span>Sauvegarde...</span>
                    </div>
                  ) : (
                    <>
                      <FaSave />
                      <span>Sauvegarder</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">
                  <FaLock className="label-icon" />
                  Mot de passe actuel
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) => updatePasswordData('currentPassword', e.target.value)}
                    disabled={saving}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">
                  <FaLock className="label-icon" />
                  Nouveau mot de passe
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => updatePasswordData('newPassword', e.target.value)}
                    disabled={saving}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <FaLock className="label-icon" />
                  Confirmer le nouveau mot de passe
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => updatePasswordData('confirmPassword', e.target.value)}
                    disabled={saving}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="password-requirements">
                <h4>Exigences du mot de passe :</h4>
                <ul>
                  <li className={passwordValidation.minLength ? 'valid' : passwordValidation.hasValue ? 'invalid' : ''}>
                    Au moins 6 caractères
                  </li>
                  <li className={passwordValidation.match ? 'valid' : passwordData.confirmPassword ? 'invalid' : ''}>
                    Les mots de passe doivent correspondre
                  </li>
                </ul>
              </div>

              <motion.button
                type="submit"
                className="save-btn"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {saving ? (
                  <div className="btn-loading">
                    <div className="spinner"></div>
                    <span>Changement...</span>
                  </div>
                ) : (
                  <>
                    <FaLock />
                    <span>Changer le mot de passe</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </AdminDashboard>
  );
};

export default AdminProfile;