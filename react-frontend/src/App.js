// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import StudentDashboard from './StudentDashboard';
import InstitutionDashboard from './InstitutionDashboard';
import VerificationPage from './VerificationPage';
import CredentialVerificationPage from './CredentialVerificationPage'; // Import the new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student-portal" element={<StudentDashboard />} />
                <Route path="/institution-portal" element={<InstitutionDashboard />} />
                <Route path="/verify-student/:walletAddress" element={<VerificationPage />} />
                <Route path="/verify-credential" element={<CredentialVerificationPage />} /> {/* New route */}
            </Routes>
        </Router>
    );
}

export default App;
