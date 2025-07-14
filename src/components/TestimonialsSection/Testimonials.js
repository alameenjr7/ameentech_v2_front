import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Leslie Alexander',
    role: 'Founder, EV Charger Station',
    rating: 5.0,
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas',
    avatar: '/avatars/leslie.jpg',
  },
  {
    name: 'Albert Flores',
    role: 'CTO, Software Agency',
    rating: 5.0,
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas',
    avatar: '/avatars/albert.jpg',
  },
  {
    name: 'Jenny Wilson',
    role: 'Marketing Head, Creative Co.',
    rating: 5.0,
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas',
    avatar: '/avatars/jenny.jpg',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const nextTestimonial = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

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
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="rating">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span>{testimonial.rating.toFixed(1)}</span>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="author-info">
                  <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
                  <div>
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
