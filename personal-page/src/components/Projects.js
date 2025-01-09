import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/projects.xml');
      const xmlString = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      const projectsData = Array.from(xmlDoc.getElementsByTagName("project")).map(project => ({
        id: project.getElementsByTagName("id")[0].textContent,
        title: project.getElementsByTagName("title")[0].textContent,
        description: project.getElementsByTagName("description")[0].textContent,
        image: process.env.PUBLIC_URL + '/' + project.getElementsByTagName("image")[0].textContent,
        hoverImage: process.env.PUBLIC_URL + '/' + project.getElementsByTagName("hoverImage")[0].textContent,
        link: project.getElementsByTagName("link")[0].textContent,
        github: project.getElementsByTagName("github")[0].textContent,
        tags: Array.from(project.getElementsByTagName("tags")[0].getElementsByTagName("tag"))
          .map(tag => tag.textContent)
      }));

      setProjects(projectsData);
    } catch (error) {
      console.error("XML dosyalarını yüklerken hata oluştu:", error);
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="image-container">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image" 
                />
                <img 
                  src={project.hoverImage} 
                  alt={project.title + " Hover"} 
                  className="hover-image" 
                />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="actions">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project">View Project</a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="view-github">View on GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;