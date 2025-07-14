import React from 'react';
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

function App() {
  return (
    <div className="App">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
