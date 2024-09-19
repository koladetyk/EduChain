// src/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/EDUCHAIN.png'; // Update the path according to where you've placed the logo

function HomePage() {
    return (
        <div className="container mt-5 text-center">
            {/* EduChain Logo */}
            <img src={logo} alt="EduChain Logo" className="mb-4" style={{ maxWidth: '300px' }} /> {/* Increased logo size */}
            
            <h1 style={{ fontSize: '3rem' }}>Welcome to EduChain</h1> {/* Increased heading size */}
            
            {/* Short description paragraph */}
            <p className="mt-3" style={{ fontSize: '1.25rem' }}> {/* Larger paragraph text */}
                EduChain is a decentralized platform that leverages blockchain technology to issue and verify academic credentials securely and efficiently. Our platform provides a seamless interface for institutions to issue certificates and for students to showcase their achievements.
            </p>
            
            {/* Navigation Links */}
            <Link to="/student-portal" className="btn btn-light btn-lg mt-3 mr-3">Student Portal</Link> {/* Large button */}
            <Link to="/institution-portal" className="btn btn-light btn-lg mt-3 mr-3">Institution Portal</Link> {/* Large button */}
            <Link to="/verify-credential" className="btn btn-light btn-lg mt-3">Verify Credential</Link> {/* Large button */}
        </div>
    );
}

export default HomePage;
