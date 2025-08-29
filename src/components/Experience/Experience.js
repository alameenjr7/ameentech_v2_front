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
    const fetchData = async () => {
      try {
        const [experiencesResponse, educationsResponse] = await Promise.all([
          apiClient.get('/work-experiences'),
          apiClient.get('/education')
        ]);
        setWorkExperiences(experiencesResponse.data);
        setEducations(educationsResponse.data);
      } catch (err) {
        setError('Échec du chargement des données d\'expérience et d\'éducation.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  // Hide section if loading, error, or no data in both arrays
  if (loading || error || (!workExperiences || workExperiences.length === 0) && (!educations || educations.length === 0)) {
    return null;
  }

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
          <span className="section-subtitle">- Éducation & Travail</span>
          <h2 className="section-title">
            Mon <span className="highlight">Parcours Académique et Professionnel</span>
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
              {educations.map((item) => (
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
              {workExperiences.map((item) => (
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
