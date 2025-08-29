import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaEye } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/blogs');
        setBlogs(response.data);
      } catch (err) {
        setError('Échec du chargement des articles. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 15
        }
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Hide section if loading, error, or no data
  if (loading || error || !blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section id="news" className="blog section">
      <div className="container">
        <motion.div 
          className="blog-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="header-text">
            <motion.span 
              className="section-subtitle"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              - Actualités & Blog
            </motion.span>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="highlight"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                Actualités & Blog
              </motion.span>
            </motion.h2>
          </div>
          <motion.a 
            href="#!" 
            className="btn-view-all"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              y: -3,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="btn-text"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Voir Tous les Articles
            </motion.span>
            <motion.span 
              className="btn-icon"
              whileHover={{ 
                rotate: 45,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {blogs.map((blog, index) => {
            const imageUrl = blog.image 
              ? `${API_BASE_URL.replace('/api', '')}/uploads/${blog.image}` 
              : '';
            
            return (
              <motion.div
                key={index}
                className="blog-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -20,
                  scale: 1.03,
                  rotateY: 2,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="blog-image-container"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                >
                  {imageUrl ? (
                    <motion.img 
                      src={imageUrl} 
                      alt={blog.title} 
                      className="blog-image"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.4 }
                      }}
                    />
                  ) : (
                    <motion.div 
                      className="blog-image-placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ fontSize: '3rem' }}
                      >
                        📰
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Blog overlay info */}
                  <motion.div 
                    className="blog-overlay"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="blog-meta">
                      <span className="meta-item">
                        <FaEye /> {blog.views || '120'} vues
                      </span>
                      <span className="meta-item">
                        <FaClock /> {blog.readTime || '5 min'}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="blog-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <motion.div 
                    className="blog-tags"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.span 
                      className="tag category-tag"
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {blog.category}
                    </motion.span>
                    <motion.span 
                      className="tag date-tag"
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <FaCalendarAlt style={{ marginRight: '0.3rem' }} />
                      {blog.date}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    className="blog-title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      color: 'var(--brand-lime)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {blog.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="blog-excerpt"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  >
                    {blog.excerpt}
                  </motion.p>
                  
                  <motion.div 
                    className="blog-footer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="author-info">
                      <FaUser className="author-icon" />
                      <span className="author-name">{blog.author || 'Administrateur'}</span>
                    </div>
                    <motion.a 
                      href={blog.link} 
                      className="read-more-link"
                      whileHover={{ 
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        Lire Plus
                      </motion.span>
                      <motion.span
                        whileHover={{ 
                          rotate: 45,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <FaArrowRight />
                      </motion.span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
