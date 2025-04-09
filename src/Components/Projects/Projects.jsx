import React from 'react';

import "./Projects.scss";

const Projects = () => {
  const projects = [
    {
      title: "Cardiothoracic Disease Diagnosis",
      description: "Spotting cardiothoracic illness with superhuman accuracy: medical image analysis with cutting-edge neural networks, achieving 98.1% accuracy in locating Pneumonia, Cardiomegaly, and COVID-19 in chest scans.",
      img: "./cardio.png",
      icons: ["Python", "PyTorch", "TensorFlow", "Seaborns"],
      link: "https://github.com/SShowkath/CardiothoracicDiagnosisPublicRepository"
    },
    {
      title: "UT Dallas CS4349 - Advanced Algorithms Syllabus Chatbot",
      description: "CS4349 TA at your service! This chatbot project leverages the course syllabus to provide on-demand information and support for students.",
      img: "./Senior_Design.gif",
      icons: ["React", "Python", "OpenAI", "Langchain"],
      link: "https://github.com/SShowkath/syllabus-chatbot"
    },
    {
      title: "JPMorgan Code for Good Hackathon",
      description: "Grow stronger communities, one bite at a time. This interactive website empowers The FunkyTown Food Project, a non-profit, with gamified volunteer tracking, streamlined event management, and engaging sustainable farming education.",
      img: "./cfg.jpg",
      icons: ["React", "Node.js", "Firebase"],
      link: "https://github.com/cfgtexas22/team-17"
    },
    {
      title: "Engineuity - GitHub Discussions Search Engine",
      description: "This AI-powered search engine for GitHub Discussions leverages NLP techniques to categorize your queries with pinpoint accuracy. Find the insights you need faster with multi-label classification powered by BERT.",
      img: "./engineuity.png",
      icons: ["Python", "PyTorch", "Pinecone", "GraphQL", "React"],
      link: "https://github.com/SShowkath/AIM_Project_AI_Search_Engine"
    },
    {
      title: "Hospital Manager",
      description: "Custom data population scripts and a robust database integration system makes scheduling, staff assignment, and patient tracking a breeze.",
      img: "./hospital.jpg",
      icons: ["React", "PHP", "Python", "SQL"],
      link: "https://github.com/SShowkath/Hospital-Management-System---4337Bonus"
    }
  ];

  return (
    <div className="projects-grid">
  {projects.map((project, index) => (
    <div key={index} className="project-card">
      <div className="project-image-container">
        <img 
          src={project.img} 
          alt={project.title}
          className="project-image"
        />  
      </div>
      <div className="project-content">
      <h3><a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a></h3>
    
        <p>{project.description}</p>
        <div className="icon-container">
          {project.icons.map((icon, idx) => (
            <span key={idx} className="icon-badge">
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
  );

};

export default Projects;