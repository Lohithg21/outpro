import './About.css'

const team = [
  { name: 'Arjun Mehta', role: 'Founder & Full-Stack Developer', bio: 'MERN specialist with 6 years building corporate web products. Previously at Infosys Digital.' },
  { name: 'Sneha Kulkarni', role: 'Lead UI/UX Designer', bio: 'Figma expert and brand strategist. Obsessed with accessibility and conversion-focused design.' },
  { name: 'Karan Patel', role: 'Backend Engineer', bio: 'Node.js and MongoDB specialist. Handles APIs, auth systems, and cloud deployments.' },
  { name: 'Divya Nair', role: 'SEO & Marketing Analyst', bio: 'GA4-certified. Runs analytics setups, Search Console configurations, and on-page SEO audits.' },
]

const values = [
  { icon: '📦', title: 'Full Ownership', desc: 'You own the code, the docs, and the repo. No lock-in, ever.' },
  { icon: '🔍', title: 'Transparency', desc: 'Weekly updates, open Notion boards, and honest timelines.' },
  { icon: '🚀', title: 'Performance First', desc: "We don't ship slow sites. PageSpeed 90+ is a baseline, not a goal." },
  { icon: '📐', title: 'Design Integrity', desc: 'Figma handoff before development. No guesswork, no rework.' },
]

export default function About() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="page-hero">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>About Us</span>
          <h1>Who We Are</h1>
          <p>A small, focused team of developers and designers building digital products that last.</p>
        </div>
      </div>

      {}
      <section className="section">
        <div className="container">
          <div className="grid-2 about-story" style={{ alignItems: 'center', gap: '64px' }}>
            <div>
              <span className="badge">Our Story</span>
              <h2 className="section-title">Built in Bengaluru.<br />Serving India.</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: 16, marginTop: 16, lineHeight: 1.8 }}>
                Outpro.India started in 2019 as a freelance web development service. Over time, we grew into a full-service digital agency with a focus on corporate clients who want professional, high-performance websites — not cookie-cutter templates.
              </p>
              <p style={{ color: 'var(--gray-500)', fontSize: 16, marginTop: 14, lineHeight: 1.8 }}>
                We're not a giant agency. We're a tight team that cares about what we ship. Every project gets senior-level attention from kickoff to handover.
              </p>
            </div>
            <div className="about-stats-grid">
              {[
                { val: '2019', label: 'Founded' },
                { val: '50+', label: 'Projects' },
                { val: '20+', label: 'Industries' },
                { val: '4', label: 'Core Team' },
              ].map((s, i) => (
                <div key={i} className="about-stat-box">
                  <div className="about-stat-val">{s.val}</div>
                  <div className="about-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={i} className="card value-card">
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">The Team</span>
            <h2 className="section-title">People Behind the Work</h2>
          </div>
          <div className="grid-4">
            {team.map((m, i) => (
              <div key={i} className="card team-card">
                <div className="team-avatar">{m.name.split(' ').map(n=>n[0]).join('')}</div>
                <h4>{m.name}</h4>
                <span className="team-role">{m.role}</span>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
