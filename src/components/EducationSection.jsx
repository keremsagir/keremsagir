function EducationSection({ educations }) {
  return (
    <section className="portfolio-section" id="education">
      <div className="container">
        <h2 className="section-title fade-in">
          <span className="gradient-text">Eğitim</span>
        </h2>

        <div className="education-grid">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="education-card glass-card fade-in"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="education-icon">🎓</div>
              <h3 className="education-school">{edu.school || 'Okul'}</h3>
              {edu.degree && <p className="education-degree">{edu.degree}</p>}
              {edu.period && <p className="education-period">{edu.period}</p>}
              {edu.description && (
                <p className="education-description">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
