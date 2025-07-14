import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
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
        setError('Failed to fetch Blogs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section id="news" className="blog section">
      <div className="container">
        <div className="blog-header">
          <div className="header-text">
            <span className="section-subtitle">- News & Blogs</span>
            <h2 className="section-title">
              Our Latest <span className="highlight">News & Blogs</span>
            </h2>
          </div>
          <a href="#!" className="btn-view-all">
            <span className="btn-text">View All Blogs</span>
            <span className="btn-icon">
              <FaArrowRight />
            </span>
          </a>
        </div>

        <div className="blog-grid">
          {loading && <p>Loading Blogs...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && blogs.map((blog, index) => {
            const imageUrl = blog.image 
              ? `${API_BASE_URL.replace('/api', '')}/uploads/${blog.image}` 
              : '';
            
            // console.log(`--- Blog Post: ${blog.title} ---`);
            // console.log("Valeur de blog.image:", blog.image);
            // console.log("URL de l'image construite:", imageUrl);
            
            return (
              <motion.div
                key={index}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="blog-image-container">
                  {imageUrl && <img src={imageUrl} alt={blog.title} className="blog-image" />}
                </div>
                <div className="blog-content">
                  <div className="blog-tags">
                    <span className="tag category-tag">{blog.category}</span>
                    <span className="tag date-tag">{blog.date}</span>
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <a href={blog.link} className="read-more-link">
                    Read More
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
