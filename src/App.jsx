import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Workflow from './components/Workflow.jsx';
import Services from './components/Services.jsx';
import Products from './components/Products.jsx';
import AboutSection from './components/AboutSection.jsx';
import OfficesSection from './components/OfficesSection.jsx';
import Footer from './components/Footer.jsx';
import ScrollTopButton from './components/ScrollTopButton.jsx';

const ContactPage = lazy(() => import('./components/ContactPage.jsx'));
const TestPage = lazy(() => import('./components/TestPage.jsx'));

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#contact') return 'contact';
    if (window.location.hash === '#test') return 'test';
    return 'home';
  });
  const [inquiryService, setInquiryService] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setCurrentPage('contact');
      } else if (window.location.hash === '#test') {
        setCurrentPage('test');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (href, service = '') => {
    if (service) {
      setInquiryService(service);
    }
    if (href === '#contact') {
      setCurrentPage('contact');
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === '#test') {
      setCurrentPage('test');
      window.location.hash = 'test';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.location.hash = href.replace('#', '');
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {currentPage === 'contact' ? (
          <Suspense
            fallback={
              <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Loading Contact...</span>
              </div>
            }
          >
            <ContactPage onNavigate={handleNavigate} initialService={inquiryService} />
          </Suspense>
        ) : currentPage === 'test' ? (
          <Suspense
            fallback={
              <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Loading Assessment Portal...</span>
              </div>
            }
          >
            <TestPage onNavigate={handleNavigate} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <Workflow />
            <Services onNavigate={handleNavigate} />
            <Products />
            <AboutSection />
            <OfficesSection />
          </>
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
      <ScrollTopButton />
    </>
  );
}
