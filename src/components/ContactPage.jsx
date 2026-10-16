import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Building2,
  User,
  Sparkles,
  Radio,
  FileCheck2,
  Navigation,
  ExternalLink,
  Globe2,
} from 'lucide-react';
import { contactInfo, officeLocations } from '../data/siteContent.js';

export default function ContactPage({ onNavigate, initialService }) {
  const [activeMapTab, setActiveMapTab] = useState('live');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'Global Talent Acquisition',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
      return;
    }
    try {
      const savedService = sessionStorage.getItem('preferred_service');
      if (savedService) {
        setFormData((prev) => ({ ...prev, service: savedService }));
        sessionStorage.removeItem('preferred_service');
      }
    } catch {
      // ignore
    }
  }, [initialService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the typical response time for new security inquiries?',
      answer:
        'Our Security Operations Center (SOC) team reviews incoming inquiries 24/7. Standard business inquiries receive a tailored response within 2–4 business hours. Emergency threat incidents are triaged immediately.',
    },
    {
      question: 'Do you offer custom security assessment packages for mid-market companies?',
      answer:
        'Yes. We tailor our threat monitoring, cloud posture hardening, and risk management packages to align with your organization’s infrastructure size, compliance frameworks, and budget priorities.',
    },
    {
      question: 'How does Solitaire InfoTech handle rapid incident response emergencies?',
      answer:
        'We maintain a dedicated 24/7 Emergency Incident Hotline. When an incident alert is raised, our incident responders activate containment protocols within 15 minutes of escalation.',
    },
    {
      question: 'Where are your primary Security Operations Centers located?',
      answer:
        'Our headquarters and primary operations are based at R&R Tower, Sector 74, Phase 8B Industrial Area, Sahibzada Ajit Singh Nagar, Punjab, supported by 24/7 dedicated SOC analysts and engineering teams.',
    },
  ];

  return (
    <div className="contact-page-container">
      {/* Contact Hero Banner */}
      <section className="contact-hero section-shell">
        <div className="contact-hero-content">
          <div className="breadcrumb">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('#home');
              }}
            >
              Home
            </a>
            <span className="sep">/</span>
            <span className="current">Contact Us</span>
          </div>

          <p className="eyebrow">
            <Radio size={16} className="pulse-icon" aria-hidden="true" />
            24/7 Security Operations Touchpoint
          </p>

          <h1 className="contact-hero-title">
            Connect with Solitaire InfoTech Security Specialists
          </h1>
          <p className="contact-hero-desc">
            Have a question about our cybersecurity services, cloud infrastructure protection, or custom digital solutions? Our engineering team is ready to consult with you.
          </p>
        </div>
      </section>

      {/* Touchpoint Info Cards Grid */}
      <section className="contact-cards-section section-shell">
        <div className="contact-info-grid">
          <article className="contact-info-card">
            <div className="card-icon-box cyan">
              <MapPin size={26} aria-hidden="true" />
            </div>
            <h3>Corporate Headquarters</h3>
            <p>R&R Tower, Plot no 298F, Phase 8B, Industrial Area, Sector 74</p>
            <span className="card-detail">Sahibzada Ajit Singh Nagar, Punjab 140307</span>
          </article>

          <article className="contact-info-card">
            <div className="card-icon-box blue">
              <Phone size={26} aria-hidden="true" />
            </div>
            <h3>Direct Telephone</h3>
            <p>
              <a href="tel:+919817999458">+91 98179 99458</a>
            </p>
            <span className="card-detail">Mobile & Direct Desk</span>
          </article>

          <article className="contact-info-card">
            <div className="card-icon-box violet">
              <Mail size={26} aria-hidden="true" />
            </div>
            <h3>Email Support</h3>
            <p>
              <a href="mailto:info@solitaireinfotech.com">info@solitaireinfotech.com</a>
            </p>
            <span className="card-detail">soc@solitaireinfotech.com</span>
          </article>

          <article className="contact-info-card">
            <div className="card-icon-box amber">
              <Clock size={26} aria-hidden="true" />
            </div>
            <h3>Operating Hours</h3>
            <p>24/7/365 Continuous SOC</p>
            <span className="card-detail">Always Monitoring</span>
          </article>
        </div>
      </section>

      {/* Global Offices Section on Contact Page */}
      <section className="contact-offices-section section-shell" aria-labelledby="contact-offices-heading">
        <div className="contact-offices-header">
          <p className="eyebrow">
            <Globe2 size={16} className="eyebrow-icon" aria-hidden="true" />
            Global Presence
          </p>
          <h2 id="contact-offices-heading">Our Global Offices</h2>
          <p className="contact-offices-sub">
            Visit our regional facilities or connect directly with our regional engineering and management teams.
          </p>
        </div>

        <div className="contact-offices-grid">
          {officeLocations.map((office) => (
            <article key={office.id} className={`contact-office-card office-card--${office.tone}`}>
              <div className="contact-office-top">
                <span className="office-flag-big" role="img" aria-label={`${office.country} flag`}>
                  {office.flag}
                </span>
                <div className="contact-office-title-wrap">
                  <h3>{office.country}</h3>
                  <span className={`contact-office-role-badge badge--${office.tone}`}>{office.badge}</span>
                </div>
              </div>
              <p className="contact-office-role-desc">{office.role}</p>
              <div className="contact-office-address-row">
                <MapPin size={16} className="pin-accent" aria-hidden="true" />
                <address className="contact-office-address-text">{office.address}</address>
              </div>
              <div className="contact-office-footer">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-office-map-link"
                >
                  <Navigation size={14} aria-hidden="true" />
                  <span>Open on Google Maps</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Form & Map Main Container */}
      <section className="contact-main-section section-shell">
        <div className="contact-main-grid">
          {/* Left Column: Form */}
          <div className="contact-form-wrapper">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and an engineer will contact you shortly.</p>
            </div>

            {formSubmitted ? (
              <div className="form-success-alert" role="alert">
                <div className="success-icon-badge">
                  <CheckCircle2 size={44} />
                </div>
                <h3>Message Transmitted Successfully</h3>
                <p>
                  Thank you, <strong>{formData.fullName || 'Client'}</strong>. Your inquiry regarding{' '}
                  <strong>{formData.service}</strong> has been logged into our triage queue.
                </p>
                <div className="ticket-id-tag">
                  <FileCheck2 size={16} /> Reference ID: #SOC-INQ-{Math.floor(10000 + Math.random() * 90000)}
                </div>
                <button
                  type="button"
                  className="reset-form-btn"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      company: '',
                      service: 'Managed Security Services',
                      message: '',
                    });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row split">
                  <div className="input-group">
                    <label htmlFor="fullName">
                      <User size={15} /> Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="email">
                      <Mail size={15} /> Work Email <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row split">
                  <div className="input-group">
                    <label htmlFor="phone">
                      <Phone size={15} /> Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="company">
                      <Building2 size={15} /> Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Acme Enterprises"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="service">
                      <ShieldCheck size={15} /> Primary Area of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <optgroup label="Global Talent Acquisition">
                        <option value="Global Talent Acquisition">Global Talent Acquisition</option>
                        <option value="North America Talent Acquisition">North America Talent Acquisition (US & Canada)</option>
                        <option value="UK & Europe Recruitment">UK & Europe Recruitment</option>
                        <option value="India Talent Acquisition">India Talent Acquisition (Pan-India)</option>
                        <option value="Global Workforce Solutions">Global Workforce Solutions (Executive & Volume)</option>
                      </optgroup>
                      <optgroup label="Cyber Security & Technology">
                        <option value="Managed Security Services">Managed Security Services</option>
                        <option value="Cloud Security">Cloud Security & Governance</option>
                        <option value="Cyber Threat Intelligence">Cyber Threat Intelligence</option>
                        <option value="Security Training & Awareness">Security Training & Awareness</option>
                        <option value="Cloud Computing">Cloud Computing Infrastructure</option>
                        <option value="Business Intelligence & Data Visualization">Business Intelligence & Data</option>
                      </optgroup>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="message">
                      <MessageSquare size={15} /> Project Details / Message <span className="req">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Describe your current requirements, timeline, or security goals..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button type="submit" className="submit-form-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Encrypting & Transmitting...
                    </>
                  ) : (
                    <>
                      Send Secure Message
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Interactive Google Map & SOC Location Card */}
          <div className="contact-map-wrapper">
            <div className="map-card">
              <div className="map-image-container">
                {activeMapTab === 'live' ? (
                  <iframe
                    title="Solitaire InfoTech LLC Location Map"
                    src={contactInfo.embedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="contact-map-iframe"
                  />
                ) : (
                  <>
                    <picture>
                      <source srcSet="/assets/contact-map.webp" type="image/webp" />
                      <img
                        src="/assets/contact-map.jpg"
                        alt="Global Security Operations Map Hologram"
                        className="contact-map-img"
                        width="1200"
                        height="670"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="map-overlay-badge">
                      <Sparkles size={16} /> Global Threat Network
                    </div>
                  </>
                )}

                <div className="map-view-tabs" role="tablist" aria-label="Map view selector">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMapTab === 'live'}
                    className={`map-tab-btn ${activeMapTab === 'live' ? 'active' : ''}`}
                    onClick={() => setActiveMapTab('live')}
                  >
                    <MapPin size={13} /> Live Map
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMapTab === 'threat'}
                    className={`map-tab-btn ${activeMapTab === 'threat' ? 'active' : ''}`}
                    onClick={() => setActiveMapTab('threat')}
                  >
                    <Sparkles size={13} /> Threat Map
                  </button>
                </div>
              </div>

              <div className="map-card-info">
                <span className="hq-tag">Corporate Headquarters</span>
                <h3>Solitaire InfoTech LLC</h3>
                <p className="map-address-text">
                  <MapPin size={16} className="pin-cyan" aria-hidden="true" />
                  <span>{contactInfo.address}</span>
                </p>

                <div className="location-specs">
                  <div className="spec-item">
                    <span className="spec-label">Facility:</span>
                    <span className="spec-val">R&R Tower (Phase 8B)</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Coordinates:</span>
                    <span className="spec-val">{contactInfo.coordinates}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">SOC & Office Status:</span>
                    <span className="spec-val active-green">● Active & Operational</span>
                  </div>
                </div>

                <a
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-get-directions"
                >
                  <Navigation size={16} aria-hidden="true" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-section section-shell">
        <div className="faq-header">
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Need Quick Answers?</h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.question}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`faq-chevron ${isOpen ? 'rotate' : ''}`} size={20} />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
