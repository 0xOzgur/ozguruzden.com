import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

  const fetchProjects = useCallback(async () => {
    try {
      //const response = await axios.get(`${STRAPI_URL}/api/projects?populate=*&sort=order:asc`);
      const response = await axios.get('http://localhost:1337/api/projects');
      
    const projectsData = response.data.data.map(item => {
      const description = item.description?.[0]?.children?.[0]?.text || '';
      
      return {
        id: item.id,
        order: item.order || 0, // order alanını ekle
        title: item.title || '',
        description: description,
        image: item.image?.url 
          ? `${STRAPI_URL}${item.image.url}`
          : null,
        hoverImage: item.hoverImage?.url
          ? `${STRAPI_URL}${item.hoverImage.url}`
          : null,
        link: item.link || '#',
        github: item.github || '#',
        tags: Array.isArray(item.tags) 
          ? item.tags.map(tag => tag.text).filter(Boolean)
          : []
      };
    });

    setProjects(projectsData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching projects:", error);
    setError(error.message || "Failed to load projects");
    setLoading(false);
  }
}, [STRAPI_URL]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!projects.length) return <div className="no-projects">No projects available</div>;

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="image-container">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image" 
                  />
                )}
                {project.hoverImage && (
                  <img 
                    src={project.hoverImage} 
                    alt={`${project.title} Hover`} 
                    className="hover-image" 
                  />
                )}
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                {project.description && <p>{project.description}</p>}
                {project.tags && project.tags.length > 0 && (
                  <div className="tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="actions">
                {project.link && project.link !== '#' && (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project">
      View Project
    </a>
                  )}
                  {project.github && project.github !== '#' && (
    <a href={project.github} target="_blank" rel="noopener noreferrer" className="view-github">
      <FaGithub className="github-icon" /> GitHub
    </a>
                  )}
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