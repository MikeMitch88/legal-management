"""
Decorators for routes
"""

from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from .errors import AuthorizationError, AuthenticationError


def role_required(*allowed_roles):
    """
    Decorator to check if user has required role
    Usage: @role_required('admin', 'legal')
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                current_user = get_jwt_identity()

                if not current_user:
                    raise AuthenticationError()

                user_role = current_user.get('role')

                if user_role not in allowed_roles:
                    raise AuthorizationError(
                        f'This action requires one of these roles: {", ".join(allowed_roles)}'
                    )

                return fn(*args, **kwargs)
            except AuthenticationError as e:
                return jsonify({'error': e.message}), e.status_code
            except AuthorizationError as e:
                return jsonify({'error': e.message}), e.status_code
            except Exception as e:
                return jsonify({'error': 'Authentication failed'}), 401

        return wrapper
    return decorator


def admin_required(fn):
    """Decorator to check if user is admin"""
    return role_required('admin')(fn)


def validate_json(required_fields=None):
    """
    Decorator to validate JSON request body
    Usage: @validate_json(['email', 'password'])
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Request must be JSON'}), 400

            data = request.get_json()

            if required_fields:
                missing = [field for field in required_fields if field not in data]
                if missing:
                    return jsonify({
                        'error': f'Missing required fields: {", ".join(missing)}'
                    }), 400

            return fn(*args, **kwargs)

        return wrapper
    return decorator


def handle_errors(fn):
    """
    Decorator to handle errors consistently across routes
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except Exception as e:
            # Import here to avoid circular imports
            from .errors import APIError

            if isinstance(e, APIError):
                return jsonify(e.to_dict()), e.status_code

            # Log unexpected errors
            import traceback
            traceback.print_exc()

            return jsonify({
                'error': 'An unexpected error occurred',
                'message': str(e)
            }), 500

    return wrapper
