from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from models import User

def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        access_token = create_access_token(identity={'email': user.email, 'role': user.role})
        return {'access_token': access_token, 'role': user.role}
    return None

def get_current_user():
    return get_jwt_identity()

def admin_required(fn):
    @jwt_required()
    def wrapper(*args, **kwargs):
        user = get_current_user()
        if user['role'] != 'admin':
            return {'message': 'Admin access required'}, 403
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper

def role_required(role):
    def decorator(fn):
        @jwt_required()
        def wrapper(*args, **kwargs):
            user = get_current_user()
            if user['role'] != role:
                return {'message': 'Access denied'}, 403
            return fn(*args, **kwargs)
        wrapper.__name__ = fn.__name__
        return wrapper
    return decorator
