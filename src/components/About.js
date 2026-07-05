import React from 'react';
import { FaLeaf, FaWordpress, FaRobot, FaBitcoin, FaDatabase, FaFlask, FaCamera, FaMusic } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import './About.css';

function About() {
    const skills = [
        { name: 'Olive Oil Production', level: 95, icon: FaLeaf },
        { name: 'E-Commerce & WordPress', level: 95, icon: FaWordpress },
        { name: 'Artificial Intelligence', level: 85, icon: FaRobot },
        { name: 'Next.js', level: 80, icon: SiNextdotjs },
        { name: 'Blockchain & Solidity', level: 85, icon: FaBitcoin },
        { name: 'MySQL/MongoDB', level: 80, icon: FaDatabase },
    ];

    const interests = [
        { name: 'Technology Research', icon: FaFlask },
        { name: 'Olive Oil Production', icon: FaLeaf },
        { name: 'Photography', icon: FaCamera },
        { name: 'Playing Saxophone', icon: FaMusic },
    ];

    const handleClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <h2 className="about-title">About Me</h2>
                
                <div className="about-content">
                    <div className="left-column">
                        <div className="about-image-container">
                            <img 
                                src="https://i1.rgstatic.net/ii/profile.image/864925052317704-1583225610421_Q512/Ozgur-Uzden.jpg" 
                                alt="Özgür" 
                                className="about-image"
                            />
                            <div className="image-overlay"></div>
                            <div className="image-border"></div>
                        </div>

                        <div className="interests-section desktop-interests">
                            <h3 className="card-title">Personal Interests</h3>
                            <div className="interests-grid">
                                {interests.map((interest, index) => (
                                    <div key={index} className="interest-item">
                                        <interest.icon className="interest-icon" />
                                        <span className="interest-name">{interest.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="about-text-content">
                        <div className="introduction">
                            <p className="lead-text">
                                It's Özgür — producer of Orfion Olive Oil and Oligatto Olive Pits Cat Litter, and a researcher in olive oil production, software, and technology.
                            </p>
                        </div>
                        
                        <div className="main-content">
                            <p>
                            I produce <a href='https://www.orfion.com.tr' className="custom-link" target='_blank' rel="noopener noreferrer">Orfion Olive Oil</a> and <a href='https://www.oligatto.com' className="custom-link" target='_blank' rel="noopener noreferrer">Oligatto Olive Pits Cat Litter</a> — a dust-free, biodegradable litter born from upcycling the olive pits left over from our oil production. Both reflect how much I care about quality and sustainability.
                            </p>

                            <p>
                            As a researcher, I explore olive oil production technologies and build the software that supports them — from e-commerce platforms to production tools. My engineering background feeds directly into how I produce, measure, and improve.
                            </p>

                            <p>
                                Beyond production and research, I keep a close eye on emerging technologies like artificial intelligence and blockchain. I'm also a proud dad to my daughter. In my free time, I enjoy taking photos and playing the saxophone. I mix my technical skills with my creative side in everything I work on.
                            </p>
                        </div>
                        
                        <div className="skills-section">
                            <h3 className="card-title">Skills & Expertise</h3>
                            <div className="two-column-grid">
                                {skills.map((skill, index) => (
                                    <div key={index} className="skill-item">
                                        <skill.icon className="skill-icon" />
                                        <span className="skill-name">{skill.name}</span>
                                        <div className="skill-bar-container">
                                            <div 
                                                className="skill-bar" 
                                                style={{ width: `${skill.level}%` }}
                                            >
                                                <span className="skill-level">{skill.level}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="cta-section">
                            <h4>Let's work together! Visit the <a href="#contact" className="custom-link" onClick={handleClick}>Contact Page</a> to connect and explore exciting opportunities.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;