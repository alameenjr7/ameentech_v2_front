import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const education = [
    {
      id: 1,
      period: '2012 - 2014',
      institution: 'Harmony Institute',
      degree: 'Master in Visual Arts',
    },
    {
      id: 2,
      period: '2008 - 2012',
      institution: 'Aurora Academy',
      degree: 'Master in Visual Arts',
    },
    {
      id: 3,
      period: '1996 - 2008',
      institution: 'Crystalbrook',
      degree: 'Master in Visual Arts',
    },
  ];

  const workExperience = [
    {
      id: 1,
      period: '2018 - 2024',
      company: 'Insightlancer',
      role: 'Master in Visual Arts',
    },
    {
      id: 2,
      period: '2016 - 2018',
      company: 'Self-Employed',
      role: 'Master in Visual Arts',
    },
    {
      id: 3,
      period: '2014 - 2016',
      company: 'KG Graphics Studio',
      role: 'Master in Visual Arts',
    },
  ];

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
              {education.map((item) => (
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
              {workExperience.map((item) => (
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
