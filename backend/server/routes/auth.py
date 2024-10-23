from flask import Blueprint, request, jsonify
from services.auth_service import authenticate_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    token_data = authenticate_user(email, password)
    if token_data:
        return jsonify(token_data), 200
    return jsonify({'message': 'Invalid credentials'}), 401
