import React from 'react';
import { MapPin, Globe2, ExternalLink, Navigation } from 'lucide-react';
import { officeLocations } from '../data/siteContent.js';

export default function OfficesSection() {
  return (
    <section className="offices-section section-shell" id="offices" aria-labelledby="offices-heading">
      <div className="offices-header">
        <p className="eyebrow offices-eyebrow">
          <Globe2 size={16} className="eyebrow-icon" aria-hidden="true" />
          Global Presence
        </p>
        <h2 id="offices-heading">Our Global Offices</h2>
        <p className="offices-subtitle">
          Strategic operational hubs delivering 24/7 cybersecurity, software engineering, and enterprise cloud solutions across continents.
        </p>
      </div>

      <div className="offices-banner-container">
        {/* Left Badge Pillar */}
        <div className="offices-badge-pillar">
          <div className="pillar-pin-pulse">
            <MapPin size={34} aria-hidden="true" />
          </div>
          <span className="pillar-label-sub">GLOBAL NETWORK</span>
          <h3 className="pillar-label-main">OUR<br />OFFICES</h3>
          <div className="pillar-accent-glow" aria-hidden="true" />
        </div>

        {/* 3 Country Office Cards */}
        <div className="offices-grid">
          {officeLocations.map((office) => (
            <article
              key={office.id}
              className={`office-card office-card--${office.tone}`}
              tabIndex="0"
            >
              <div className="office-card-header">
                <div className="office-country-wrap">
                  <span className="country-flag" role="img" aria-label={`${office.country} flag`}>
                    {office.flag}
                  </span>
                  <h4 className="country-name">{office.country}</h4>
                </div>
                <span className={`office-role-badge badge--${office.tone}`}>
                  {office.badge}
                </span>
              </div>

              <p className="office-role-desc">{office.role}</p>

              <div className="office-address-box">
                <MapPin size={16} className="office-addr-pin" aria-hidden="true" />
                <address className="office-address-text">
                  {office.address}
                </address>
              </div>

              <div className="office-card-footer">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="office-directions-btn"
                  title={`Open ${office.country} office on Google Maps`}
                >
                  <Navigation size={14} aria-hidden="true" />
                  <span>Get Directions</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
