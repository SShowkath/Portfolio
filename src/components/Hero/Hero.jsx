import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFile } from 'react-icons/fa';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-header">
          <div className="hero-profile">
            <img src="/PFP.jpg" alt="Shahrukh" className="profile-image" />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Hey, I'm Shahrukh</h1>
            <p className="hero-subtitle">Software Developer</p>
          </div>
        </div>
        
        <p className="hero-description">
          I'll soon be building software solutions at JPMorgan Chase. I've tackled AI/ML challenges across computer vision, NLP, and Bayesian machine learning, blending academic research with industry-tested engineering skills. 
        </p>
        
        <div className="social-icons">
          <div className="icons-group">
            <a href="https://www.linkedin.com/in/shahrukh-showkath" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
            <a href="https://github.com/SShowkath" target="_blank" rel="noopener noreferrer">
              <FaGithub className="icon" />
            </a>
            <a href="mailto:shahrukhshowkath@gmail.com">
              <FaEnvelope className="icon" />
            </a>
            <a
              href="https://drive.google.com/file/d/1KhGCzDHHaT6Kr45aWciYDZaLF4AX3BQT/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFile className="icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;