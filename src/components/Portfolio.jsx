import { useEffect } from 'react';
import HeroSection from './HeroSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import EducationSection from './EducationSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import ProjectsSection from './ProjectsSection.jsx';
import ContactSection from './ContactSection.jsx';
import './Portfolio.css';

function Portfolio({ data, onReset }) {
  useEffect(() => {
    // Setup scroll-triggered fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  return (
    <div className="portfolio" id="portfolio-page">
      {/* Floating Nav */}
      <nav className="portfolio-nav glass-card" id="portfolio-nav">
        <div className="nav-brand">
          <span className="gradient-text">{data.fullName?.split(' ')[0] || 'CV'}</span>
        </div>
        <div className="nav-links">
          {data.experiences?.length > 0 && <a href="#experience">Deneyim</a>}
          {data.educations?.length > 0 && <a href="#education">Eğitim</a>}
          {data.skills?.length > 0 && <a href="#skills">Yetenekler</a>}
          {data.projects?.length > 0 && <a href="#projects">Projeler</a>}
          <a href="#contact">İletişim</a>
        </div>
        <button className="nav-reset-btn" onClick={onReset} title="Yeni CV Yükle" id="reset-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
            <path d="M21 21v-5h-5"/>
          </svg>
        </button>
      </nav>

      <HeroSection data={data} />

      {data.experiences?.length > 0 && <ExperienceSection experiences={data.experiences} />}
      {data.educations?.length > 0 && <EducationSection educations={data.educations} />}
      {data.skills?.length > 0 && <SkillsSection skills={data.skills} />}
      {data.projects?.length > 0 && <ProjectsSection projects={data.projects} />}
      <ContactSection data={data} />

      <footer className="portfolio-footer">
        <p>
          <span className="gradient-text">CVFolio</span> ile oluşturuldu — {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default Portfolio;
