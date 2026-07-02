const projectIcons = ['🚀', '💡', '⚙️', '🌐', '📱', '🎯', '🔧', '📊', '🎨', '🏗️'];

function ProjectsSection({ projects }) {
  return (
    <section className="portfolio-section" id="projects">
      <div className="container">
        <h2 className="section-title fade-in">
          <span className="gradient-text">Projeler</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-card fade-in"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="project-icon">{projectIcons[index % projectIcons.length]}</div>
              <h3 className="project-name">{project.name}</h3>
              {project.description && (
                <p className="project-description">{project.description}</p>
              )}
              {project.technologies && (
                <div className="project-tech">
                  {project.technologies.split(/[,;]+/).map((tech, i) => (
                    <span key={i} className="project-tech-tag">{tech.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
