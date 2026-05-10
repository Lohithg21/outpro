import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    desc: 'Full-stack web applications built with modern frameworks. We specialise in MERN stack, Next.js, and Laravel — chosen based on your project needs.',
    features: ['React / Next.js / Vue.js', 'Node.js / Express / MongoDB', 'REST API development', 'Third-party integrations', 'Git-based source delivery'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Design-first approach with Figma handoff before development. Every screen is crafted for usability, brand consistency, and conversion.',
    features: ['Figma / Adobe XD design files', 'Mobile-first responsive layouts', 'Brand typography systems', 'Component design libraries', 'Accessibility (WCAG) compliance'],
  },
  {
    icon: '📈',
    title: 'SEO & Analytics',
    desc: 'We configure GA4, Google Search Console, and structured data so you can track what matters and grow organically.',
    features: ['Google Analytics 4 (GA4)', 'Google Search Console setup', 'On-page SEO optimisation', 'Sitemap & robots.txt', 'Schema / structured data'],
  },
  {
    icon: '⚡',
    title: 'Performance Optimisation',
    desc: 'PageSpeed 90+ on both Mobile and Desktop. We implement every major optimisation technique as standard.',
    features: ['Lazy loading assets', 'CSS/JS minification', 'CDN configuration (Cloudflare)', 'Image optimisation', 'Core Web Vitals improvement'],
  },
  {
    icon: '☁️',
    title: 'Hosting & Deployment',
    desc: 'We handle the full deployment pipeline — from DNS setup to SSL to CI/CD — on the platform that suits your stack.',
    features: ['AWS / GCP / Azure', 'Vercel / Netlify for React apps', 'Shared hosting for WordPress', 'SSL certificate installation', 'Domain mapping & DNS config'],
  },
  {
    icon: '🔧',
    title: 'Maintenance & Support',
    desc: 'Ongoing plans that cover bug fixes, security patches, content updates, and backups — so you can focus on your business.',
    features: ['Monthly security updates', 'Database backups', 'Bug fixes & hotfixes', 'Content management help', 'Performance monitoring'],
  },
  {
    icon: '🛒',
    title: 'CMS Integration',
    desc: 'Whether you need WordPress with a custom theme or a headless CMS, we set it up so your team can update content without touching code.',
    features: ['WordPress (custom theme only)', 'Headless CMS (Sanity, Strapi)', 'Content editor training', 'User roles & permissions', 'Media library setup'],
  },
  {
    icon: '📊',
    title: 'CRM & Marketing Tools',
    desc: 'Connect your site to your business tools. HubSpot, Zoho, Mailchimp, Tawk.to — we integrate them cleanly.',
    features: ['HubSpot / Zoho CRM', 'Mailchimp newsletter forms', 'Tawk.to / Crisp live chat', 'Lead capture forms', 'Email automation triggers'],
  },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your goals, audience, and technical requirements.' },
  { step: '02', title: 'Design Phase', desc: 'Figma wireframes and high-fidelity designs, reviewed and approved by you.' },
  { step: '03', title: 'Development', desc: 'Agile sprints with regular demos. You see progress as it happens.' },
  { step: '04', title: 'QA & Launch', desc: 'Cross-device testing, performance checks, and smooth deployment.' },
  { step: '05', title: 'Handover', desc: 'Git repo, docs, schema, and user manual delivered. You own everything.' },
]

export default function Services() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="page-hero">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>Our Services</span>
          <h1>What We Offer</h1>
          <p>A complete suite of digital services to build, launch, and grow your online presence.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {services.map((s, i) => (
              <div key={i} className="card svc-card">
                <div className="svc-top">
                  <span className="svc-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                </div>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-features">
                  {s.features.map((f, j) => <li key={j}><span className="check">✓</span>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge">How We Work</span>
            <h2 className="section-title">Our Delivery Process</h2>
          </div>
          <div className="process-steps">
            {process.map((p, i) => (
              <div key={i} className="process-step">
                <div className="step-num">{p.step}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
                {i < process.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ background: 'var(--blue)', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: 'clamp(24px,3vw,36px)', marginBottom: 12 }}>Not Sure Which Service You Need?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>Book a free consultation and we'll help you figure it out.</p>
          <Link to="/contact" className="btn btn-white">Book a Free Call →</Link>
        </div>
      </section>
    </div>
  )
}
