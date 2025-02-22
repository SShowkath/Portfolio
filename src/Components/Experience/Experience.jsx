import React from 'react';
import './Experience.scss';

const experiences = [
  {
    title: 'JP Morgan Chase',
    date: 'Summer 2024',
    description: 'Returned to JPMC as a SWE intern for the Financial Data Integration team for Corporate Technology',
    img: "./JP_Morgan_logo.png"
  },
  {
    title: 'DesignAI Group',
    date: 'Jan - May 2024',
    description: 'Research assistant for Dr. Qian Yang\'s DesignAI group, where I worked on a RAG pipeline for a medical literature assistant that personalizes medical research summaries for users',
    img: "./cornell.png"
  },
  {
    title: 'Cornell University',
    date: 'Jan - Dec 2024',
    description: 'Continued education to get my Masters of Engineering in Computer Science at Cornell University',
    img: "./cornell.png"
  },
  {
    title: 'University of Texas at Dallas',
    date: '2021 - Fall 2023',
    description: 'Graduated with a B.S. in Computer Science | Magna Cum Laude, Artificial Intelligence Society Officer',
    img: "./utd.jpg"
  },
  {
    title: 'JP Morgan Chase',
    date: 'Summer 2023',
    description: "SWE intern on the Global Banking Platform team, where I designed and built a TerraForm lifecycle management application to streamline infrastructure provisioning",
    img: "./JP_Morgan_logo.png"
  },
  {
    title: 'ACM UT Dallas',
    date: 'Jan - May 2023',
    description: 'Conducted research under Dr. Katherine Brown on using CV models to pinpoint and effectively diagnose cardiothoracic diseases based on chest scans',
    img: "./acm.jpg"
  },
  {
    title: 'COINS Lab',
    date: 'May - Dec 2022',
    description: 'Research Assistant for Dr. Richard Golden, where I developed cognitive diagnostic models using Bayesian ML to assess a student\'s skills via an intelligent GUI for skill assignment and interrelation analysis',
    img: "./coins.png"
  },
  {
    title: 'Codeucate',
    date: 'Summer 2020',
    description: 'Developed and taught beginner to intermediate Java, JavaScript, Python, and Scratch courses to 100+ students',
    img: "./codeucate.jpg"
  }
];

const Experience = () => {
  return (
    <div className="experience-section">

      <div className="experience-section__list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-section__card">
            <div className="card-content">
              <div className="image-container">
                <img src={exp.img} alt={exp.title} />
              </div>
              <div className="details">
                <div className="header">
                  <h2 className="title">{exp.title}</h2>
                  <span className="date">{exp.date}</span>
                </div>
                <p className="description">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;