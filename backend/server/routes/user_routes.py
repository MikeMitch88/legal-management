from flask import Blueprint, request, jsonify
from models import User,Client,db
from services.auth_service import admin_required

user_bp = Blueprint('user', __name__)

# Admin can add users (register new users)
@user_bp.route('/add', methods=['POST'])
# @admin_required  # Only an admin can access this route
def add_user():
    data = request.get_json()
    if not data or not 'email' in data or not 'password' in data or not 'role' in data:
        return jsonify({'message': 'All fields are required (email, password, role)'}), 400
    
    # Check if the username is unique
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409
    
    # Create a new user
    new_user = User(email=data['email'], role=data['role'])
    new_user.password = data['password']  # Password hashing will be handled in the model
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User successfully created!'}), 201

@user_bp.route('/<int:id>', methods=['PUT'])
@admin_required
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.username = data.get('email', user.email)
    user.role = data.get('role', user.role)
    if 'password' in data:
        user.password = data['password']
    db.session.commit()
    return jsonify({'message': 'User updated'}), 200

# Admin can delete user
@user_bp.route('/<int:id>', methods=['DELETE'])
# @admin_required
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


@user_bp.route('/all', methods=['GET'])
# @admin_required  # Only admin can access the list of users
def get_all_users():
    users = User.query.all()  # Fetch all users from the database
    user_list = [
        {'id': user.id, 'email': user.email, 'role': user.role}
        for user in users
    ]
    return jsonify(user_list), 200

@user_bp.route('/register_client', methods=['POST'])
def register_client():
    data = request.get_json()

    try:

        new_client = Client(

            name=data['name'],
            age=data['age'],
            education=data['education'],
            passport_id=data['passport_id'],
            residential_address=data['residentialAddress'],
            marital_status=data['maritalStatus'],
            postal_address=data['address'],
            postal_code=data['postalCode'],
            telephone_no=data['telephone_no'],
            country_of_origin=data['country']

       )
    
        db.session.add(new_client)
        db.session.commit()
    
        return jsonify({'message': 'Client registered successfully'}), 201
    
  
    except KeyError as e:

        return jsonify({'error': f'Missing key: {str(e)}'}), 400


@user_bp.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    clients_list = [{
        'id': client.id,
        'name': client.name,
        'age': client.age,
        'education': client.education,
        'passport_id': client.passport_id,
        'postal_address': client.postal_address,
        'postal_code': client.postal_code,
        'telephone_no': client.telephone_no,
        'residential_address': client.residential_address,
        'country_of_origin': client.country_of_origin
    } for client in clients]
    
    return jsonify(clients_list)
