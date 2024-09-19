# EduChain

## Overview

EduChain is a decentralized platform that leverages blockchain technology to issue and verify academic credentials securely and efficiently. It provides a seamless interface for educational institutions to issue certificates and for students to showcase and verify their achievements. By utilizing the blockchain, EduChain ensures that credentials are tamper-proof, easily accessible, and verifiable globally.

## Importance of EduChain

### 1. Security and Authenticity

- **Tamper-Proof Credentials**: By storing credentials on the blockchain, EduChain ensures that they cannot be altered or forged, providing a secure way to verify the authenticity of academic achievements.
- **Transparent Verification**: Institutions and employers can easily verify the credentials without the need for intermediaries, reducing the risk of fraud.

### 2. Accessibility and Portability

- **Global Verification**: Credentials stored on the blockchain can be verified from anywhere in the world, making it easier for students to prove their qualifications across borders.
- **Lifetime Ownership**: Students have lifetime ownership of their credentials, which they can access and share anytime.

### 3. Efficiency and Cost Reduction

- **Streamlined Issuance**: Institutions can issue credentials directly on the platform, reducing paperwork and administrative overhead.
- **Reduced Verification Time**: The verification process is instant, eliminating the need for manual checks and saving time for both institutions and employers.

## Features

- **Institution Dashboard**: Institutions can register and issue credentials to students.
- **Student Portal**: Students can view and verify their credentials.
- **Credential Verification**: Allows anyone to verify the authenticity of credentials using NFT IDs or QR codes.
- **QR Code Generation**: Institutions can generate QR codes for issued credentials for easy verification.

## Technologies Used

- **Blockchain**: Ethereum-based smart contracts for secure credential issuance and verification.
- **React**: Frontend library for building user interfaces.
- **Flask**: Backend framework for handling API requests and database operations.
- **SQLite**: Database for storing student and institution data.
- **Web3.js**: JavaScript library for interacting with the Ethereum blockchain.

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- Python (v3.7+)
- MetaMask (browser extension for interacting with Ethereum)
- Infura (or another Ethereum provider)
- SQLite (for database)

### Installation

#### Clone the Repository

```bash
git clone https://github.com/your-repository/educhain.git
cd educhain

# Backend Setup:
cd python-backend
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

# Create a .env file in the backend directory and add the following:
INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
CONTRACT_ADDRESS=YourContractAddress
PRIVATE_KEY=YourEthereumPrivateKey

# Run the Flask server:
flask run

# Frontend Setup on different tab
cd frontend
npm install
npm start


# Create a .env file in the backend directory and add the following:
INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
CONTRACT_ADDRESS=YourContractAddress
PRIVATE_KEY=YourEthereumPrivateKey

# Run the Flask server:
flask run

```bash



