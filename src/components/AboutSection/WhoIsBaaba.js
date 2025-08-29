import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './WhoIsBaaba.css';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import { FaDownload } from 'react-icons/fa';

const WhoIsBaaba = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await apiClient.get('/abouts');
        if (response.data && response.data.length > 0) {
          const latestData = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
          setAboutData(latestData);
        }
      } catch (err) {
        setError('Échec du chargement des données de la section À propos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const parseJsonString = (jsonString, defaultValue = []) => {
    if (!jsonString || typeof jsonString !== 'string') return defaultValue;
    try {
      let intermediate = JSON.parse(jsonString);
      if (typeof intermediate === 'string') {
        return JSON.parse(intermediate);
      }
      return Array.isArray(intermediate) ? intermediate : defaultValue;
    } catch (e) {
      console.error("Failed to parse JSON string:", jsonString, e);
      return defaultValue;
    }
  };

  const parseParagraphsString = (pString, defaultValue = []) => {
    if (!pString) return defaultValue;
    
    if (Array.isArray(pString)) return pString;
    
    if (typeof pString === 'string') {
      try {
        const parsed = JSON.parse(pString);
        if (Array.isArray(parsed)) {
          return parsed;
        } else if (typeof parsed === 'string') {
          const doubleParsed = JSON.parse(parsed);
          return Array.isArray(doubleParsed) ? doubleParsed : parsed.split(',').map(p => p.trim());
        } else {
          return parsed.split(',').map(p => p.trim());
        }
      } catch(e) {
        return pString.split(',').map(p => p.trim());
      }
    }
    
    return defaultValue;
  }

  const paragraphs = parseParagraphsString(aboutData?.paragraphs);
  const stats = parseJsonString(aboutData?.stats);
  const yearExperience = parseJsonString(aboutData?.yearExperience);
  const clients = parseJsonString(aboutData?.clients);
  const allStats = [...stats, ...yearExperience, ...clients];


  const imageUrl = aboutData?.imageUrl 
    ? `${API_BASE_URL.replace('/api', '')}/uploads/${aboutData.imageUrl}` 
    : '/images/logo.svg';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotate: -10 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0, 
      rotate: -180 
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5 + index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    })
  };

  const statsVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + index * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  if (loading || error || !aboutData) {
    return null;
  }

  return (
    <section className="about-section" id="about">
      <motion.div 
        className="container about-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="about-image-container"
          variants={imageVariants}
        >
          <motion.div 
            className="about-image"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <motion.img 
              src={imageUrl} 
              alt={aboutData.title}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
          <div className="skill-badges">
            {paragraphs && paragraphs.length > 0 ? (
              paragraphs.map((skill, index) => (
                <motion.span 
                  key={index} 
                  className={`badge ${index % 2 === 0 ? 'yellow' : 'green'}`}
                  variants={badgeVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              // Fallback avec des compétences par défaut si aucune donnée
              ['Design UX/UI', 'Conception de Sites Web', 'Prototype', 'Design d\'Application Mobile', 'Système de Design', 'Design de Maquette Filaire'].map((skill, index) => (
                <motion.span 
                  key={index} 
                  className={`badge ${index % 2 === 0 ? 'yellow' : 'green'}`}
                  variants={badgeVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
        <motion.div 
          className="about-text"
          variants={textVariants}
        >
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            À propos
          </motion.span>
          
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Qui est <motion.span 
              className="highlight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {aboutData.title}
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="about-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {aboutData.description}
          </motion.p>
          
          <motion.div 
            className="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {allStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-item"
                variants={statsVariants}
                custom={index}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                >
                  {stat.number}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="about-footer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <motion.button 
              className="btn about-btn-primary"
              whileHover={{ 
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Télécharger CV
              </motion.span>
              <motion.span 
                className="play-icon-container"
                whileHover={{ 
                  rotate: 90,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <FaDownload />
              </motion.span>
            </motion.button>
            
            <motion.span 
              className="signature"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {aboutData.signature}
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhoIsBaaba;
