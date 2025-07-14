import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiClient.get('/testimonials');
        setTestimonials(response.data);
      } catch (err) {
        setError('Failed to fetch pricing plans.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const prevTestimonial = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const nextTestimonial = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  const rating = parseFloat(testimonials.rating || "0");

  return (
    <section id="reviews" className="testimonials section">
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">- Clients Testimonials</span>
          <h2 className="section-title">
            The Impact of My Work: <span className="highlight">Client Testimonials</span>
          </h2>
        </motion.div>

        <div className="testimonials-slider">
          <div className="testimonials-wrapper" style={{ transform: `translateX(-${current * 100}%)` }}>
            {loading && <p>Loading testimonials...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && testimonials.map((testimonial, index) => {
              const imageUrl = testimonial.avatar 
                ? `${API_BASE_URL.replace('/api', '')}/uploads/${testimonial.avatar}`
                : '';

              return (
                <div key={index} className="testimonial-card">
                  <div className="rating">
                    {[...Array(Math.floor(rating))].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span>{rating.toFixed(1)}</span>
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="author-info">
                    {imageUrl && <img src={imageUrl} alt={testimonial.name} className="avatar" />}
                    <div>
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="testimonial-controls">
          <button onClick={prevTestimonial} className="control-btn prev-btn">
            <FaArrowLeft />
          </button>
          <button onClick={nextTestimonial} className="control-btn next-btn">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
