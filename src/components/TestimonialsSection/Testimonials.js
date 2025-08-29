import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(2);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiClient.get('/testimonials');
        setTestimonials(response.data);
      } catch (err) {
        setError('Échec du chargement des témoignages. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsToShow(1);
      } else {
        setCardsToShow(2);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || testimonials.length <= cardsToShow) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const maxIndex = Math.max(0, testimonials.length - cardsToShow);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length, cardsToShow]);

  const prevTestimonial = () => {
    setIsAutoPlay(false);
    setCurrentIndex(prev => prev <= 0 ? Math.max(0, testimonials.length - cardsToShow) : prev - 1);
  };

  const nextTestimonial = () => {
    setIsAutoPlay(false);
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, testimonials.length - cardsToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const goToSlide = (index) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const totalSlides = Math.max(0, testimonials.length - cardsToShow + 1);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalSlides - 1;

  // Hide section if loading, error, or no data
  if (loading || error || !testimonials || testimonials.length === 0) {
    return null;
  }

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
          <span className="section-subtitle">- Témoignages Clients</span>
          <h2 className="section-title">
            L'Impact de Mon Travail : <span className="highlight">Témoignages Clients</span>
          </h2>
        </motion.div>

        <div className="testimonials-slider">
          <div className="testimonials-wrapper" style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}>
            {testimonials.map((testimonial, index) => {
              const imageUrl = testimonial.avatar 
                ? `${API_BASE_URL.replace('/api', '')}/uploads/${testimonial.avatar}`
                : '';

              return (
                <motion.div 
                  key={index} 
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="rating"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {[...Array(Math.floor(parseFloat(testimonial.rating || "0")))].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 + i * 0.1 }}
                      >
                        <FaStar />
                      </motion.div>
                    ))}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {parseFloat(testimonial.rating || "0").toFixed(1)}
                    </motion.span>
                  </motion.div>
                  
                  <motion.p 
                    className="testimonial-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    "{testimonial.text}"
                  </motion.p>
                  
                  <motion.div 
                    className="author-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {imageUrl && (
                      <motion.img 
                        src={imageUrl} 
                        alt={testimonial.name} 
                        className="avatar"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                    <div>
                      <motion.h4 
                        className="author-name"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {testimonial.name}
                      </motion.h4>
                      <motion.p 
                        className="author-role"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {testimonial.role}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div 
          className="testimonial-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            onClick={prevTestimonial} 
            className={`control-btn prev-btn ${!canGoPrev ? 'disabled' : ''}`}
            disabled={!canGoPrev}
            whileHover={canGoPrev ? { scale: 1.05 } : {}}
            whileTap={canGoPrev ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FaArrowLeft />
          </motion.button>
          
          {/* Slide Indicators */}
          <div className="testimonial-indicators">
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <motion.button
                key={slideIndex}
                className={`indicator ${slideIndex === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(slideIndex)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + slideIndex * 0.1 }}
              />
            ))}
          </div>
          
          <motion.button 
            onClick={nextTestimonial} 
            className={`control-btn next-btn ${!canGoNext ? 'disabled' : ''}`}
            disabled={!canGoNext}
            whileHover={canGoNext ? { scale: 1.05 } : {}}
            whileTap={canGoNext ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FaArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
