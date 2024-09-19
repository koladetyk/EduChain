import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './assets/EDUCHAIN.png'; // Adjust the path as necessary

function VerificationPage() {
    const { walletAddress } = useParams(); // Get the wallet address from the URL
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/get-student-info/${walletAddress}`);
                setStudentInfo(response.data);
            } catch (error) {
                console.error('Error fetching student info:', error);
            }
        };

        if (walletAddress) {
            fetchStudentInfo();
        }
    }, [walletAddress]);

    return (
        <div className="container mt-5 text-center">
            {/* Logo and Heading */}
            <div className="d-flex align-items-center justify-content-center mb-4">
                <img src={logo} alt="EduChain Logo" style={{ maxWidth: '100px', marginRight: '20px' }} />
                <h1 style={{ fontSize: '3rem' }}>Verification</h1>
            </div>

            {/* Student Information Section */}
            {studentInfo ? (
                <div className="card mt-4 shadow-sm p-4">
                    <h2 className="mb-4">Student Information</h2>
                    <p><strong>Name:</strong> {studentInfo.name}</p>
                    <p><strong>Date of Birth:</strong> {studentInfo.date_of_birth}</p>
                    <p><strong>Wallet Address:</strong> {studentInfo.wallet_address}</p>
                    <p><strong>Contact Details:</strong> {studentInfo.contact_details}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default VerificationPage;
