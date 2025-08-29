import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaYoutube, FaTwitter, FaPaperPlane, FaLinkedin, FaWhatsapp, FaTelegram, FaArrowUp } from 'react-icons/fa';
import './Footer.css';
import { apiClient } from '../../apiConfig';

const Footer = () => {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get('/settings');
        // The API returns an array, we'll take the first and most recent entry.
        if (response.data && response.data.length > 0) {
          const latestSettings = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
          setSettings(latestSettings);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Veuillez saisir une adresse email valide.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await apiClient.post('/mailing', { email });
      setMessage('Merci pour votre abonnement !');
      setEmail('');
    } catch (error) {
      setMessage('Échec de l\'abonnement. Veuillez réessayer plus tard.');
      console.error('Newsletter submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = {
    facebook: <FaFacebookF />,
    // behance: <FaBehance />,
    youtube: <FaYoutube />,
    twitter: <FaTwitter />,
    // instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    whatsapp: <FaWhatsapp />,
    telegram: <FaTelegram />,
    // tiktok: <FaTiktok />,
  };

  // Dynamically create social links based on fetched data
  const socialLinks = settings ? Object.entries(socialIcons)
    .map(([key, icon]) => ({
      name: key,
      url: settings[key],
      icon: icon,
    }))
    .filter(link => link.url) : []; // Filter out links that are not provided

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

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a href="/" className="footer-logo">
                <span className="logo-icon">AT</span> {settings?.title || 'AmeenTECH.'}
              </a>
              <p className="footer-description">
                {settings?.slogan || "En tant qu'entreprise de développement de logiciels, de site web, d'application web/mobile, nous combinons le meilleur des deux mondes."}
              </p>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-list">
                <li><a href="#hero">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">À Propos</a></li>
                <li><a href="#portfolio">Projets</a></li>
                <li><a href="#news">Blog</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              {settings ? (
                <ul className="footer-list">
                  <li>{settings.phone}</li>
                  <li>{settings.domain}</li>
                  <li>{settings.email}</li>
                  <li>{settings.address}</li>
                </ul>
              ) : (
                <ul className="footer-list">
                  <li>+221 772050626</li>
                  <li>www.ameenaltech.com</li>
                  <li>contact@ameenaltech.com</li>
                  <li>Cite Soprim, sur la BRT, Face BIS</li>
                </ul>
              )}
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Restez Informé</h4>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Adresse email" 
                  className="newsletter-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" className="newsletter-btn" disabled={loading}>
                  <FaPaperPlane />
                </button>
              </form>
              {message && <p className="newsletter-message">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className="footer-bottom-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p 
              className="copyright"
              variants={itemVariants}
            >
              <motion.span 
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Fait par
              </motion.span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ display: 'inline-block', margin: '0 4px' }}
              >
                ❤️
              </motion.span>
              <span className="highlight">{settings?.title || 'AmeenTECH'}</span> © {new Date().getFullYear()}
            </motion.p>
            
            <motion.div 
              className="legal-links"
              variants={containerVariants}
            >
              {[
                { href: "/terms-of-service", text: "Conditions d'Utilisation" },
                { href: "/privacy-policy", text: "Politique de Confidentialité" },
                { href: "/cookie-policy", text: "Politique des Cookies" }
              ].map((link, index) => (
                <motion.a 
                  key={link.text}
                  href={link.href}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -2,
                    color: "var(--brand-lime)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {link.text}
                </motion.a>
              ))}
            </motion.div>
            
            <motion.button 
              className="scroll-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.1,
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.span
                animate={{ 
                  y: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaArrowUp />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
