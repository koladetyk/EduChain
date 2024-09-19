# models.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Credential(Base):
    __tablename__ = 'credentials'
    id = Column(Integer, primary_key=True)
    token_id = Column(Integer, unique=True)
    institution_name = Column(String)
    degree = Column(String)
    date_of_issue = Column(String)  # Only keep date_of_issue
    owner = Column(String)

    def __repr__(self):
        return f"<Credential(token_id={self.token_id}, institution_name='{self.institution_name}', degree='{self.degree}', date_of_issue='{self.date_of_issue}', owner='{self.owner}')>"

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    date_of_birth = Column(String)
    wallet_address = Column(String)
    contact_details = Column(String)

class Institution(Base):
    __tablename__ = 'institutions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    address = Column(String)
    contact_info = Column(String)
    accreditation_status = Column(String)
