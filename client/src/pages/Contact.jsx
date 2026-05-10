import { useState } from 'react'
import axios from 'axios'
import './Contact.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialForm = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) 

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading')
    try {
      await axios.post(`${API_URL}/api/contact`, form)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="page-hero">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>Contact</span>
          <h1>Let's Talk</h1>
          <p>Tell us about your project. We typically respond within 24 hours.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {}
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Whether you have a clear brief or just an idea, we're happy to have a conversation.</p>

              <div className="info-items">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <strong>Office</strong>
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <span>hello@outpro.in</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <span>+91 XXXXX XXXXX</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🕐</span>
                  <div>
                    <strong>Hours</strong>
                    <span>Mon–Fri, 9 AM – 6 PM IST</span>
                  </div>
                </div>
              </div>

              <div className="response-note">
                <span>⚡</span>
                <p>Average response time: <strong>under 4 hours</strong> on business days.</p>
              </div>
            </div>

            {}
            <div className="contact-form-wrap card">
              <h3>Send Us a Message</h3>

              {status === 'success' && (
                <div className="success-msg">
                  ✅ Your message has been sent! We'll get back to you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="error-msg" style={{ background: '#FEF2F2', padding: '14px 18px', borderRadius: 8, marginBottom: 20, border: '1px solid #FECACA', fontSize: 14 }}>
                  ❌ Something went wrong. Please try again or email us directly.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Rahul Sharma" />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@company.com" />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="form-group">
                    <label>Phone (Optional)</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="form-group">
                    <label>Service Needed</label>
                    <select name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service</option>
                      <option>Web Development</option>
                      <option>UI/UX Design</option>
                      <option>SEO & Analytics</option>
                      <option>Performance Optimisation</option>
                      <option>Maintenance & Support</option>
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Estimated Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select range</option>
                    <option>Under ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>₹1,00,000 – ₹3,00,000</option>
                    <option>₹3,00,000+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project, goals, and timeline..." />
                  {errors.message && <span className="error-msg">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 16 }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
