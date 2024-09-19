import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import logo from './assets/EDUCHAIN.png'; 

function StudentDashboard() {
    const [studentData, setStudentData] = useState({
        name: '',
        date_of_birth: '',
        wallet_address: '',
        contact_details: '',
    });

    const [fetchedStudentInfo, setFetchedStudentInfo] = useState(null);
    const [fetchWalletAddress, setFetchWalletAddress] = useState('');
    const [qrValue, setQrValue] = useState('');

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/add-student', studentData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert('Student added successfully!');
        } catch (error) {
            console.error('Error adding student!', error);
        }
    };

    const handleFetchStudentInfo = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/get-student-info/${fetchWalletAddress}`);
            setFetchedStudentInfo(response.data);
        } catch (error) {
            console.error('Error fetching student info!', error);
            setFetchedStudentInfo(null);
        }
    };

    const handleGenerateQrCode = () => {
        if (fetchedStudentInfo) {
            setQrValue(`http://localhost:3000/verify-student/${fetchedStudentInfo.wallet_address}`);
        }
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '8px' }}>
            {/* Header with Logo and Title */}
            <div className="d-flex align-items-center justify-content-center mb-4">
                <img src={logo} alt="EduChain Logo" style={{ width: '100px', marginRight: '10px' }} />
                <h1 className="text-white">Student Dashboard</h1>
            </div>
            <div className="card mb-4" style={{ backgroundColor: '#fff', color: '#333' }}>
                <div className="card-header bg-black text-white">Add Student</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Student Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={studentData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="date_of_birth">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={studentData.date_of_birth}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="wallet_address">Wallet Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="wallet_address"
                                name="wallet_address"
                                value={studentData.wallet_address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="contact_details">Contact Details (Email)</label>
                            <input
                                type="email"
                                className="form-control"
                                id="contact_details"
                                name="contact_details"
                                value={studentData.contact_details}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn bg-black text-white w-100">Add Student</button>
                    </form>
                </div>
            </div>

            <div className="card mb-4" style={{ backgroundColor: '#fff', color: '#333' }}>
                <div className="card-header bg-black text-white">Fetch Student Information</div>
                <div className="card-body">
                    <div className="form-group mb-3">
                        <label htmlFor="fetchWalletAddress">Enter Wallet Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fetchWalletAddress"
                            name="fetchWalletAddress"
                            value={fetchWalletAddress}
                            onChange={(e) => setFetchWalletAddress(e.target.value)}
                        />
                        <button className="btn bg-black text-white w-100 mt-3" onClick={handleFetchStudentInfo}>
                            Fetch Student Info
                        </button>
                    </div>

                    {fetchedStudentInfo && (
                        <div className="mt-4">
                            <h5>Fetched Student Information</h5>
                            <p>Name: {fetchedStudentInfo.name}</p>
                            <p>Date of Birth: {fetchedStudentInfo.date_of_birth}</p>
                            <p>Wallet Address: {fetchedStudentInfo.wallet_address}</p>
                            <p>Contact Details: {fetchedStudentInfo.contact_details}</p>
                            <button className="btn btn-secondary mt-3" onClick={handleGenerateQrCode}>
                                Generate QR Code
                            </button>
                        </div>
                    )}

                    {qrValue && (
                        <div className="mt-4">
                            <h5>QR Code</h5>
                            <QRCodeCanvas value={qrValue} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
