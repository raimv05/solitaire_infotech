import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <video
        className="hero-bg-video"
        src="/assets/hero-background.mp4"
        poster="/assets/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-bg-overlay" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">
          <ShieldCheck size={16} aria-hidden="true" />
          Welcome to Solitaire InfoTech
        </p>
        <h1>Defend Your Digital World with Solitaire InfoTech LLC</h1>
        <p>
          We safeguard your digital future with resilient cybersecurity solutions,
          cloud protection, and intelligence-led support tailored to modern teams.
        </p>
        <a className="primary-cta" href="#services">
          Explore services
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
