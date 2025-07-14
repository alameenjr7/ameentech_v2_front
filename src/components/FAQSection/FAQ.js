import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './FAQ.css';

const faqs = [
  {
    question: 'What industries have you worked in as a product designer?',
    answer: 'I have worked across various industries including e-commerce, finance, healthcare, and education, tailoring designs to meet specific user needs.',
  },
  {
    question: 'Can I download your resume/CV for information?',
    answer: 'Certainly! You can download my resume/CV directly from my website. It provides a comprehensive overview of my education, work experience, and design achievements.',
  },
  {
    question: 'Are you available for freelance design work?',
    answer: 'Yes, I am open to freelance projects. Please contact me to discuss your requirements.',
  },
  {
    question: 'What tools do you use for your design work?',
    answer: 'I primarily use Figma, Sketch, Adobe XD, and Photoshop for my design projects.',
  },
  {
    question: 'How do I navigate through your portfolio projects?',
    answer: 'You can browse my portfolio projects by clicking on the Portfolio link in the navigation bar or scrolling down to the Portfolio section.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq section">
      <div className="container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">- FAQs</span>
          <h2 className="section-title">
            Questions? <span className="highlight">Look here.</span>
          </h2>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
