import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Hero.css';
import { apiClient } from '../../apiConfig';

const Hero = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await apiClient.get('/settings');
      if (response.data && response.data.length > 0) {
        const latestSettings = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
        setSettings(latestSettings);
      }
    } catch (error) {
      setError('Échec du chargement des paramètres.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (loading) {
    return (
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-loading">
            <div className="spinner"></div>
            <p>Chargement...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !settings) {
    return null;
  }

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-welcome">
              {settings?.welcome_text || 'Salut! Bienvenue chez'}
            </div>
            
            <h1 className="hero-title">
              Nous créons des <span className="highlight">{settings?.title || 'solutions digitales'}</span>
            </h1>
            
            <h2 className="hero-subtitle">
              {settings?.slogan || 'exceptionnelles'}
            </h2>
            
            <p className="hero-description">
              {settings?.description || "Transformons vos idées en solutions digitales innovantes. Notre équipe d'experts développe des applications web et mobiles sur mesure qui propulsent votre entreprise vers le succès."}
            </p>

            <div className="hero-cta">
              <Link
                to="portfolio"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="hero-btn-primary"
              >
                <span className="btn-text">Découvrir Nos Réalisations</span>
                <span className="btn-icon">
                  <FaPlay />
                </span>
              </Link>
              
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="hero-btn-outline"
              >
                Démarrer Votre Projet
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-container">
              <div className="hero-image-circle">
                <img 
                  src={settings?.logo_2 || '/images/hero-profile.jpg'}
                  alt="AmeenTECH" 
                  className="hero-profile-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-profile.jpg';
                  }}
                />
              </div>

              <div className="hire-me-badge">
                <svg className="hire-me-text-svg" viewBox="0 0 120 120">
                  <defs>
                    <path id="circle-path" d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                  </defs>
                  <text className="hire-me-text">
                    <textPath href="#circle-path" startOffset="0%">
                      • CONTACTEZ-MOI • HIRE ME •
                    </textPath>
                  </text>
                </svg>
                <div className="hire-me-icon">
                  <FaLocationArrow />
                </div>
              </div>
              
              <div className="ui-ux-badge">
                UI/UX Designer
              </div>
              
              <div className="product-designer-badge">
                Product Designer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;