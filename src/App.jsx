import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { 
  FiMail, FiPhone, FiMapPin, FiBriefcase, FiCode, FiTool, 
  FiFolder, FiArrowUp, FiAward, FiBookOpen
} from 'react-icons/fi';
import { cvData } from './data/cvData.js';

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function App() {
  const { personal, education, experience, skills, projects } = cvData;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <main>
        {/* ── Hero Section ── */}
        <section id="home" className="hero container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="hero-status" variants={fadeUp}>
                <span className="status-dot"></span>
                {personal.statusText}
              </motion.div>

              <motion.h1 variants={fadeUp}>
                <span className="gradient-text">{personal.name}</span>
              </motion.h1>

              <motion.h2 className="hero-subtitle" variants={fadeUp}>
                {personal.title}
              </motion.h2>

              <motion.div className="hero-badges" variants={fadeUp}>
                <span className="hero-badge">
                  <FiCode size={13} /> Yazılım
                </span>
                <span className="hero-badge">
                  <FiBriefcase size={13} /> Endüstri Mühendisliği
                </span>
              </motion.div>

              <motion.p className="hero-desc" variants={fadeUp}>
                {personal.about}
              </motion.p>
              
              {/* HR Highlights */}
              <motion.div className="hr-highlights" variants={fadeUp}>
                {personal.highlights.map((item, idx) => (
                  <div className="hr-highlight-item" key={idx}>
                    <FiAward size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div className="hero-actions" variants={fadeUp}>
                <a href="#contact" className="btn btn-primary">
                  İletişime Geç
                </a>
                <a href="#projects" className="btn btn-outline">
                  Projelerimi Gör
                </a>
              </motion.div>

              <motion.div className="social-links" variants={fadeUp}>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={20} />
                </a>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={20} />
                </a>
                <a href={`mailto:${personal.email}`} aria-label="Email">
                  <FiMail size={20} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="profile-card">
                <div className="profile-img">
                  <img 
                    src={`${personal.github}.png`} 
                    alt={personal.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="profile-placeholder" style={{ display: 'none' }}>
                    {personal.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* ── Deneyim Section ── */}
        <section id="experience" className="section container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Kariyer</span>
            <h2 className="section-title">Deneyim</h2>
          </motion.div>
          
          <div className="timeline">
            {experience.map((exp) => (
              <motion.div 
                className="timeline-item" 
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <div className={`timeline-dot ${exp.isActive ? 'active' : ''}`}></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{exp.role}</h3>
                      <p className="timeline-subtitle">{exp.company}</p>
                    </div>
                    <div className="timeline-meta">
                      {exp.isActive && (
                        <span className="active-badge">
                          <span className="active-badge-dot"></span>
                          Aktif
                        </span>
                      )}
                      <span className="timeline-date">{exp.period}</span>
                    </div>
                  </div>
                  <div className="timeline-body">
                    <ul>
                      {exp.responsibilities.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* ── Eğitim Section ── */}
        <section id="education" className="section container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Akademik</span>
            <h2 className="section-title">Eğitim</h2>
          </motion.div>
          
          <div className="timeline">
            {education.map((edu) => (
              <motion.div 
                className="timeline-item" 
                key={edu.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <div className="timeline-dot edu-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{edu.institution}</h3>
                      <p className="timeline-subtitle edu-subtitle">
                        {edu.department}
                      </p>
                    </div>
                    <div className="timeline-meta">
                      {edu.degree && (
                        <span className={`gpa-badge ${parseFloat(edu.degree) >= 3.0 ? 'high' : ''}`}>
                          <FiAward size={12} />
                          GPA: {edu.degree}
                        </span>
                      )}
                      <span className="timeline-date">{edu.period}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* ── Yetkinlikler Section ── */}
        <section id="skills" className="section container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Teknoloji</span>
            <h2 className="section-title">Yetkinlikler</h2>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <motion.div 
                className="skill-category" 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h3>
                  {idx === 0 ? <FiCode size={18} /> : idx === 1 ? <FiBriefcase size={18} /> : <FiTool size={18} />}
                  {skillGroup.category}
                </h3>
                <div className="skill-tags">
                  {skillGroup.items.map((item, i) => (
                    <span className="skill-tag" key={i}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* ── Projeler Section ── */}
        <section id="projects" className="section container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">Portfolyo</span>
            <h2 className="section-title">Projeler</h2>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div 
                className={`project-card ${project.isCapstone ? 'capstone' : ''}`}
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="project-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FiFolder className="project-icon" size={24} />
                    <span className="project-number">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  {project.isCapstone && (
                    <span className="capstone-badge">
                      <FiAward size={11} />
                      Bitirme Projesi
                    </span>
                  )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                {project.subtitle && !project.isCapstone && (
                  <p className="project-subtitle">{project.subtitle}</p>
                )}

                {project.highlightStat && (
                  <div className="project-stat">
                    <span className="project-stat-value">{project.highlightStat.value}</span>
                    <span className="project-stat-label">{project.highlightStat.label}</span>
                  </div>
                )}

                <div className="project-body">
                  {project.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* ── İletişim Section ── */}
        <section id="contact" className="section container">
          <motion.div 
            className="contact-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" style={{ textAlign: 'center' }} variants={fadeUp}>
              <span className="section-label">İletişim</span>
              <h2 className="section-title">Benimle İletişime Geçin</h2>
            </motion.div>

            <motion.p className="contact-text" variants={fadeUp}>
              Yeni fırsatlar veya iş birlikleri için benimle iletişime geçebilirsiniz. 
              Mesajlarınıza en kısa sürede dönüş yapacağım.
            </motion.p>

            <motion.div className="contact-grid" variants={fadeUp}>
              <a href={`mailto:${personal.email}`} className="contact-card">
                <FiMail size={22} />
                <span className="contact-card-label">E-Posta</span>
                <span className="contact-card-value">{personal.email}</span>
              </a>
              <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="contact-card">
                <FiPhone size={22} />
                <span className="contact-card-label">Telefon</span>
                <span className="contact-card-value">{personal.phone}</span>
              </a>
              <div className="contact-card">
                <FiMapPin size={22} />
                <span className="contact-card-label">Konum</span>
                <span className="contact-card-value">{personal.location}</span>
              </div>
            </motion.div>

            <motion.a href={`mailto:${personal.email}`} className="btn btn-primary" variants={fadeUp}>
              Mesaj Gönder
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer personal={personal} />
      <BackToTop />
    </>
  );
}

// ═══════════════════════════════════════
//  SUB COMPONENTS
// ═══════════════════════════════════════

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div 
      className="scroll-progress" 
      style={{ scaleX, transformOrigin: '0%', width: '100%' }}
    />
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy
      const sections = ['home', 'experience', 'education', 'skills', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'experience', label: 'Deneyim' },
    { id: 'education', label: 'Eğitim' },
    { id: 'skills', label: 'Yetkinlikler' },
    { id: 'projects', label: 'Projeler' },
    { id: 'contact', label: 'İletişim' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
            <span className="gradient-text">Kerem Sağır</span>
          </a>

          <div className="nav-links">
            {navItems.map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button 
            className={`hamburger ${isMobileOpen ? 'open' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menü"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <a 
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}

function Footer({ personal }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email">
              <FiMail size={18} />
            </a>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Kerem Sağır. Tüm Hakları Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Başa dön"
    >
      <FiArrowUp size={20} />
    </button>
  );
}

export default App;
