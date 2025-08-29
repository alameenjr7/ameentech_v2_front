import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import WhoIsBaaba from './components/AboutSection/WhoIsBaaba';
import Tools from './components/ToolsSection/Tools';
import Portfolio from './components/Portfolio/Portfolio';
import Experience from './components/Experience/Experience';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import Testimonials from './components/TestimonialsSection/Testimonials';
import Blog from './components/BlogSection/Blog';
import FAQ from './components/FAQSection/FAQ';
import Footer from './components/Footer/Footer';
import Marquee from './components/Marquee/Marquee';
import TermsOfService from './components/Legal/TermsOfService';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import CookiePolicy from './components/Legal/CookiePolicy';

// HomePage component for the main landing page
const HomePage = () => (
  <>
    <Hero />
    <Marquee />
    <Services />
    <WhoIsBaaba />
    <Tools />
    <Portfolio />
    <Experience />
    <Pricing />
    <Contact />
    <Testimonials />
    <Blog />
    <FAQ />
    <Marquee />
  </>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
