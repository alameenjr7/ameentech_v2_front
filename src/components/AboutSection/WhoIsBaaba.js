import React, { useState, useEffect } from 'react';
import './WhoIsBaaba.css';
import { apiClient, API_BASE_URL } from '../../apiConfig';
import { FaArrowRight } from 'react-icons/fa';

const WhoIsBaaba = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await apiClient.get('/abouts');
        if (response.data && response.data.length > 0) {
          const latestData = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
          setAboutData(latestData);
        }
      } catch (err) {
        setError('Failed to fetch about data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const parseJsonString = (jsonString, defaultValue = []) => {
    if (!jsonString || typeof jsonString !== 'string') return defaultValue;
    try {
      let intermediate = JSON.parse(jsonString);
      if (typeof intermediate === 'string') {
        return JSON.parse(intermediate);
      }
      return Array.isArray(intermediate) ? intermediate : defaultValue;
    } catch (e) {
      console.error("Failed to parse JSON string:", jsonString, e);
      return defaultValue;
    }
  };

  const parseParagraphsString = (pString, defaultValue = []) => {
    if (!pString || typeof pString !== 'string') return defaultValue;
    try {
      const cleanedString = JSON.parse(pString);
      return cleanedString.split(',').map(p => p.trim());
    } catch(e) {
        console.error("Failed to parse paragraphs string:", pString, e);
        return defaultValue;
    }
  }

  const paragraphs = parseParagraphsString(aboutData?.paragraphs);
  const stats = parseJsonString(aboutData?.stats);
  const yearExperience = parseJsonString(aboutData?.yearExperience);
  const clients = parseJsonString(aboutData?.clients);
  const allStats = [...stats, ...yearExperience, ...clients];

  const imageUrl = aboutData?.imageUrl 
    ? `${API_BASE_URL.replace('/api', '')}/uploads/${aboutData.imageUrl}` 
    : '/images/logo.svg';

  if (loading) return <p>Loading about section...</p>;
  if (error) return <p>{error}</p>;
  if (!aboutData) return <p>No about data found.</p>;

  return (
    <section className="about-section" id="about">
      <div className="container about-content">
         <div className="about-image">
          <img src={imageUrl} alt={aboutData.title} />
          <div className="skill-badges">
            {paragraphs.map((skill, index) => (
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
          <span className="section-subtitle">- About Us</span>
          <h2 className="section-title">
          Who is <span className="highlight">{aboutData.title}</span>
          </h2>
          <p className="about-description">
            {aboutData.description}
          </p>
          <div className="stats">
            {allStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="about-footer">
            <button className="btn about-btn-primary">
              Download CV
              <span className="play-icon-container">
                <FaArrowRight />
              </span>
            </button>
            <span className="signature">{aboutData.signature}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsBaaba;
