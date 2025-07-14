import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'Beauty Product - Ecommerce Mobile App Solution',
      tags: ['UI/UX Design', 'App Design', 'Wireframe'],
      image: '/images/project-1.png',
      url: '/#!',
    },
    {
      id: 2,
      title: 'Beauty Product Mobile App Landing Page Design',
      tags: ['UI/UX Design', 'Web Design', 'Wireframe'],
      image: '/images/project-2.png',
      url: '/#!',
    },
    {
      id: 3,
      title: 'Coffee Shop App - Coffee Ordering App Solution',
      tags: ['UI/UX Design', 'App Design', 'Wireframe'],
      image: '/images/project-3.png',
      url: '/#!',
    },
    {
      id: 4,
      title: 'Coffee Shop Mobile App Landing Page Design',
      tags: ['UI/UX Design', 'Web Design', 'Wireframe'],
      image: '/images/project-4.png',
      url: '/#!',
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <a href={project.url} className="project-link">
                  <FaArrowRight />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
