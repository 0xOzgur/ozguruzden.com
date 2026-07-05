import React from 'react';
import { FaGithub } from 'react-icons/fa';
import projects from '../data/projects';
import './Projects.css';

function Projects() {
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
