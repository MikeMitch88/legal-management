"""
Custom error classes for better error handling
"""


class APIError(Exception):
    """Base API error class"""

    def __init__(self, message, status_code=500, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['error'] = True
        return rv


class ValidationError(APIError):
    """Validation error"""

    def __init__(self, message, payload=None):
        super().__init__(message, status_code=400, payload=payload)


class NotFoundError(APIError):
    """Resource not found error"""

    def __init__(self, message, payload=None):
        super().__init__(message, status_code=404, payload=payload)


class AuthenticationError(APIError):
    """Authentication error"""

    def __init__(self, message='Authentication required', payload=None):
        super().__init__(message, status_code=401, payload=payload)


class AuthorizationError(APIError):
    """Authorization error"""

    def __init__(self, message='You do not have permission to perform this action', payload=None):
        super().__init__(message, status_code=403, payload=payload)


class ConflictError(APIError):
    """Conflict error (e.g., duplicate resource)"""

    def __init__(self, message, payload=None):
        super().__init__(message, status_code=409, payload=payload)


class ServerError(APIError):
    """Internal server error"""

    def __init__(self, message='Internal server error occurred', payload=None):
        super().__init__(message, status_code=500, payload=payload)
