import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiBriefcase, FiCode, FiFolder } from 'react-icons/fi';
import { cvData } from './data/cvData.js';

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function App() {
  const { personal, education, experience, skills, projects } = cvData;

  return (
    <>
      <Navbar />
      
      <main>
        {/* --- Hero Section --- */}
        <section id="home" className="hero container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 variants={fadeUp}>
                <span className="gradient-text">{personal.name}</span>
              </motion.h1>
              <motion.h2 className="hero-subtitle" variants={fadeUp}>
                {personal.title}
              </motion.h2>
              <motion.p className="hero-desc" variants={fadeUp}>
                {personal.about}
              </motion.p>
              
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
                  <FaLinkedin size={24} />
                </a>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={24} />
                </a>
                <a href={`mailto:${personal.email}`} aria-label="Email">
                  <FiMail size={24} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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

        {/* --- Experience Section --- */}
        <section id="experience" className="section container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Deneyim
          </motion.h2>
          
          <div className="timeline">
            {experience.map((exp, index) => (
              <motion.div 
                className="timeline-item" 
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{exp.role}</h3>
                      <p className="timeline-subtitle">{exp.company}</p>
                    </div>
                    <span className="timeline-date">{exp.period}</span>
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

        {/* --- Education Section --- */}
        <section id="education" className="section container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Eğitim
          </motion.h2>
          
          <div className="timeline">
            {education.map((edu, index) => (
              <motion.div 
                className="timeline-item" 
                key={edu.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <div className="timeline-dot" style={{ borderColor: 'var(--accent-gold)' }}></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{edu.institution}</h3>
                      <p className="timeline-subtitle" style={{ color: 'var(--accent-gold)' }}>
                        {edu.department} {edu.degree && `| Derece: ${edu.degree}`}
                      </p>
                    </div>
                    <span className="timeline-date">{edu.period}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="section container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Yetkinlikler
          </motion.h2>

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
                  {idx === 0 ? <FiCode size={20} /> : idx === 1 ? <FiBriefcase size={20} /> : <FiFolder size={20} />}
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

        {/* --- Projects Section --- */}
        <section id="projects" className="section container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Projeler
          </motion.h2>

          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div 
                className="project-card" 
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="project-header">
                  <FiFolder className="project-icon" size={32} />
                  <h3 className="project-title">{project.title}</h3>
                  {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
                </div>
                <div className="project-body">
                  {project.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="section container">
          <motion.div 
            className="contact-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="section-title">İletişim</h2>
            <p className="contact-text">
              Yeni fırsatlar veya iş birlikleri için benimle iletişime geçebilirsiniz. 
              Mesajlarınıza en kısa sürede dönüş yapacağım.
            </p>

            <div className="contact-info">
              <a href={`mailto:${personal.email}`} className="contact-item">
                <FiMail size={24} color="var(--accent-cyan)" />
                {personal.email}
              </a>
              <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="contact-item">
                <FiPhone size={24} color="var(--accent-cyan)" />
                {personal.phone}
              </a>
              <div className="contact-item">
                <FiMapPin size={24} color="var(--accent-cyan)" />
                {personal.location}
              </div>
            </div>

            <a href={`mailto:${personal.email}`} className="btn btn-primary">
              Mesaj Gönder
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// --- Sub Components ---
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#home" className="logo">
          <span className="gradient-text">Kerem Sağır</span>
        </a>
        <div className="nav-links">
          <a href="#experience">Deneyim</a>
          <a href="#education">Eğitim</a>
          <a href="#skills">Yetkinlikler</a>
          <a href="#projects">Projeler</a>
          <a href="#contact">İletişim</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p className="footer-text">
          © {new Date().getFullYear()} Kerem Sağır. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}

export default App;
