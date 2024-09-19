import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import './InstitutionDashboard.css'; // Import the custom CSS
import logo from './assets/EDUCHAIN.png';

function InstitutionDashboard() {
    const [institutionData, setInstitutionData] = useState({
        name: '',
        address: '',
        contact_info: '',
        accreditation_status: '',
    });

    const [credentialData, setCredentialData] = useState({
        studentWalletAddress: '',
        degree: ''
    });

    const [qrValue, setQrValue] = useState('');
    const [students, setStudents] = useState([]);

    const handleInstitutionChange = (e) => {
        setInstitutionData({ ...institutionData, [e.target.name]: e.target.value });
    };

    const handleCredentialChange = (e) => {
        setCredentialData({ ...credentialData, [e.target.name]: e.target.value });
    };

    const handleInstitutionSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/add-institution', institutionData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert('Institution added successfully!');
        } catch (error) {
            console.error('Error adding institution!', error);
        }
    };

    const handleCredentialSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/issue-credential', {
                to: credentialData.studentWalletAddress,
                institutionName: institutionData.name,
                degree: credentialData.degree,
                dateOfIssue: new Date().toISOString().split('T')[0],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            // Use token_id instead of transactionHash for QR Code value
            const tokenId = response.data.tokenId; // Get the numeric token ID from the response
            const qrData = `${tokenId},${credentialData.studentWalletAddress}`;
            setQrValue(qrData);
            
            alert('Credential issued successfully! Token ID: ' + tokenId);
        } catch (error) {
            console.error('Error issuing credential!', error);
        }
    };

    // Fetch all students when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/get-all-students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students!', error);
            }
        };
        
        fetchStudents();
    }, []);

    return (
        <div className="container mt-5">
            {/* Header with Logo and Title */}
            <div className="d-flex align-items-center justify-content-center mb-4">
                <img src={logo} alt="EduChain Logo" style={{ width: '100px', marginRight: '10px' }} />
                <h1 className="text-white">Institution Dashboard</h1>
            </div>

            {/* Institution Form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-black text-white">Add Institution</div>
                <div className="card-body">
                    <form onSubmit={handleInstitutionSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Institution Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={institutionData.name}
                                onChange={handleInstitutionChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={institutionData.address}
                                onChange={handleInstitutionChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="contact_info">Contact Info</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contact_info"
                                name="contact_info"
                                value={institutionData.contact_info}
                                onChange={handleInstitutionChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="accreditation_status">Accreditation Status</label>
                            <select
                                className="form-control"
                                id="accreditation_status"
                                name="accreditation_status"
                                value={institutionData.accreditation_status}
                                onChange={handleInstitutionChange}
                                required
                            >
                                <option value="">Select Accreditation Status</option>
                                <option value="accredited">Accredited</option>
                                <option value="not_accredited">Not Accredited</option>
                            </select>
                        </div>
                        <button type="submit" className="btn bg-black text-white w-100">Add Institution</button>
                    </form>
                </div>
            </div>

            {/* Display All Students */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-black text-white">All Students</div>
                <div className="card-body">
                    {students.length > 0 ? (
                        <ul className="list-group">
                            {students.map((student, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>Name:</strong> {student.name}<br />
                                    <strong>Date of Birth:</strong> {student.date_of_birth}<br />
                                    <strong>Wallet Address:</strong> {student.wallet_address}<br />
                                    <strong>Contact Details:</strong> {student.contact_details}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No students found.</p>
                    )}
                </div>
            </div>

            {/* Credential Form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-black text-white">Issue Credential</div>
                <div className="card-body">
                    <form onSubmit={handleCredentialSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="studentWalletAddress">Student Wallet Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studentWalletAddress"
                                name="studentWalletAddress"
                                value={credentialData.studentWalletAddress}
                                onChange={handleCredentialChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="degree">Degree</label>
                            <input
                                type="text"
                                className="form-control"
                                id="degree"
                                name="degree"
                                value={credentialData.degree}
                                onChange={handleCredentialChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn bg-black text-white w-100">Issue Credential</button>
                    </form>
                </div>
            </div>

            {/* QR Code Display */}
            {qrValue && (
                <div className="card mt-4 shadow-sm">
                    <div className="card-header bg-success text-white">QR Code for Credential</div>
                    <div className="card-body text-center">
                        <QRCodeCanvas value={qrValue} size={256} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InstitutionDashboard;
