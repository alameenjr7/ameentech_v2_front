import React from 'react';
import './Marquee.css';

const Marquee = () => {
  const items = ['App Design', 'Website Design', 'Dashboard', 'Wireframe'];

  return (
    <div className="marquee-section">
      <div className="marquee">
        <div className="marquee-content">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">*</span>
            </React.Fragment>
          ))}
          {items.map((item, index) => (
            <React.Fragment key={`clone-${index}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">*</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
