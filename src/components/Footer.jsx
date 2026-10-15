import React from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import { contactInfo, officeLocations } from '../data/siteContent.js';

export default function Footer({ onNavigate }) {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <footer className="site-footer" id="footer" aria-label="Site footer">
      <div className="footer-top section-shell">
        {/* Brand & SOC Status Column */}
        <div className="footer-col brand-col">
          <a
            className="brand"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Solitaire InfoTech home"
          >
            <picture>
              <source srcSet="/img/logo-transparent.webp" type="image/webp" />
              <img
                className="brand-logo"
                src="/img/logo-transparent.png"
                alt="Nexavrios | Solitaire InfoTech"
                width="72"
                height="72"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </a>
          <p className="footer-tagline">
            Securing modern digital enterprises through intelligence-led cybersecurity, cloud protection, and reliable technology solutions.
          </p>
          <div className="soc-status-badge">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-text">SOC 24/7 Monitoring Active</span>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
                About Us
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                Cyber Services
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Cyber Solutions Column */}
        <div className="footer-col services-col">
          <h4 className="footer-heading">Key Services</h4>
          <ul className="footer-links">
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                Managed Security Services
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                Cloud Security & Governance
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                Cyber Threat Intelligence
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                Business Intelligence & Data
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Get in Touch</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} className="icon-cyan" aria-hidden="true" />
              <a
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open location on Google Maps"
              >
                {contactInfo.address}
              </a>
            </li>
            <li>
              <Phone size={18} className="icon-cyan" aria-hidden="true" />
              <a href="tel:+919817999458">+91 98179 99458</a>
            </li>
            <li>
              <Mail size={18} className="icon-cyan" aria-hidden="true" />
              <a href="mailto:info@solitaireinfotech.com">info@solitaireinfotech.com</a>
            </li>
            <li>
              <Clock size={18} className="icon-cyan" aria-hidden="true" />
              <span>24/7 Emergency Incident Hotline</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Global Offices Bar */}
      <div className="footer-offices-section">
        <div className="section-shell">
          <div className="footer-offices-header">
            <span className="footer-offices-title">
              <Globe2 size={16} className="icon-cyan" aria-hidden="true" />
              Our Global Offices
            </span>
          </div>
          <div className="footer-offices-grid">
            {officeLocations.map((office) => (
              <div key={office.id} className="footer-office-item">
                <div className="footer-office-country">
                  <span className="footer-office-flag" role="img" aria-label={office.country}>
                    {office.flag}
                  </span>
                  <strong>{office.country}</strong>
                  <span className="footer-office-badge">{office.badge}</span>
                </div>
                <p className="footer-office-desc">{office.role}</p>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-office-link"
                  title={`Open ${office.country} location in Google Maps`}
                >
                  <MapPin size={13} className="footer-pin-icon" aria-hidden="true" />
                  <span>{office.address}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance & Trust Bar */}
      <div className="footer-compliance-bar">
        <div className="compliance-wrapper">
          <span className="compliance-label">Security & Compliance Standards:</span>
          <div className="compliance-badges">
            <span className="badge-item">
              <ShieldCheck size={16} /> ISO 27001 Certified
            </span>
            <span className="badge-item">
              <Lock size={16} /> SOC 2 Type II
            </span>
            <span className="badge-item">
              <CheckCircle2 size={16} /> GDPR Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} Solitaire InfoTech LLC. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <span className="divider">•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <span className="divider">•</span>
            <a href="#security" onClick={(e) => e.preventDefault()}>
              Security Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
