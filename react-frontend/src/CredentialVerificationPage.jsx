import React, { useState } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';
import { QRCodeCanvas } from 'qrcode.react';
import logo from './assets/EDUCHAIN.png'; // Update the path according to where you've placed the logo

function CredentialVerificationPage() {
    const [nftId, setNftId] = useState('');
    const [owner, setOwner] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [qrValue, setQrValue] = useState('');
    const [qrScanned, setQrScanned] = useState(false);

    const handleVerify = async (id, ownerAddress) => {
        try {
            console.log('Verifying:', { nftId: id, owner: ownerAddress });
            const response = await axios.get(`http://127.0.0.1:5000/verify-ownership/${id}/${ownerAddress}`);
            setVerificationResult(response.data.isOwner);
        } catch (error) {
            console.error('Verification failed', error);
        }
    };

    const handleManualVerify = () => {
        handleVerify(nftId, owner);
    };

    const handleResult = (result, error) => {
        if (result?.text && !qrScanned) {
            console.log('Scanned QR Code Data:', result.text);
            const [scannedNftId, ownerAddress] = result.text.split(',');

            console.log('Parsed NFT ID:', scannedNftId);
            console.log('Parsed Owner Address:', ownerAddress);

            if (scannedNftId && ownerAddress) {
                setQrScanned(true);
                setNftId(scannedNftId);
                setOwner(ownerAddress);

                handleVerify(scannedNftId, ownerAddress);
            }
        }

        if (error) {
            console.error('Error scanning QR code', error);
        }
    };

    return (
        <div className="container mt-5 text-center">
            {/* Logo and Heading */}
            <div className="d-flex align-items-center justify-content-center mb-4">
                <img src={logo} alt="EduChain Logo" style={{ maxWidth: '100px', marginRight: '20px' }} />
                <h1 style={{ fontSize: '3rem' }}>Credential Verification</h1>
            </div>

            {/* Manual Verification Section */}
            <div className="card mt-4 shadow-sm">
                <div className="card-header bg-black text-white">Manual Verification</div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="nftId">NFT ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nftId"
                            value={nftId}
                            onChange={(e) => setNftId(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="owner">Owner Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="owner"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <button onClick={handleManualVerify} className="btn btn-dark btn-lg mt-4 text-white">Verify</button>

                    {verificationResult !== null && (
                        <div className="mt-3">
                            {verificationResult ? <p className="text-success">Verification successful!</p> : <p className="text-danger">Verification failed.</p>}
                        </div>
                    )}
                </div>
            </div>

            {/* QR Code Scanning Section */}
            <div className="card mt-4 shadow-sm">
                <div className="card-header bg-black text-white">Scan QR Code</div>
                <div className="card-body">
                    {!qrScanned && (
                        <QrReader
                            onResult={handleResult}
                            style={{ width: '100%' }}
                        />
                    )}

                    {qrValue && (
                        <div className="mt-5">
                            <h3>QR Code for Credential</h3>
                            <QRCodeCanvas value={qrValue} size={256} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CredentialVerificationPage;
