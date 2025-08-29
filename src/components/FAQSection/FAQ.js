import React, { useState, useEffect } from 'react';
import { apiClient } from '../../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaLightbulb, FaChevronDown } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await apiClient.get('/faqs');
        setFaqs(response.data);
      } catch (err) {
        setError('Échec du chargement de la section FAQ. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30, 
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const answerVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -10
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        opacity: { delay: 0.1 }
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Hide section if loading, error, or no data
  if (loading || error || !faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="faq section">
      <div className="container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FaQuestionCircle className="subtitle-icon" />
            FAQs
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Des Questions ? <motion.span 
              className="highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              Regardez ici.
            </motion.span>
          </motion.h2>
          <motion.p 
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trouvez des réponses aux questions courantes sur nos services et processus
          </motion.p>
        </motion.div>

        <motion.div 
          className="faq-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="question-content">
                  <motion.div 
                    className="question-icon"
                    animate={{ 
                      rotate: activeIndex === index ? 360 : 0,
                      scale: activeIndex === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaLightbulb />
                  </motion.div>
                  <span className="question-text">{faq.question}</span>
                </div>
                <motion.span 
                  className="faq-toggle-icon"
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    scale: activeIndex === index ? 1.2 : 1
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ scale: 1.3 }}
                >
                  <FaChevronDown />
                </motion.span>
              </motion.div>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="faq-answer"
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div 
                      className="answer-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <div className="answer-icon">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                          ✨
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
