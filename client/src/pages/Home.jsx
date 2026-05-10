import { Link } from 'react-router-dom'
import './Home.css'

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Industries Served' },
]

const services = [
  { icon: '💻', title: 'Web Development', desc: 'Full-stack MERN applications built for performance, scalability, and long-term maintainability.' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Figma-first design process. Pixel-perfect implementations that align with your brand identity.' },
  { icon: '📈', title: 'Digital Marketing', desc: 'GA4, Search Console, and CRM integrations to turn your website into a lead generation machine.' },
  { icon: '⚡', title: 'Performance Optimization', desc: 'PageSpeed 90+ scores, Lazy Loading, CDN setup, and minification — your site will fly.' },
  { icon: '🔒', title: 'Security & Hosting', desc: 'SSL, DNS configuration, AWS/Vercel deployment, and monthly security update plans.' },
  { icon: '🛠️', title: 'Maintenance & Support', desc: 'Monthly retainers covering bug fixes, content updates, backups, and feature additions.' },
]

const testimonials = [
  { name: 'Rahul Sharma', role: 'CEO, TechStart India', text: 'Outpro delivered our corporate website ahead of schedule. The performance scores exceeded our expectations — 97 on desktop PageSpeed.' },
  { name: 'Priya Nair', role: 'Marketing Head, GrowthCo', text: 'The team understood our brand perfectly. Lead generation increased by 40% within two months of launch.' },
  { name: 'Amit Joshi', role: 'Founder, DesignHub', text: 'Professional, responsive, and technically solid. The documentation they handed over was thorough and well-organized.' },
]

export default function Home() {
  return (
    <div className="home" style={{ paddingTop: 'var(--nav-h)' }}>

      <section className="hero">
        <div className="container hero-inner hero-single">
          <span className="badge">Digital Agency · Bengaluru, India</span>
          <h1 className="hero-heading">
            We Build Websites That<br />
            <span className="text-blue">Work for Your Business</span>
          </h1>
          <p className="hero-sub">
            High-performance corporate websites with modern tech stacks, measurable results, and clean code you'll actually own.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Start a Project →</Link>
            <Link to="/portfolio" className="btn btn-outline">View Our Work</Link>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">What We Do</span>
            <h2 className="section-title">End-to-End Digital Solutions</h2>
            <p className="section-subtitle">From design to deployment, we handle every layer of your digital presence.</p>
          </div>
          <div className="grid-3">
            {services.map((s, i) => (
              <div key={i} className="card service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline">See All Services</Link>
          </div>
        </div>
      </section>

      <section className="section why-us">
        <div className="container">
          <div className="why-single">
            <span className="badge">Why Outpro</span>
            <h2 className="section-title">Built for Performance. Owned by You.</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: 16, margin: '16px 0 28px', maxWidth: 560 }}>
              We don't lock you into proprietary systems. You get the Git repo, the docs, the schema, and the knowledge to manage it yourself.
            </p>
            <ul className="why-list why-list-grid">
              {[
                'Full source code ownership via Git',
                'Architecture diagrams + DB schema on delivery',
                'PageSpeed 90+ guaranteed',
                'Figma handoff before development starts',
                'GA4 + Search Console integrated out of the box',
                '3-month post-launch support included',
              ].map((item, i) => (
                <li key={i}><span className="check">✓</span>{item}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 32 }}>Talk to Us →</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge">Client Reviews</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Ready to Build Something Great?</h2>
          <p>Let's talk about your project. Free consultation, no strings attached.</p>
          <Link to="/contact" className="btn btn-white">Get a Free Quote →</Link>
        </div>
      </section>

    </div>
  )
}
