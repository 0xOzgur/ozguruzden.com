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

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <h2 className="about-title">About Me</h2>
                
                <div className="about-content">
                <div className="about-image-container">
                    <img 
                        src="https://i1.rgstatic.net/ii/profile.image/864925052317704-1583225610421_Q512/Ozgur-Uzden.jpg" 
                        alt="Özgür" 
                        className="about-image"
                    />
                <div className="image-overlay"></div>
                <div className="image-border"></div>
                <div className="interests-section areas-of-interest">
                    <h3 className="card-title" class>Areas of Interest</h3>
                    {interests.map((interest, index) => (
                    <div key={index} className="skill-item">
                        <i className={`fa ${interest.icon} interest-icon`} />
                        <span>{interest.name}</span>
                    </div>
                    ))}
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
                            He's also the producer of <a href='https://www.orfion.com.tr' className="custom-link" target='blank'>Orfion Olive Oil</a>, a testament to his commitment to quality. 
                            </p>
                            
                            <p>
                            This dedication seamlessly translates into his web development work, where he crafts beautiful, functional websites with meticulous attention to detail.  
                            </p>
                            
                            <p>
                            Beyond the digital and the olive grove, Özgür is a fan of Blockchain technologies, a devoted family man who enjoys photography and playing the saxophone. He brings a unique blend of technical prowess and creative passion to every project.
                            </p>
                        </div>
                        
                        <div className="skills-section">
  <h3 className="card-title">Technical Skills</h3>
  <div className="two-column-grid">
    {skills.slice(0, 5).map((skill, index) => (
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
    {skills.slice(5).map((skill, index) => (
      <div key={index + 5} className="skill-item">
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
                            <p>To learn more about Özgür and his work, please visit the</p>
                            <a href="/contact" className="cta-button">Contact Page</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;