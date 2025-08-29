import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaPaperPlane, FaComments, FaRocket, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { apiClient } from '../../apiConfig';
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
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');
    
    try {
      await apiClient.post('/contact', formData);
      setSubmitMessage('Message envoyé avec succès ! Nous vous répondrons bientôt.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        budget: '',
        country: '',
        message: '',
      });
    } catch (error) {
      setSubmitMessage('Échec de l\'envoi du message. Veuillez réessayer plus tard.');
      console.error('Contact form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FaPhone />, value: '+(221) 77-205-0626', label: 'Téléphone', color: 'var(--brand-purple)' },
    { icon: <FaEnvelope />, value: 'contact@ameenaltech.com', label: 'Email', color: 'var(--brand-cyan)' },
    { icon: <FaLinkedin />, value: 'AmeenTECH', label: 'LinkedIn', color: 'var(--brand-lime)' },
    { icon: <FaMapMarkerAlt />, value: 'Cite Soprim, Sur la BRT, FACE BIS', label: 'Adresse', color: 'var(--brand-purple)' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div 
          className="contact-header"
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
            <FaComments className="subtitle-icon" />
            Nous Contacter
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Construisons <motion.span 
              className="highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              Ensemble
            </motion.span>
          </motion.h2>
          <motion.p 
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Prêt à transformer vos idées en réalité ? Discutons de votre projet et créons quelque chose d'extraordinaire ensemble.
          </motion.p>
        </motion.div>

        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="contact-info"
            variants={contactInfoVariants}
          >
            <motion.div 
              className="contact-info-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>Prenez Contact</h3>
              <p>Nous sommes là pour donner vie à votre vision. Contactez-nous via l'un de ces canaux.</p>
            </motion.div>
            <motion.ul 
              className="contact-info-list"
              variants={containerVariants}
            >
              {contactInfo.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    x: 5,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="icon-container"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}80)` }}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="contact-info-text">
                    <span className="contact-label">{item.label}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="contact-form-container"
            variants={formVariants}
          >
            <motion.div 
              className="form-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="form-icon"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaRocket />
              </motion.div>
              <h3>Démarrez Votre Projet</h3>
              <p>Parlez-nous de votre vision et nous la concrétiserons</p>
            </motion.div>

            <motion.form 
              className="contact-form" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="form-row"
                variants={containerVariants}
              >
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="name">Votre Nom *</label>
                  <motion.input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Ex. Jean Dupont" 
                    required
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(186, 220, 74, 0.3)",
                      borderColor: "var(--brand-lime)"
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="email">Email *</label>
                  <motion.input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="exemple@gmail.com" 
                    required
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(52, 201, 244, 0.3)",
                      borderColor: "var(--brand-cyan)"
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="form-row"
                variants={containerVariants}
              >
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="phone">Téléphone *</label>
                  <motion.input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Entrez votre numéro de téléphone" 
                    required
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(117, 82, 229, 0.3)",
                      borderColor: "var(--brand-purple)"
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="interest">Je suis intéressé par *</label>
                  <motion.select 
                    id="interest" 
                    name="interest" 
                    value={formData.interest} 
                    onChange={handleChange} 
                    required
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(186, 220, 74, 0.3)",
                      borderColor: "var(--brand-lime)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">Sélectionner un service</option>
                    <option value="web-design">Conception Web</option>
                    <option value="web-development">Développement Web</option>
                    <option value="mobile-app">Application Mobile</option>
                    <option value="ui-ux">Design UI/UX</option>
                    <option value="consulting">Conseil</option>
                    <option value="other">Autre</option>
                  </motion.select>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="form-row"
                variants={containerVariants}
              >
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="budget">Fourchette budgétaire (F CFA) *</label>
                  <motion.select 
                    id="budget" 
                    name="budget" 
                    value={formData.budget} 
                    onChange={handleChange} 
                    required
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(52, 201, 244, 0.3)",
                      borderColor: "var(--brand-cyan)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">Sélectionner une fourchette budgétaire</option>
                    <option value="less-than-5k">Moins de 200 000 F CFA</option>
                    <option value="5k-10k">200 000 F CFA - 400 000 F CFA</option>
                    <option value="10k-25k">400 000 F CFA - 1 000 000 F CFA</option>
                    <option value="more-than-25k">1 000 000 F CFA et plus</option>
                  </motion.select>
                </motion.div>
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="country">Pays *</label>
                  <motion.select 
                    id="country" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    required
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(117, 82, 229, 0.3)",
                      borderColor: "var(--brand-purple)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">Sélectionner un pays</option>
                    <option value="senegal">Sénégal</option>
                    <option value="france">France</option>
                    <option value="usa">États-Unis</option>
                    <option value="canada">Canada</option>
                    <option value="uk">Royaume-Uni</option>
                    <option value="germany">Allemagne</option> 
                    <option value="italy">Italie</option>
                    <option value="spain">Espagne</option>
                    <option value="portugal">Portugal</option>
                    <option value="brazil">Brésil</option>
                    <option value="argentina">Argentine</option>
                    <option value="chile">Chile</option>
                    <option value="other">Autre</option>
                  </motion.select>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <label htmlFor="message">Votre Message *</label>
                <motion.textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Parlez-nous de votre projet, de votre calendrier et de toute exigence spécifique..." 
                  required
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(186, 220, 74, 0.3)",
                    borderColor: "var(--brand-lime)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              
              <motion.button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <motion.span 
                  className="btn-text"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? (
                    <motion.span 
                      className="loading-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        📤
                      </motion.span>
                      Envoi en cours...
                    </motion.span>
                  ) : (
                    <>
                      Envoyer le Message
                    </>
                  )}
                </motion.span>
                <motion.span 
                  className="btn-icon"
                  whileHover={{ 
                    rotate: 45,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <FaPaperPlane />
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {submitMessage && (
                  <motion.div 
                    className={`submit-message ${
                      submitMessage.includes('successfully') ? 'success' : 'error'
                    }`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.span 
                      className="message-icon"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                      {submitMessage.includes('successfully') ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    </motion.span>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {submitMessage}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
