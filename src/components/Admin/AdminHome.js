import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaProjectDiagram, 
  FaBlog, 
  FaUsers, 
  FaEnvelope,
  FaEye,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaFileAlt
} from 'react-icons/fa';
import AdminDashboard from './AdminDashboard';
import { apiClient } from '../../apiConfig';
import './AdminHome.css';

const AdminHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    testimonials: 0,
    messages: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch statistics from different endpoints
      const [projectsRes, blogsRes, testimonialsRes, messagesRes] = await Promise.allSettled([
        apiClient.get('/portfolio'),
        apiClient.get('/blog'),
        apiClient.get('/testimonials'),
        apiClient.get('/contact')
      ]);

      setStats({
        projects: projectsRes.status === 'fulfilled' ? projectsRes.value.data.length || 0 : 0,
        blogs: blogsRes.status === 'fulfilled' ? blogsRes.value.data.length || 0 : 0,
        testimonials: testimonialsRes.status === 'fulfilled' ? testimonialsRes.value.data.length || 0 : 0,
        messages: messagesRes.status === 'fulfilled' ? messagesRes.value.data.length || 0 : 0
      });

      // Mock recent activity for demo
      setRecentActivity([
        { id: 1, type: 'message', title: 'Nouveau message reçu', time: '2 minutes ago', icon: FaEnvelope },
        { id: 2, type: 'blog', title: 'Article publié', time: '1 heure ago', icon: FaFileAlt },
        { id: 3, type: 'project', title: 'Projet mis à jour', time: '3 heures ago', icon: FaProjectDiagram },
        { id: 4, type: 'testimonial', title: 'Nouveau témoignage', time: '1 jour ago', icon: FaUsers }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Projets',
      value: stats.projects,
      icon: FaProjectDiagram,
      color: 'purple',
      change: '+2 ce mois'
    },
    {
      title: 'Articles de blog',
      value: stats.blogs,
      icon: FaBlog,
      color: 'cyan',
      change: '+1 cette semaine'
    },
    {
      title: 'Témoignages',
      value: stats.testimonials,
      icon: FaUsers,
      color: 'lime',
      change: '+3 ce mois'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: FaEnvelope,
      color: 'dark',
      change: '+5 aujourd\'hui'
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <AdminDashboard currentSection="dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </AdminDashboard>
    );
  }

  return (
    <AdminDashboard currentSection="dashboard">
      <div className="admin-home">
        <motion.div className="dashboard-header" {...fadeIn}>
          <h2>Tableau de bord</h2>
          <p>Vue d'ensemble de votre site web</p>
        </motion.div>

        <motion.div 
          className="stats-grid"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`stats-card ${card.color}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="card-header">
                <div className="card-info">
                  <h3>{card.title}</h3>
                  <div className="card-value">{card.value}</div>
                  <div className="card-change">{card.change}</div>
                </div>
                <div className="card-icon">
                  <card.icon />
                </div>
              </div>
              <div className="card-trend">
                <FaChartLine className="trend-icon" />
                <span>Voir détails</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="dashboard-content">
          <motion.div 
            className="activity-section"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h3>Activité récente</h3>
              <FaClock className="section-icon" />
            </div>
            
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="activity-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className={`activity-icon ${activity.type}`}>
                    <activity.icon />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                  <FaCheckCircle className="activity-status" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="quick-actions"
            {...fadeIn}
            transition={{ delay: 0.6 }}
          >
            <div className="section-header">
              <h3>Actions rapides</h3>
              <FaEye className="section-icon" />
            </div>
            
            <div className="actions-grid">
              <motion.a 
                href="/admin/settings"
                className="action-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="action-icon purple">
                  <FaProjectDiagram />
                </div>
                <div className="action-content">
                  <h4>Gérer les paramètres</h4>
                  <p>Modifier les informations du site</p>
                </div>
              </motion.a>

              <motion.a 
                href="/admin/portfolio"
                className="action-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="action-icon cyan">
                  <FaBlog />
                </div>
                <div className="action-content">
                  <h4>Ajouter un projet</h4>
                  <p>Publier un nouveau projet</p>
                </div>
              </motion.a>

              <motion.a 
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="action-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="action-icon lime">
                  <FaEye />
                </div>
                <div className="action-content">
                  <h4>Voir le site</h4>
                  <p>Aperçu en direct</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default AdminHome;