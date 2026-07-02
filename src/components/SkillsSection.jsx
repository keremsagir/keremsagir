function SkillsSection({ skills }) {
  return (
    <section className="portfolio-section" id="skills">
      <div className="container">
        <h2 className="section-title fade-in">
          <span className="gradient-text">Yetenekler</span>
        </h2>

        <div className="skills-container">
          <div className="skills-cloud">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="skill-tag fade-in"
                style={{
                  transitionDelay: `${index * 0.05}s`,
                  fontSize: `${0.85 + Math.random() * 0.25}rem`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
