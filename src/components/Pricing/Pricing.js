import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRegGem, FaRegStar, FaRegPaperPlane } from 'react-icons/fa';
import './Pricing.css';

const Pricing = () => {
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 25,
      features: [
        'UI/UX Design',
        'Web Development',
        'App Design',
        'SEO Marketing',
      ],
      icon: <FaRegPaperPlane />,
      popular: false,
    },
    {
      id: 2,
      name: 'Standard',
      price: 55,
      features: [
        'UI/UX Design',
        'Web Development',
        'App Design',
        'SEO Marketing',
        'Business Analysis',
      ],
      icon: <FaRegStar />,
      popular: true,
    },
    {
      id: 3,
      name: 'Premium',
      price: 85,
      features: [
        'UI/UX Design',
        'Web Development',
        'App Design',
        'SEO Marketing',
        'Business Analysis',
        'Digital Marketing',
      ],
      icon: <FaRegGem />,
      popular: false,
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
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              variants={itemVariants}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="card-header">
                <div className="card-icon">{plan.icon}</div>
                <h3 className="plan-name">{plan.name}</h3>
              </div>
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <FaCheck className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary">Choose Plan</button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
