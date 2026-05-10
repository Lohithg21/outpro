import { useState } from 'react'
import './Portfolio.css'

const projects = [
  { id: 1, title: 'FinEdge Dashboard', category: 'Web App', tags: ['React', 'Node.js', 'MongoDB'], desc: 'Financial analytics dashboard with real-time data, custom charts, and role-based access control.', color: '#1B4FFF' },
  { id: 2, title: 'GreenMart E-Commerce', category: 'E-Commerce', tags: ['Next.js', 'Stripe', 'PostgreSQL'], desc: 'Full-featured organic grocery platform with cart, payments, and an admin inventory system.', color: '#10B981' },
  { id: 3, title: 'LawFirm Pro', category: 'Corporate Site', tags: ['React', 'Express', 'MongoDB'], desc: 'Professional website for a Bengaluru law firm with appointment booking and case tracking portal.', color: '#8B5CF6' },
  { id: 4, title: 'EduPath LMS', category: 'Web App', tags: ['Vue.js', 'Node.js', 'MySQL'], desc: 'Learning management system supporting 5,000+ students with video streaming, quizzes, and certificates.', color: '#F59E0B' },
  { id: 5, title: 'HealthHub Clinic', category: 'Corporate Site', tags: ['Next.js', 'Tailwind', 'Strapi'], desc: 'Multi-location clinic website with doctor profiles, online booking, and blog with SEO optimisation.', color: '#EF4444' },
  { id: 6, title: 'BuildCraft Portfolio', category: 'Portfolio', tags: ['React', 'Framer Motion', 'Netlify'], desc: 'Award-winning portfolio site for a construction firm. PageSpeed 99/100. Figma-to-code project.', color: '#0D0D0D' },
]

const categories = ['All', 'Web App', 'E-Commerce', 'Corporate Site', 'Portfolio']

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="page-hero">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>Our Work</span>
          <h1>Portfolio</h1>
          <p>A selection of projects we're proud of. Every one delivered with clean code and full documentation.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filtered.map(project => (
              <div key={project.id} className="project-card card">
                <div className="project-thumb" style={{ background: project.color }}>
                  <span className="project-initial">{project.title[0]}</span>
                  <span className="project-category-tag">{project.category}</span>
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '40px 0' }}>No projects found in this category.</p>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-100)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Want to Be Our Next Case Study?</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 28px' }}>We're currently taking on new projects for Q3 2025.</p>
          <a href="/contact" className="btn btn-primary">Start a Conversation →</a>
        </div>
      </section>
    </div>
  )
}
