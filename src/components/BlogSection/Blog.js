import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './Blog.css';

const blogs = [
  {
    category: 'App UI/UX Design',
    date: '21 May 2024',
    title: 'Minimalist UI Design: Benefits and Best Practices',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    image: '/blogs/minimalist-ui.jpg',
    link: '#!',
  },
  {
    category: 'Website UI/UX Design',
    date: '20 May 2024',
    title: 'Improving User Experience: Best Practices for Web Desig...',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    image: '/blogs/improving-ux.jpg',
    link: '#!',
  },
  {
    category: 'Color Theory',
    date: '19 May 2024',
    title: 'Understanding the Color Wheel: Basics Every Designe...',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    image: '/blogs/color-wheel-basics.jpg',
    link: '#!',
  },
];

const Blog = () => {
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
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="blog-image-container">
                <img src={blog.image} alt={blog.title} className="blog-image" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
