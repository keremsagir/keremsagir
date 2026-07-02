function ExperienceSection({ experiences }) {
  return (
    <section className="portfolio-section" id="experience">
      <div className="container">
        <h2 className="section-title fade-in">
          <span className="gradient-text">Deneyim</span>
        </h2>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-item fade-in-left"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="experience-dot"></div>
              <div className="experience-card glass-card">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-position">
                      {exp.position || exp.company || 'Pozisyon'}
                    </h3>
                    {exp.company && exp.position && (
                      <p className="experience-company">{exp.company}</p>
                    )}
                  </div>
                  {exp.period && (
                    <span className="experience-period">{exp.period}</span>
                  )}
                </div>
                {exp.description && (
                  <div className="experience-description">
                    {exp.description.split('\n').map((line, i) => (
                      <p key={i}>• {line}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
