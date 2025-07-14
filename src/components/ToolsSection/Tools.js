import React from 'react';
import './Tools.css';

const tools = [
  { name: 'Figma', percent: 98, icon: '/icons/figma.svg' },
  { name: 'Sketch', percent: 92, icon: '/icons/sketch.svg' },
  { name: 'Photoshop', percent: 90, icon: '/icons/photoshop.svg' },
  { name: 'After Effects', percent: 85, icon: '/icons/aftereffects.svg' },
  { name: 'Storybook', percent: 90, icon: '/icons/storybook.svg' },
  { name: 'InVision', percent: 95, icon: '/icons/invision.svg' },
];

const Tools = () => {
  return (
    <section className="tools-section">
      <div className="container">
        <span className="section-subtitle">- My Favorite Tools</span>
        <h2 className="section-title">
          <span className="highlight">Exploring the Tools</span><br />
          Behind My Designs
        </h2>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-card">
              <div className="tool-icon-container">
                <img src={tool.icon} alt={tool.name} className="tool-icon" />
              </div>
              <span className="tool-percent">{tool.percent}%</span>
              <span className="tool-name">{tool.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tools;
