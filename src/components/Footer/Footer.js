import React from 'react';
import { FaFacebookF, FaBehance, FaYoutube, FaTwitter, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com' },
    { icon: <FaBehance />, url: 'https://behance.net' },
    { icon: <FaYoutube />, url: 'https://youtube.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a href="/" className="footer-logo">
                <span className="logo-icon">B</span> Baaba.
              </a>
              <p className="footer-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer">
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
              <ul className="footer-list">
                <li>+221 772050626</li>
                <li>www.ameenaltech.com</li>
                <li>contact@ameenaltech.com</li>
                <li>Cite Soprim, sur la BRT, Face BIS</li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Get the latest information</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Email address" className="newsletter-input" />
                <button type="submit" className="newsletter-btn">
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Copyright © 2024 <span className="highlight">Baaba</span>. All Rights Reserved.
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
