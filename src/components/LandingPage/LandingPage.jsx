import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FiCpu, FiBarChart2, FiSettings } from 'react-icons/fi';

import mapImage from './mapImage.png';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* ===== Hero Section ===== */}
            <section className="hero-section">
                <div className="hero-container">
                    <header className="landing-header">
                        <div className="logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon"><path d="M4 8L4 6C4 4.89543 4.89543 4 6 4L18 4C19.1046 4 20 4.89543 20 6V8" stroke="white" strokeWidth="2" strokeLinecap="round" /><path d="M4 16L4 18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16" stroke="white" strokeWidth="2" strokeLinecap="round" /><path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                            <span>Tech Trekkers : SIH 2025 </span>
                        </div>
                    </header>
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>DeepSea Drive : <br></br>India's Unified Marine Intelligence Platform</h1>
                            <p>Transforming and predicting integrated physical,chemical and biological data for sustainable ocean management & researach</p>
                            <div className="hero-buttons">
                                <Link to="/dashboard" className="btn btn-primary">GO TO CONSOLE</Link>
                                <button className="btn btn-secondary">Explore Core Features →</button>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src={mapImage} alt="World Map Visualization" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Features Section ===== */}
            <section className="features-section">
                <h2>Integrated Intelligence</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><FiSettings /></div>
                        <h3>Deep Scientific Intelligence</h3>
                        <p>Tailored data views for different users to monitor key metrics and decisions</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiCpu /></div>
                        <h3>AI Modeling & Processing</h3>
                        <p>Modular tools for advanced research workflows and data analysis</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiBarChart2 /></div>
                        <h3>Role-Specific Dashboard</h3>
                        <p>Scalable AI engines for automated insights and collaborative analytics</p>
                    </div>
                </div>
            </section>

            {/* ===== Empower Section ===== */}
            <section className="empower-section">
                <div className="empower-container">
                    <div className="empower-content">
                        <h2>Empower Your Research with Predictive Insights</h2>
                    </div>
                    <button className="btn btn-tertiary">Request Platform Briefing</button>
                </div>
            </section>
            {/* ===== Footer ===== */}
            <footer className="landing-footer">
                <div className="footer-links">
                    <a href="#">API Documentation</a>
                    <a href="#">Contacts</a>
                </div>
                <div className="footer-copyright">
                    © 2025 Tech Trekkers
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;