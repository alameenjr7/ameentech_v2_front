import React, { useState, useEffect } from 'react';
import { apiClient } from '../../apiConfig';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaStar, FaGem } from 'react-icons/fa';
import './Pricing.css';

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map string names from API to actual React components
  const iconMap = {
    '<FaArrowRight />': <FaArrowRight />,
    '<FaStar />': <FaStar />,
    '<FaGem />': <FaGem />,
  };

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await apiClient.get('/pricing-plans');
        setPricingPlans(response.data);
      } catch (err) {
        setError('Failed to load pricing plans. Please try refreshing the page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
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
      },
    },
  };

  // Hide section if loading, error, or no data
  if (loading || error || !pricingPlans || pricingPlans.length === 0) {
    return null;
  }

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">- Mes Tarifs</span>
          <h2 className="section-title">
            Mes <span className="highlight">Meilleurs Tarifs</span> de Plan
          </h2>
        </motion.div>

        <motion.div
          className="pricing-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingPlans.map((plan) => {
            let featuresList = [];
            if (plan.features && typeof plan.features === 'string') {
              try {
                featuresList = JSON.parse(plan.features);
              } catch (e) {
                console.error("Failed to parse features:", e);
              }
            }
            
            return (
              <motion.div
                key={plan.id}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                variants={itemVariants}
                whileHover={{ 
                  y: -20,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.popular && (
                  <motion.div 
                    className="popular-badge"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.5, 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      transition: { duration: 0.2 } 
                    }}
                  >
                    Plus Populaire
                  </motion.div>
                )}
                
                <motion.div 
                  className="card-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="card-icon"
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.2,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {iconMap[plan.icon] || <FaGem />}
                  </motion.div>
                  <motion.h3 
                    className="plan-name"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {plan.name}
                  </motion.h3>
                </motion.div>
                
                <motion.div 
                  className="plan-price"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <motion.span 
                    className="price"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    ${plan.price}
                  </motion.span>
                  <span className="period">/mois</span>
                </motion.div>
                
                <motion.ul 
                  className="features-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {featuresList.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="feature-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ 
                        x: 5, 
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <FaCheck className="check-icon" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button 
                  className="btn btn-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choisir le Plan
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
