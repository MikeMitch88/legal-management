from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    """User model with authentication and role management"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # admin, reception, legal, psychology, paralegal
    full_name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    cases = db.relationship('Case', backref='assigned_user', lazy=True, foreign_keys='Case.assigned_to_id')
    documents = db.relationship('Document', backref='uploaded_by_user', lazy=True)

    @property
    def password(self):
        raise AttributeError('Password is not readable!')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'full_name': self.full_name,
            'phone': self.phone,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class Client(db.Model):
    """Client model with personal information"""
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)
    education = db.Column(db.String(100))
    passport_id = db.Column(db.String(50), unique=True, nullable=False, index=True)
    postal_address = db.Column(db.String(200))
    postal_code = db.Column(db.String(20))
    telephone_no = db.Column(db.String(20))
    residential_address = db.Column(db.String(200))
    country_of_origin = db.Column(db.String(100))
    age = db.Column(db.Integer)
    marital_status = db.Column(db.String(100))
    email = db.Column(db.String(120))
    emergency_contact = db.Column(db.String(100))
    emergency_phone = db.Column(db.String(20))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    cases = db.relationship('Case', backref='client', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        """Convert client to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'education': self.education,
            'passport_id': self.passport_id,
            'postal_address': self.postal_address,
            'postal_code': self.postal_code,
            'telephone_no': self.telephone_no,
            'residential_address': self.residential_address,
            'country_of_origin': self.country_of_origin,
            'age': self.age,
            'marital_status': self.marital_status,
            'email': self.email,
            'emergency_contact': self.emergency_contact,
            'emergency_phone': self.emergency_phone,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class Case(db.Model):
    """Case model with relationships to client and assigned user"""
    __tablename__ = 'cases'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id', ondelete='CASCADE'), nullable=False, index=True)
    assigned_to_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
    case_number = db.Column(db.String(50), unique=True, index=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100))  # e.g., 'Immigration', 'Family Law', 'Criminal', etc.
    status = db.Column(db.String(50), nullable=False, default='pending')  # pending, in_progress, completed, closed
    priority = db.Column(db.String(20), default='medium')  # low, medium, high, urgent
    start_date = db.Column(db.Date)
    due_date = db.Column(db.Date)
    closed_date = db.Column(db.Date)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    documents = db.relationship('Document', backref='case', lazy=True, cascade='all, delete-orphan')
    activities = db.relationship('CaseActivity', backref='case', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        """Convert case to dictionary"""
        return {
            'id': self.id,
            'client_id': self.client_id,
            'client_name': self.client.name if self.client else None,
            'assigned_to_id': self.assigned_to_id,
            'assigned_to_name': self.assigned_user.full_name if self.assigned_user else None,
            'case_number': self.case_number,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'status': self.status,
            'priority': self.priority,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'closed_date': self.closed_date.isoformat() if self.closed_date else None,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class Document(db.Model):
    """Document model for file uploads related to cases"""
    __tablename__ = 'documents'

    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id', ondelete='CASCADE'), nullable=False, index=True)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    original_filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.Integer)  # in bytes
    file_type = db.Column(db.String(100))  # MIME type
    document_type = db.Column(db.String(100))  # e.g., 'passport', 'contract', 'evidence', etc.
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """Convert document to dictionary"""
        return {
            'id': self.id,
            'case_id': self.case_id,
            'uploaded_by': self.uploaded_by,
            'filename': self.filename,
            'original_filename': self.original_filename,
            'file_size': self.file_size,
            'file_type': self.file_type,
            'document_type': self.document_type,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class CaseActivity(db.Model):
    """Case activity log for tracking case history"""
    __tablename__ = 'case_activities'

    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id', ondelete='CASCADE'), nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    activity_type = db.Column(db.String(50), nullable=False)  # created, updated, status_changed, comment, etc.
    description = db.Column(db.Text, nullable=False)
    extra_data = db.Column(db.Text)  # JSON string for additional data
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='activities', lazy=True)

    def to_dict(self):
        """Convert activity to dictionary"""
        return {
            'id': self.id,
            'case_id': self.case_id,
            'user_id': self.user_id,
            'user_name': self.user.full_name if self.user else None,
            'activity_type': self.activity_type,
            'description': self.description,
            'extra_data': self.extra_data,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class DailyVisit(db.Model):
    """Daily visit tracking"""
    __tablename__ = 'daily_visits'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, unique=True, nullable=False, index=True)
    client_count = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """Convert daily visit to dictionary"""
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'client_count': self.client_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
