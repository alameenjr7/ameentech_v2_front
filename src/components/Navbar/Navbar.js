import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'Services', to: 'services' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'portfolio' },
    { name: 'Blogs', to: 'news' },
    { name: 'Testimonials', to: 'reviews' },
  ];


  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <div className="logo-icon">B</div>
            <span className="logo-text">Baaba.</span>
          </div>


          {/* Desktop Menu */}
          <ul className="navbar-menu">
            {navItems.map((item, index) => (
              <li key={index} className="navbar-item">
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="navbar-link"
                  activeClass="active"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="navbar-cta">
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-primary"
            >
              Contact Me
            </Link>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="navbar-toggle" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile ${isOpen ? 'navbar-mobile-open' : ''}`}>
          <ul className="navbar-mobile-menu">
            {navItems.map((item, index) => (
              <li key={index} className="navbar-mobile-item">
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="navbar-mobile-link"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="navbar-mobile-item">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn btn-primary"
                onClick={closeMenu}
              >
                Contact Me
              </Link>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
