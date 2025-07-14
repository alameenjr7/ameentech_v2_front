import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './WhoIsBaaba.css';

const WhoIsBaaba = () => {
  const skills = [
    'UX/UI Design',
    'Mobile App Design',
    'Website Design',
    'Design System',
    'Prototype',
    'Dashboard',
    'Wireframe Design'
  ];

  return (
    <section className="about-section" id="about">
      <div className="container about-content">
        <div className="about-image">
          <img src="/images/about-profile.png" alt="Baba NGOM" />
          <div className="skill-badges">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className={`badge ${index % 2 === 0 ? 'yellow' : 'green'}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="about-text">
          <span className="section-subtitle">- About Me</span>
          <h2 className="section-title">
            Who is <span className="highlight">Baba NGOM?</span>
          </h2>
          <p className="about-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="stats">
            <div className="stat-item">
              <h3>600+</h3>
              <p>Project Completed</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Industry Covered</p>
            </div>
            <div className="stat-item">
              <h3>18+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
          <div className="about-footer">
            <button className="btn about-btn-primary">
              Download CV
              <span className="play-icon-container">
                <FaArrowRight />
              </span>
            </button>
            <span className="signature">Baba NGOM</span>
          </div>
        </div>
      </div>
    </section>
  );
};


export default WhoIsBaaba;
