import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaFile} from "react-icons/fa";

import "./Hero.scss";

export default function Hero() {
    return (
        <div className="HeroContainer">
            <div className="HeroUpper">
                <div className="HeroTitle">
                        <h1>Hi.</h1>
                    <div className="typing-container">
                        <h1>I'm Shahrukh.</h1>
                    </div>                
                </div>
                <div className="HeroImage">
                    <img className="pfp" src='./PFP.jpg' alt="Profile picture"/>
                </div>
            </div>
            <div className="HeroSubtitle">
                <h2>
                I'll soon be building software solutions at JPMorgan Chase. I’ve tackled AI/ML challenges across computer vision, NLP, and Bayesian machine learning, blending academic research with industry-tested engineering skills. 
                </h2>
                <h2 className="SecondPara">
                    When not coding, I’m probably keeping active, diving into some sci-fi, gaming, or watching thought-provoking <a href="https://letterboxd.com/shahrukh0/films/by/entry-rating/" target="_blank" rel="noopener noreferrer">films</a> — ideally with the perfect plate of spicy wings.
                </h2>

            </div>
            
            <div className="SocialIcons">
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
                <div className="Pokemon">
                    <img src="./gengar.gif" alt="Gengar" />
                </div>
            </div>
        </div>
    );
}