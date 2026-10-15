import React from 'react';
import { capabilities } from '../data/siteContent.js';

export default function AboutSection() {
  return (
    <section className="about section-shell" id="about" aria-labelledby="about-heading">
      <div className="about-media">
        <div className="photo-stack photo-top">
          <img
            className="about-stack-img"
            src="/assets/about-top.jpg"
            alt="Cyber Security Network Infrastructure"
          />
        </div>
        <div className="photo-stack photo-bottom">
          <img
            className="about-stack-img"
            src="/assets/about-bottom.jpg"
            alt="Encrypted Shield and Cyber Cloud Protection"
          />
        </div>
        <aside className="expertise-card" aria-label="Core expertise">
          <div className="expertise-card-header">CORE EXPERTISE</div>
          <div className="expertise-card-content">
            <strong>05</strong>
            <span>Technology Domains</span>
          </div>
        </aside>
      </div>
      <div className="about-copy">
        <p className="eyebrow">SECURITY & TECHNOLOGY</p>
        <h2 id="about-heading">Secure technology for modern organizations</h2>
        <p className="about-description">
          Solitaire InfoTech delivers secure digital solutions through expertise in infrastructure,
          software, data, cloud, and cybersecurity. Our approach is built around creating technology
          that is sharp, responsive, scalable, and dependable.
        </p>
        <div className="capability-list">
          {capabilities.map(({ label, icon: Icon }) => (
            <div className="capability-item" key={label}>
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
