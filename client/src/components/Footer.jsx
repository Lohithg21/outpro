import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top grid-4">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">O</span>
              <span className="logo-text" style={{color:'white'}}>Outpro<span>.India</span></span>
            </Link>
            <p>Building modern, high-performance digital products for ambitious businesses across India.</p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Twitter">X</a>
              <a href="#" aria-label="Instagram">ig</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Careers</a>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/services">Web Development</Link>
            <Link to="/services">UI/UX Design</Link>
            <Link to="/services">Digital Marketing</Link>
            <Link to="/services">SEO Optimization</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>📍 Bengaluru, Karnataka, India</p>
            <p>📧 hello@outpro.in</p>
            <p>📞 +91 XXXXX XXXXX</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Outpro.India. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
