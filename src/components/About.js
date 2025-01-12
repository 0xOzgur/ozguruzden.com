import React from 'react';
import './About.css';

function About() {
    const skills = [
        { name: 'JavaScript', level: 90, icon: 'fab fa-js' },
        { name: 'React', level: 85, icon: 'fab fa-react' },
        { name: 'Next.js', level: 80, icon: 'fab fa-node-js' },
        { name: 'HTML5/CSS3', level: 75, icon: 'fab fa-html5' },
        { name: 'WordPress', level: 95, icon: 'fab fa-wordpress' },
        { name: 'Solidity', level: 85, icon: 'fab fa-bitcoin' },
        { name: 'MySQL/MongoDB', level: 80, icon: 'fab fa-node-js' },
        { name: 'Git', level: 90, icon: 'fab fa-git-alt' },
    ];

    const interests = [
        { name: 'Web Development', icon: 'fas fa-code' },
        { name: 'Olive Oil Production', icon: 'fas fa-leaf' },
        { name: 'Photography', icon: 'fas fa-camera' },
        { name: 'Playing Saxophone', icon: 'fas fa-music' },
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
                                        <i className={`fa ${interest.icon} interest-icon`} />
                                        <span className="interest-name">{interest.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="about-text-content">
                        <div className="introduction">
                            <p className="lead-text">
                                It's Özgür, a seasoned web developer, engineer, and entrepreneur.
                            </p>
                        </div>
                        
                        <div className="main-content">
                            <p>
                            I’m passionate about coding and producing <a href='https://www.orfion.com.tr' className="custom-link" target='_blank' rel="noopener noreferrer">Orfion Olive Oil</a>- both show how much I care about quality.
                            </p>
                            
                            <p>
                            I bring this same passion to web development, designing projects that are as beautiful to look at as they are seamless to use.
                            </p>
                            
                            <p>
                                Outside of work and olive oil, I'm big fan of Blockchain technologies. I'm also a proud dad to my daughter. In my free time, I enjoy taking photos and playing the saxophone. I mix my technical skills with my creative side in every project I work on.
                            </p>
                        </div>
                        
                        <div className="skills-section">
                            <h3 className="card-title">Technical Skills</h3>
                            <div className="two-column-grid">
                                {skills.map((skill, index) => (
                                    <div key={index} className="skill-item">
                                        <i className={`fa ${skill.icon} skill-icon`} />
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