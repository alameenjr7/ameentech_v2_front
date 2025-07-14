import React, { useState, useEffect } from 'react';
import { apiClient } from '../../apiConfig';
import './Marquee.css';

const Marquee = () => {
  // const items = ['App Design', 'Website Design', 'Dashboard', 'Wireframe'];
  const [marquees, setMarquees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarquees = async () => {
      try {
        const response = await apiClient.get('/marquees');
        setMarquees(response.data);
      } catch (err) {
        setError('Failed to fetch Marquees.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarquees();
  }, []);

  const parsedItems = !loading && !error && marquees.length > 0
    ? JSON.parse(JSON.parse(marquees[0].items))
    : [];

  return (
    <div className="marquee-section">
      <div className="marquee">
        <div className="marquee-content">
          {loading && <p>Loading Marquees...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && parsedItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">*</span>
            </React.Fragment>
          ))}
          {!loading && !error && parsedItems.map((item, index) => (
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
