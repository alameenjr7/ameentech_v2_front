import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCog, 
  FaUsers, 
  FaProjectDiagram, 
  FaBlog, 
  FaEnvelope, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartBar,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaQuestionCircle,
  FaServicestack,
  FaUser,
  FaTextWidth
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = ({ children, currentSection = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: FaChartBar, path: '/admin/dashboard' },
    { id: 'settings', label: 'Paramètres', icon: FaCog, path: '/admin/settings' },
    { id: 'projects', label: 'Projets', icon: FaProjectDiagram, path: '/admin/projects' },
    { id: 'services', label: 'Services', icon: FaServicestack, path: '/admin/services' },
    { id: 'blog', label: 'Blog', icon: FaBlog, path: '/admin/blog' },
    { id: 'testimonials', label: 'Témoignages', icon: FaUsers, path: '/admin/testimonials' },
    { id: 'contacts', label: 'Messages', icon: FaEnvelope, path: '/admin/contacts' },
    { id: 'users', label: 'Utilisateurs', icon: FaUsers, path: '/admin/users' },
    { id: 'tools', label: 'Outils', icon: FaTools, path: '/admin/tools' },
    { id: 'education', label: 'Formation', icon: FaGraduationCap, path: '/admin/education' },
    { id: 'experience', label: 'Expérience', icon: FaBriefcase, path: '/admin/experience' },
    { id: 'marquees', label: 'Marquees', icon: FaTextWidth, path: '/admin/marquees' },
    { id: 'faq', label: 'FAQ', icon: FaQuestionCircle, path: '/admin/faq' }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="admin-dashboard">
      <motion.aside 
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <div className="admin-logo">
            <div className="logo-circle">
              <span>A</span>
            </div>
            <div className="logo-text">
              <h3>AmeenTECH</h3>
              <span>Admin</span>
            </div>
          </div>
          
          <button 
            className="sidebar-close md-hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <motion.li 
                key={item.id}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a 
                  href={item.path}
                  className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                >
                  <item.icon className="nav-icon" />
                  <span className="nav-text">{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <span>{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Utilisateur'}</span>
              <span className="user-role">{user?.role || 'Admin'}</span>
            </div>
          </div>
          
          <div className="sidebar-footer-actions">
            <motion.a
              href="/admin/profile"
              className="profile-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUser />
              <span>Profil</span>
            </motion.a>
            
            <motion.button 
              className="logout-btn"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>

      <div className="admin-main">
        <motion.header 
          className="admin-header"
          {...fadeIn}
        >
          <div className="header-left">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
            <h1 className="page-title">
              {menuItems.find(item => item.id === currentSection)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="header-right">
            <div className="header-user">
              <div className="user-avatar">
                <span>{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <span className="user-greeting">Bonjour, {user?.name || 'Admin'}</span>
            </div>
          </div>
        </motion.header>

        <motion.main 
          className="admin-content"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.main>
      </div>

      {sidebarOpen && (
        <motion.div 
          className="sidebar-overlay md-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;