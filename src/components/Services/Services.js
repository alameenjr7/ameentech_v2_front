import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '/images/services/ux.png',
      title: 'UI/UX Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ...'
    },
    {
      icon: '/images/services/app-design.png',
      title: 'Application Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ...'
    },
    {
      icon: '/images/services/web-design.png',
      title: 'Website Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ...'
    }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="services-header-content">
            <div>
              <span className="section-subtitle">- Services</span>
              <h2 className="section-title"><span className="highlight">Services</span> I Provide</h2>
            </div>
            <a href="/#!" className="btn services-btn-primary">
              View All Services <FaArrowRight />
            </a>
          </div>
        </motion.div>


        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href="/#!" className="learn-more">
                Learn more <FaArrowRight />
              </a>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
