import React, { useState, useEffect, useMemo } from 'react';
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
        setError('Échec du chargement du contenu défilant. Veuillez actualiser la page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarquees();
  }, []);

  const parsedItems = useMemo(() => {
    if (loading || error || marquees.length === 0) {
      return [];
    }

    try {
      const items = marquees[0].items;
      let parsed = [];
      
      if (typeof items === 'string') {
        parsed = JSON.parse(items);
        // If the parsed result is still a string, parse it again
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
      } else if (Array.isArray(items)) {
        parsed = items;
      }
      
      // Ensure we always return an array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse marquee items:', error);
      return [];
    }
  }, [loading, error, marquees]);

  return (
    <div className="marquee-section">
      <div className="marquee">
        <div className="marquee-content">
          {loading && <p>Chargement du contenu défilant...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && Array.isArray(parsedItems) && parsedItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">*</span>
            </React.Fragment>
          ))}
          {!loading && !error && Array.isArray(parsedItems) && parsedItems.map((item, index) => (
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
