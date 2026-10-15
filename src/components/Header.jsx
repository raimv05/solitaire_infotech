import React from 'react';
import { navItems } from '../data/siteContent.js';

export default function Header({ currentPage, onNavigate }) {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <header className="site-header">
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
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive =
            (item.href === '#contact' && currentPage === 'contact') ||
            (item.href !== '#contact' && currentPage === 'home');
          return (
            <a
              key={item.href}
              href={item.href}
              className={item.href === '#contact' && currentPage === 'contact' ? 'nav-active' : ''}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
