import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaPlay, 
  FaLocationArrow, 
  FaArrowDown,
  FaCode,
  FaMobile,
  FaLaptop,
  FaRocket,
  FaStar
} from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Hero.css';
import { apiClient } from '../../apiConfig';

const Hero = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Animated words for the subtitle
  const animatedWords = [
    "développement web moderne",
    "applications mobiles natives", 
    "solutions cloud scalables",
    "expériences utilisateur exceptionnelles",
    "architectures microservices"
  ];

  // Statistics data
  const stats = [
    { icon: FaCode, number: "50+", label: "Projets Réalisés" },
    { icon: FaMobile, number: "30+", label: "Apps Mobiles" },
    { icon: FaLaptop, number: "25+", label: "Sites Web" },
    { icon: FaRocket, number: "98%", label: "Satisfaction Client" }
  ];

  const fetchSettings = useCallback(async () => {
    try {
      const response = await apiClient.get('/settings');
      if (response.data && response.data.length > 0) {
        const latestSettings = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
        setSettings(latestSettings);
      }
    } catch (error) {
      setError('Échec du chargement des paramètres.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
    setIsVisible(true);
    
    // Animated words rotation
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchSettings, animatedWords.length]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <section id="hero" className="hero hero-loading-state">
        <div className="container">
          <div className="hero-loading">
            <motion.div 
              className="spinner-enhanced"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Chargement de l'excellence...
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="hero" className="hero hero-error-state">
        <div className="container">
          <motion.div 
            className="hero-error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Oups! Une erreur s'est produite</h2>
            <p>{error}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="retry-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réessayer
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="hero">
      {/* Enhanced Background Elements */}
      <div className="hero-background">
        <motion.div 
          className="bg-shape shape-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape shape-2"
          animate={{ 
            rotate: [360, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="bg-shape shape-3"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          style={{ 
            y: yTransform,
            opacity: opacityTransform 
          }}
        >
          <div className="hero-text">
            {/* Enhanced Welcome Badge */}
            <motion.div 
              className="hero-welcome-container"
              variants={itemVariants}
            >
              <div className="hero-welcome">
                <span className="welcome-emoji">👋</span>
                <span className="welcome-text">
                  {settings?.welcome_text || 'Salut! Bienvenue chez'}
                </span>
                <motion.div
                  className="welcome-shine"
                  animate={{ x: [-100, 400] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Enhanced Title with Gradient Text */}
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Nous créons des 
              <span className="title-gradient">
                {settings?.title || 'AmeenTECH'}
              </span>
              <motion.span
                className="title-cursor"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h1>
            
            {/* Dynamic Animated Subtitle */}
            <motion.h2 
              className="hero-subtitle"
              variants={itemVariants}
            >
              Spécialisés en{' '}
              <motion.span
                key={currentWordIndex}
                className="animated-word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {animatedWords[currentWordIndex]}
              </motion.span>
            </motion.h2>
            
            {/* Enhanced Description */}
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              {settings?.description || "Transformons vos idées en solutions digitales innovantes. Notre équipe d'experts développe des applications web et mobiles sur mesure qui propulsent votre entreprise vers le succès."}
            </motion.p>

            {/* Statistics Cards */}
            <motion.div 
              className="hero-stats"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="stat-icon" />
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="hero-cta"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="portfolio"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="btn hero-btn-primary"
                >
                  <span className="btn-text">Découvrir Nos Réalisations</span>
                  <motion.span 
                    className="btn-icon"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FaPlay />
                  </motion.span>
                  <div className="btn-shimmer" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="btn hero-btn-outline"
                >
                  Démarrer Votre Projet
                  <motion.div
                    className="btn-glow"
                    animate={{ 
                      boxShadow: [
                        "0 0 5px rgba(117, 82, 229, 0.3)",
                        "0 0 20px rgba(117, 82, 229, 0.5)",
                        "0 0 5px rgba(117, 82, 229, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="scroll-indicator"
              variants={itemVariants}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Découvrir</span>
              <FaArrowDown />
            </motion.div>
          </div>

          {/* Enhanced Hero Image with 3D Effects */}
          <motion.div 
            className="hero-image"
            variants={itemVariants}
          >
            <motion.div 
              className="hero-image-container"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="image-glow-effect" />
              
              <motion.div 
                className="hero-image-circle"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 15,
                  rotateX: 5
                }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src={settings?.logo_2 || '/images/hero-illustration.svg'}
                  alt="AmeenTECH - Solutions Digitales Innovantes" 
                  className="hero-profile-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-hero.svg';
                  }}
                />
                
                {/* Orbital Elements */}
                <motion.div
                  className="orbital-element element-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <FaCode />
                </motion.div>
                
                <motion.div
                  className="orbital-element element-2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <FaMobile />
                </motion.div>
                
                <motion.div
                  className="orbital-element element-3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <FaRocket />
                </motion.div>
              </motion.div>

              {/* Enhanced Floating Badges */}
              <motion.div 
                className="floating-badge badge-contact"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 0.5 
                }}
              >
                <svg className="badge-text-svg" viewBox="0 0 120 120">
                  <defs>
                    <path id="circle-path-contact" d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                  </defs>
                  <text className="badge-text">
                    <textPath href="#circle-path-contact" startOffset="0%">
                      • CONTACTEZ-NOUS • DÉMARRONS ENSEMBLE •
                    </textPath>
                  </text>
                </svg>
                <div className="badge-icon">
                  <FaLocationArrow />
                </div>
                <div className="badge-pulse" />
              </motion.div>
              
              <motion.div 
                className="floating-badge badge-expertise"
                whileHover={{ scale: 1.1, rotate: -5 }}
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity,
                  delay: 1 
                }}
              >
                <FaStar className="badge-star" />
                <span>Expert</span>
                <span>Full-Stack</span>
              </motion.div>
              
              <motion.div 
                className="floating-badge badge-innovation"
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity,
                  delay: 1.5 
                }}
              >
                <FaRocket className="badge-rocket" />
                <span>Innovation</span>
                <span>& Performance</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Particle System */}
      <div className="particle-system">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [window.innerHeight, -100]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;