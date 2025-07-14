import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaLocationArrow } from 'react-icons/fa';

import { Link } from 'react-scroll';
import './Hero.css';

const Hero = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <motion.span 
              className="hero-welcome"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Hello There!
            </motion.span>
            
            <motion.h1 
              className="hero-title"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              I'm <span className="highlight">Baba NGOM,</span>
            </motion.h1>
            
            <motion.h2 
              className="hero-subtitle"
              {...fadeIn}
              transition={{ delay: 0.6 }}
            >
              Product Designer Based in USA.
            </motion.h2>
            
            <motion.p 
              className="hero-description"
              {...fadeIn}
              transition={{ delay: 0.8 }}
            >
              I'm an experienced Product Designer with 18+ years in the field, collaborating with various companies and startups.
            </motion.p>

            
            <motion.div 
              className="hero-cta"
              {...fadeIn}
              transition={{ delay: 1 }}
            >
              <Link
                to="portfolio"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn hero-btn-primary"
              >
                <span className="btn-text">View My Portfolio</span>
                <span className="btn-icon">
                  <FaPlay />
                </span>
              </Link>
              
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn hero-btn-outline"
              >
                Hire Me
              </Link>
            </motion.div>

          </div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="hero-image-container">
              <div className="hero-image-circle">
                <img 
                  src="/images/hero-profile.png" 
                  alt="Baba NGOM - Product Designer" 
                  className="hero-profile-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="hire-me-badge">
                <div className="hire-me-text-wrapper">
                  <p className="hire-me-text">
                    • HIRE ME • HIRE ME • HIRE ME
                  </p>
                </div>
                <div className="hire-me-icon">
                  <FaLocationArrow />
                </div>
              </div>
              <div className="ui-ux-badge">
                <span>UI/UX Designer</span>
              </div>
              <div className="product-designer-badge">
                <span>Product Designer</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
