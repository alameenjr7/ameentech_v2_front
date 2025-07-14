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
        setError('Failed to fetch pricing plans.');
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
    <section id="pricing" className="pricing section">
      <div className="container">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">- My Pricing</span>
          <h2 className="section-title">
            My <span className="highlight">Best Pricing</span> Plan
          </h2>
        </motion.div>

        <motion.div
          className="pricing-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading && <p>Loading pricing plans...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && pricingPlans.map((plan) => {
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
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="card-header">
                  <div className="card-icon">
                    {iconMap[plan.icon] || <FaGem />}
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                </div>
                <div className="plan-price">
                  <span className="price">${plan.price}</span>
                  <span className="period">/month</span>
                </div>
                <ul className="features-list">
                  {featuresList.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <FaCheck className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary">Choose Plan</button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
