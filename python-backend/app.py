from flask import Flask, request, jsonify
from web3 import Web3
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Credential, Student, Institution, Base  # Import Student and Institution
import json
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Connect to Ethereum
infura_url = os.getenv('INFURA_URL')
web3 = Web3(Web3.HTTPProvider(infura_url))

# Load contract ABI and address
contract_address = os.getenv('CONTRACT_ADDRESS')
with open('EduChainCredentialsABI.json', 'r') as abi_file:
    contract_abi = json.load(abi_file)

contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Connect to SQLite database
engine = create_engine('sqlite:///database.db')
Session = sessionmaker(bind=engine)
session = Session()

# Create all tables (including Student and Institution)
Base.metadata.create_all(engine)  # This ensures all tables are created

# Private key of the account interacting with the contract
private_key = os.getenv('PRIVATE_KEY')

@app.route('/issue-credential', methods=['POST'])
def issue_credential():
    data = request.json
    to = data['to']
    institution_name = data['institutionName']
    degree = data['degree']
    date_of_issue = data['dateOfIssue']

    # Mint the credential
    account = web3.eth.account.from_key(private_key)
    nonce = web3.eth.get_transaction_count(account.address)
    transaction = contract.functions.issueCredential(to, institution_name, degree, date_of_issue).build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 2000000,
        'gasPrice': web3.to_wei('20', 'gwei')  # Updated method name
    })

    signed_txn = web3.eth.account.sign_transaction(transaction, private_key)
    txn_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)  # Updated attribute name
    txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)

    # Extract tokenId from the transaction receipt
    token_id = int(txn_receipt['logs'][0]['topics'][3].hex(), 16)  # Adjust based on the actual event emitted

    # Store in database
    new_credential = Credential(token_id=token_id, institution_name=institution_name, degree=degree, date_of_issue=date_of_issue, owner=to)
    session.add(new_credential)
    session.commit()

    return jsonify(success=True, tokenId=token_id, transactionHash=txn_hash.hex())


@app.route('/verify-ownership/<int:token_id>/<string:owner>', methods=['GET'])
def verify_ownership(token_id, owner):
    try:
        is_owner = contract.functions.verifyOwnership(owner, token_id).call()
        return jsonify(success=True, isOwner=is_owner)
    except Exception as e:
        return jsonify(success=False, error=str(e)), 400

@app.route('/add-student', methods=['POST'])
def add_student():
    data = request.json
    new_student = Student(
        name=data['name'],
        date_of_birth=data['date_of_birth'],
        wallet_address=data['wallet_address'],
        contact_details=data['contact_details']
    )
    session.add(new_student)
    session.commit()
    return jsonify(success=True, message="Student added successfully.")

@app.route('/add-institution', methods=['POST'])
def add_institution():
    data = request.json
    new_institution = Institution(
        name=data['name'],
        address=data['address'],
        contact_info=data['contact_info'],
        accreditation_status=data['accreditation_status']
    )
    session.add(new_institution)
    session.commit()
    return jsonify(success=True, message="Institution added successfully.")

@app.route('/get-student-info/<string:wallet_address>', methods=['GET'])
def get_student_info(wallet_address):
    student = session.query(Student).filter_by(wallet_address=wallet_address).first()
    if student:
        return jsonify({
            'name': student.name,
            'date_of_birth': student.date_of_birth,
            'wallet_address': student.wallet_address,
            'contact_details': student.contact_details
        })
    else:
        return jsonify({'error': 'Student not found'}), 404

@app.route('/get-all-students', methods=['GET'])
def get_all_students():
    try:
        # Query the database for all students using the session
        students = session.query(Student).all()
        
        # Serialize the student data
        student_list = []
        for student in students:
            student_info = {
                'name': student.name,
                'date_of_birth': student.date_of_birth,
                'wallet_address': student.wallet_address,
                'contact_details': student.contact_details
            }
            student_list.append(student_info)
        
        return jsonify(student_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
