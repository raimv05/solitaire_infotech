import React, { useState } from 'react';
import { ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import { serviceCategories } from '../data/siteContent.js';

export default function Services({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('talent');

  const currentCategory =
    serviceCategories.find((cat) => cat.id === activeCategory) || serviceCategories[0];

  const handleInquire = (e, title) => {
    e.preventDefault();
    try {
      sessionStorage.setItem('preferred_service', title);
    } catch {
      // ignore storage error
    }

    if (typeof onNavigate === 'function') {
      onNavigate('#contact', title);
    } else {
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % serviceCategories.length;
      setActiveCategory(serviceCategories[nextIndex].id);
      document.getElementById(`tab-${serviceCategories[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + serviceCategories.length) % serviceCategories.length;
      setActiveCategory(serviceCategories[prevIndex].id);
      document.getElementById(`tab-${serviceCategories[prevIndex].id}`)?.focus();
    }
  };

  return (
    <section className="services section-shell" id="services" aria-labelledby="services-heading">
      <div className="services-header">
        <p className="eyebrow services-eyebrow">
          {activeCategory === 'talent' ? (
            <Globe size={16} className="eyebrow-icon" aria-hidden="true" />
          ) : (
            <ShieldCheck size={16} className="eyebrow-icon" aria-hidden="true" />
          )}
          {currentCategory.eyebrow}
        </p>
        <h2 id="services-heading">{currentCategory.heading}</h2>
        <p className="services-subtitle">{currentCategory.subheading}</p>

        {/* Categorized Tabs Switcher */}
        <div
          className="services-tabs-container"
          role="tablist"
          aria-label="Service Categories"
        >
          {serviceCategories.map((category, index) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                id={`tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`services-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="services-tab-label">{category.label}</span>
                <span className="services-tab-badge" aria-label={`${category.count} services`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid Panel */}
      <div
        id={`panel-${currentCategory.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentCategory.id}`}
        className={`services-grid ${currentCategory.id === 'talent' ? 'five-items' : 'six-items'}`}
      >
        {currentCategory.items.map(
          ({ title, subtitle, description, badge, tags, icon: Icon, tone, motion }) => (
            <article className={`service-card ${tone}`} key={title} tabIndex="0">
              {badge && <span className="service-card-badge">{badge}</span>}
              <div className={`service-icon motion-${motion}`}>
                <div className="service-icon-glow" aria-hidden="true" />
                <div className="service-icon-ring" aria-hidden="true" />
                <div className="service-icon-inner">
                  <Icon size={44} strokeWidth={1.8} className="service-icon-svg" aria-hidden="true" />
                </div>
              </div>
              <h3>{title}</h3>
              {subtitle && <p className="service-subhead">{subtitle}</p>}
              <p className="service-description">{description}</p>
              {tags && tags.length > 0 && (
                <div className="service-tags" aria-label="Key specialties">
                  {tags.map((tag) => (
                    <span key={tag} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <a
                href="#contact"
                className="service-card-cta"
                onClick={(e) => handleInquire(e, title)}
                aria-label={`Inquire about ${title}`}
              >
                <span>Inquire Now</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </article>
          )
        )}
      </div>
    </section>
  );
}

