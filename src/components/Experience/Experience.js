import React, { useState, useEffect } from 'react';
import { apiClient } from '../../apiConfig';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await apiClient.get('/work-experiences');
        setWorkExperiences(response.data);
      } catch (err) {
        setError('Failed to fetch Experience.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await apiClient.get('/education');
        setEducations(response.data);
      } catch (err) {
        setError('Failed to fetch Education.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
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
    <section id="experience" className="experience section">
      <div className="container">
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">- Education & Work</span>
          <h2 className="section-title">
            My <span className="highlight">Academic and Professional</span> Journey
          </h2>
        </motion.div>

        <div className="experience-content">
          <motion.div
            className="experience-card"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="card-header">
              <div className="card-icon">
                <FaGraduationCap />
              </div>
              <h3 className="card-title">Education</h3>
            </div>
            <div className="timeline">
              {loading && <p>Loading Education...</p>}
              {error && <p>{error}</p>}
              {!loading && !error && educations.map((item) => (
                <motion.div key={item.id} className="timeline-item" variants={itemVariants}>
                  <span className="timeline-period">{item.period}</span>
                  <h4 className="timeline-title">{item.institution}</h4>
                  <p className="timeline-subtitle">{item.degree}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="experience-card"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="card-header">
              <div className="card-icon">
                <FaBriefcase />
              </div>
              <h3 className="card-title">Work Experience</h3>
            </div>
            <div className="timeline">
              {loading && <p>Loading workExperiences...</p>}
              {error && <p>{error}</p>}
              {!loading && !error && workExperiences.map((item) => (
                <motion.div key={item.id} className="timeline-item" variants={itemVariants}>
                  <span className="timeline-period">{item.period}</span>
                  <h4 className="timeline-title">{item.company}</h4>
                  <p className="timeline-subtitle">{item.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
