import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Clock, CheckCircle, Play, ArrowRight } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Header/Navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="logo-image" />
            </div>
            <Link to="/" className="logo-text">CareSync</Link>
          </div>
          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#demo">View Demo</a>
            <Link to="/onboarding" className="cta-button">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Your health, in <span className="highlight">sync</span>.
          </h1>
          <p className="hero-subtitle">
            Bring together all your health records from different doctors and providers into one unified, secure timeline.
          </p>
          <div className="hero-buttons">
            <Link to="/onboarding" className="primary-button">
              Get Started Free <ArrowRight className="arrow-icon" />
            </Link>
            <button className="secondary-button">
              <Play className="play-icon" /> View Demo
            </button>
          </div>
          <p className="hero-note">
            No credit card required • Free forever for personal use.
          </p>
        </div>
      </section>

      {/* See CareSync in Action */}
      <section className="demo-section">
        <div className="demo-content">
          <h2>See CareSync in Action</h2>
          <p>Experience how Sarah manages her health records across multiple providers</p>
          <div className="demo-grid">
            <div className="status-updates">
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>Connected to Epic MyChart</span>
              </div>
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>45 medical records synchronized</span>
              </div>
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>Shared with 2 healthcare providers</span>
              </div>
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>Last updated 2 hours ago</span>
              </div>
            </div>
            <div className="patient-card">
              <div className="patient-avatar">
                <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="patient-logo" />
              </div>
              <h3>Sarah Thompson</h3>
              <p>Sample Patient</p>
              <button className="explore-button">Explore Sarah's Timeline</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-content">
          <h2>Everything you need to manage your health</h2>
          <p>CareSync brings together the scattered pieces of your healthcare journey into one seamless experience.</p>
          <div className="features-grid">
            <div className="feature-card">
                          <div className="feature-icon">
              <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="feature-logo" />
            </div>
              <h3>Unified Health Timeline</h3>
              <p>All your medical records from different providers in one chronological view.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield className="icon" />
              </div>
              <h3>Secure & Private</h3>
              <p>HIPAA-inspired security keeps your health information safe and under your control.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users className="icon" />
              </div>
              <h3>Smart Sharing</h3>
              <p>Easily share specific health information with doctors, caregivers, or family members.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock className="icon" />
              </div>
              <h3>Real-time Sync</h3>
              <p>Automatically syncs with your healthcare providers' systems for up-to-date information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="how-it-works-content">
          <h2>How CareSync Works</h2>
          <p>Get started in minutes and take control of your health data</p>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Connect Your Providers</h3>
              <p>Securely link your accounts from Epic, Cerner, and other healthcare systems.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>View Your Timeline</h3>
              <p>See all your health events chronologically in one unified view.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Share Intelligently</h3>
              <p>Share specific information with providers using secure links or QR codes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta-content">
          <h2>Ready to sync your health?</h2>
          <p>Join thousands of patients who have simplified their healthcare management with CareSync.</p>
          <Link to="/onboarding" className="primary-button large">
            Start Your Free Account <ArrowRight className="arrow-icon" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">
              <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="logo-image" />
            </div>
            <Link to="/" className="logo-text">CareSync</Link>
          </div>
          <p className="copyright">© 2025 CareSync. This is a prototype for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
