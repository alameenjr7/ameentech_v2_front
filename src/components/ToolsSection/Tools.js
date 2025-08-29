import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiClient } from '../../apiConfig';
import './Tools.css';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await apiClient.get('/tools');
        setTools(response.data);
      } catch (err) {
        setError('Échec du chargement des outils. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,
      rotate: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  // Hide section if loading, error, or no data
  if (loading || error || !tools || tools.length === 0) {
    return null;
  }

  return (
    <section className="tools-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="tools-header"
        >
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            - Mes Outils Préférés
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
              Découvrez les Outils
            </motion.span><br />
            Derrière Mes Créations
          </motion.h2>
        </motion.div>

        <motion.div 
          className="tools-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {tools.map((tool, index) => (
            <motion.div 
              key={index} 
              className="tool-card"
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="tool-icon-container"
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.img 
                  src={tool.icon} 
                  alt={tool.name} 
                  className="tool-icon"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                />
                
                {/* Progress circle */}
                <motion.svg
                  className="progress-circle"
                  width="140"
                  height="140"
                  viewBox="0 0 140 140"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="65"
                    stroke="rgba(186, 220, 74, 0.2)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="65"
                    stroke="var(--brand-lime)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 65}`}
                    strokeDashoffset={`${2 * Math.PI * 65 * (1 - tool.percent / 100)}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 65 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 65 * (1 - tool.percent / 100)
                    }}
                    transition={{ 
                      delay: 0.6 + index * 0.1, 
                      duration: 1.5, 
                      ease: [0.4, 0, 0.2, 1] 
                    }}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px' }}
                  />
                </motion.svg>
              </motion.div>
              
              <motion.span 
                className="tool-percent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8 + index * 0.05, 
                  type: "spring", 
                  stiffness: 200 
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.05 }}
                >
                  {tool.percent}%
                </motion.span>
              </motion.span>
              
              <motion.span 
                className="tool-name"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
              >
                {tool.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Tools;
