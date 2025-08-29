import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCode, FaMobile, FaPalette, FaCog, FaRocket, FaBrush } from 'react-icons/fa';
import { apiClient } from '../../apiConfig';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get('/services/active');
        setServices(response.data);
      } catch (err) {
        setError('Échec du chargement des services. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading || error || !services || services.length === 0) {
    return null;
  }

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 15
        }
      }
    }
  };

  const iconMap = [
    FaPalette, FaCode, FaMobile, FaCog, FaRocket, FaBrush
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="services-header-content">
            <div>
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Nos services
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.span 
                  className="highlight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  Services
                </motion.span> que nous proposons
              </motion.h2>
            </div>
          </div>
          <motion.a 
            href="#all-services" 
            className="view-all-services"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              y: -3,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Voir tous les services
            </motion.span>
            <motion.span 
              className="view-all-services-icon"
              whileHover={{ 
                rotate: 45,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[index % iconMap.length];
            
            return (
              <motion.div
                key={index}
                className="service-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="service-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1, 
                    type: "spring", 
                    stiffness: 200,
                    duration: 0.6
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  {service.icon ? (
                    <motion.img 
                      src={service.icon} 
                      alt={service.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="font-size: 32px; color: var(--brand-purple);">💡</div>';
                      }}
                    />
                  ) : (
                    <motion.div 
                      style={{ fontSize: '32px', color: 'var(--brand-purple)' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <IconComponent />
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.h3 
                  className="service-title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  className="service-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  {service.description}
                </motion.p>
                
                <motion.a 
                  href={`/services/${service.id || index}`} 
                  className="learn-more"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    En savoir plus
                  </motion.span>
                  <motion.span
                    whileHover={{ 
                      rotate: 45,
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
