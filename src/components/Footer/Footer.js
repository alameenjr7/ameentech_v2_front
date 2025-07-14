import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaBehance, FaYoutube, FaTwitter, FaInstagram, FaPaperPlane, FaLinkedin, FaWhatsapp, FaTelegram, FaTiktok } from 'react-icons/fa';
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
      setMessage('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await apiClient.post('/mailing', { email });
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Failed to subscribe. Please try again later.');
      console.error('Newsletter submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = {
    facebook: <FaFacebookF />,
    behance: <FaBehance />,
    youtube: <FaYoutube />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    whatsapp: <FaWhatsapp />,
    telegram: <FaTelegram />,
    tiktok: <FaTiktok />,
  };

  // Dynamically create social links based on fetched data
  const socialLinks = settings ? Object.entries(socialIcons)
    .map(([key, icon]) => ({
      name: key,
      url: settings[key],
      icon: icon,
    }))
    .filter(link => link.url) : []; // Filter out links that are not provided

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
                <li><a href="#hero">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#portfolio">Projects</a></li>
                <li><a href="#news">Blogs</a></li>
                <li><a href="#faq">FAQs</a></li>
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
              <h4 className="footer-title">Get the latest information</h4>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Email address" 
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

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Copyright © {new Date().getFullYear()} <span className="highlight">{settings?.title || 'AmeenTECH'}</span>. All Rights Reserved.
          </p>
          <div className="legal-links">
            <a href="#!">User Terms & Conditions</a>
            <a href="#!">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
