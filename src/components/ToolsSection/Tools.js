import React, { useState, useEffect } from 'react';
import { apiClient } from '../../apiConfig';
import './Tools.css';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await apiClient.get('/tools');
        setTools(response.data);
      } catch (err) {
        setError('Failed to fetch Tools.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (
    <section className="tools-section">
      <div className="container">
        <span className="section-subtitle">- My Favorite Tools</span>
        <h2 className="section-title">
          <span className="highlight">Exploring the Tools</span><br />
          Behind My Designs
        </h2>
        <div className="tools-grid">
          {loading && <p>Loading FAQs...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && tools.map((tool, index) => (
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
