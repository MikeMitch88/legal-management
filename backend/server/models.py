
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # Role field: admin, reception, psychology, etc.

    @property
    def password(self):
        raise AttributeError('Password is not readable!')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class Case(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    assigned_to = db.Column(db.String(50), nullable=False)  # Role handling this case
    status = db.Column(db.String(20), nullable=False)       # E.g., 'pending', 'in progress', 'resolved'


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    education = db.Column(db.String(100), nullable=False)
    passport_id = db.Column(db.String(50), unique=True, nullable=False)
    postal_address = db.Column(db.String(200))
    postal_code = db.Column(db.String(20))
    telephone_no = db.Column(db.String(20))
    residential_address = db.Column(db.String(200))
    country_of_origin = db.Column(db.String(100))
    age = db.Column(db.Integer) 
    marital_status = db.Column(db.String(100))

class DailyVisit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, unique=True, nullable=False)
    client_count = db.Column(db.Integer, default=1)
