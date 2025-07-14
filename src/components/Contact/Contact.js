import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    country: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: '',
      budget: '',
      country: '',
      message: '',
    });
  };

  const contactInfo = [
    { icon: <FaPhone />, value: '+(221) 77-205-0626' },
    { icon: <FaEnvelope />, value: 'contact@ameenaltech.com' },
    { icon: <FaLinkedin />, value: 'AmeenTECH' },
    { icon: <FaMapMarkerAlt />, value: 'Cite Soprim, Sur la BRT, FACE BIS' },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">- Contact Us</span>
            <h2 className="section-title">
              Let's Talk for <span className="highlight">Your Next Projects</span>
            </h2>
            <p className="contact-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </p>
            <ul className="contact-info-list">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <div className="icon-container">{item.icon}</div>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ex. John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone Number" required />
                </div>
                <div className="form-group">
                  <label htmlFor="interest">I'm Interested in *</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget Range (USD) *</label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange} required>
                    <option value="">Select Range</option>
                    <option value="less-than-5k"> $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="more-than-10k"> $10,000</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                    <option value="uk">UK</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Enter here.." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
                <span className="arrow-icon">
                  <FaArrowRight />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
