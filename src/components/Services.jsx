import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { services } from '../data/siteContent.js';

export default function Services() {
  return (
    <section className="services section-shell" id="services" aria-labelledby="services-heading">
      <p className="eyebrow services-eyebrow">
        <ShieldAlert size={16} className="eyebrow-icon" aria-hidden="true" />
        Services
      </p>
      <h2 id="services-heading">Cyber Security Solutions</h2>
      <div className="services-grid">
        {services.map(({ title, description, icon: Icon, tone, motion }) => (
          <article className={`service-card ${tone}`} key={title} tabIndex="0">
            <div className={`service-icon motion-${motion}`}>
              <div className="service-icon-glow" aria-hidden="true" />
              <div className="service-icon-ring" aria-hidden="true" />
              <div className="service-icon-inner">
                <Icon size={44} strokeWidth={1.8} className="service-icon-svg" aria-hidden="true" />
              </div>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
