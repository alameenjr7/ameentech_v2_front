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
        setError('Failed to fetch projects.');
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
            <span className="section-subtitle">- My Portfolio</span>
            <h2 className="section-title">
              My Latest <span className="highlight">Projects</span>
            </h2>
          </div>
          <a href="/#!" className="btn portfolio-btn-primary">
            View All Projects
            <span className="arrow-icon">
              <FaArrowRight />
            </span>
          </a>
        </motion.div>

        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading && <p>Loading projects...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && projects.map((project) => {
            const imageUrl = project.image 
              ? `${API_BASE_URL.replace('/api', '')}/uploads/${project.image}`
              : '';

            return (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
              >
                <div className="project-image">
                  {imageUrl && <img src={imageUrl} alt={project.title} />}
                </div>
                <div className="project-content">
                  <div className="project-tags">
                    {project.tags && typeof project.tags === 'string' 
                      ? project.tags.split(',').map((tag, index) => (
                          <span key={index} className="tag">
                            {tag.trim()}
                          </span>
                        ))
                      : null
                    }
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <a href={project.url} className="project-link">
                    <FaArrowRight />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
