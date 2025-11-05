"""
Utilities package
"""

from .errors import (
    APIError,
    ValidationError,
    NotFoundError,
    AuthenticationError,
    AuthorizationError,
    ConflictError,
    ServerError
)

from .validators import (
    validate_email,
    validate_password,
    validate_phone,
    validate_required_fields,
    validate_role,
    validate_case_status,
    validate_priority,
    validate_file_upload
)

from .decorators import (
    role_required,
    admin_required,
    validate_json,
    handle_errors
)

from .helpers import (
    generate_case_number,
    generate_filename,
    allowed_file,
    format_file_size,
    parse_date,
    serialize_date,
    paginate_query,
    search_filter,
    create_response,
    create_error_response
)

__all__ = [
    # Errors
    'APIError',
    'ValidationError',
    'NotFoundError',
    'AuthenticationError',
    'AuthorizationError',
    'ConflictError',
    'ServerError',
    # Validators
    'validate_email',
    'validate_password',
    'validate_phone',
    'validate_required_fields',
    'validate_role',
    'validate_case_status',
    'validate_priority',
    'validate_file_upload',
    # Decorators
    'role_required',
    'admin_required',
    'validate_json',
    'handle_errors',
    # Helpers
    'generate_case_number',
    'generate_filename',
    'allowed_file',
    'format_file_size',
    'parse_date',
    'serialize_date',
    'paginate_query',
    'search_filter',
    'create_response',
    'create_error_response',
]
