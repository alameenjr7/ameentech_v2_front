import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/projects/active');
        setProjects(response.data);
      } catch (err) {
        setError('Échec du chargement des projets. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Hide section if loading, error, or no data
  if (loading || error || !projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="header-text">
            <span className="section-subtitle">- Mon Portfolio</span>
            <h2 className="section-title">
              Mes Derniers <span className="highlight">Projets</span>
            </h2>
          </div>
          <motion.a 
            href="/#!" 
            className="btn portfolio-btn-primary"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Voir Tous les Projets
            <motion.span 
              className="arrow-icon"
              whileHover={{ 
                rotate: 45,
                transition: { duration: 0.2 }
              }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => {
            const imageUrl = project.image 
              ? `${API_BASE_URL.replace('/api', '')}/uploads/${project.image}`
              : '';

            return (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="project-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {imageUrl && (
                    <motion.img 
                      src={imageUrl} 
                      alt={project.title}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.6,
                        delay: index * 0.1 + 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    />
                  )}
                </motion.div>
                
                <motion.div 
                  className="project-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <motion.div 
                    className="project-tags"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project.tags && typeof project.tags === 'string' 
                      ? project.tags.split(',').map((tag, tagIndex) => (
                          <motion.span 
                            key={tagIndex} 
                            className="tag"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: index * 0.1 + 0.6 + tagIndex * 0.1,
                              type: "spring",
                              stiffness: 200
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {tag.trim()}
                          </motion.span>
                        ))
                      : null
                    }
                  </motion.div>

                  <motion.h3 
                    className="project-title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.a 
                    href={project.url} 
                    className="project-link"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowRight />
                  </motion.a>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
