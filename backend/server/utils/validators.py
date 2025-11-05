"""
Validation utilities
"""

import re
from .errors import ValidationError


def validate_email(email):
    """Validate email format"""
    if not email:
        raise ValidationError('Email is required')

    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        raise ValidationError('Invalid email format')

    return True


def validate_password(password):
    """Validate password strength"""
    if not password:
        raise ValidationError('Password is required')

    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long')

    if not re.search(r'[A-Z]', password):
        raise ValidationError('Password must contain at least one uppercase letter')

    if not re.search(r'[a-z]', password):
        raise ValidationError('Password must contain at least one lowercase letter')

    if not re.search(r'[0-9]', password):
        raise ValidationError('Password must contain at least one number')

    return True


def validate_phone(phone):
    """Validate phone number format"""
    if not phone:
        return True  # Phone is optional

    # Remove common separators
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)

    # Check if it's a valid phone number (10-15 digits)
    if not re.match(r'^\+?[0-9]{10,15}$', cleaned):
        raise ValidationError('Invalid phone number format')

    return True


def validate_required_fields(data, required_fields):
    """Validate that all required fields are present"""
    missing_fields = []

    for field in required_fields:
        if field not in data or not data[field]:
            missing_fields.append(field)

    if missing_fields:
        raise ValidationError(
            f'Missing required fields: {", ".join(missing_fields)}'
        )

    return True


def validate_role(role):
    """Validate user role"""
    valid_roles = ['admin', 'reception', 'legal', 'psychology', 'paralegal']

    if not role:
        raise ValidationError('Role is required')

    if role not in valid_roles:
        raise ValidationError(
            f'Invalid role. Must be one of: {", ".join(valid_roles)}'
        )

    return True


def validate_case_status(status):
    """Validate case status"""
    valid_statuses = ['pending', 'in_progress', 'completed', 'closed']

    if not status:
        raise ValidationError('Status is required')

    if status not in valid_statuses:
        raise ValidationError(
            f'Invalid status. Must be one of: {", ".join(valid_statuses)}'
        )

    return True


def validate_priority(priority):
    """Validate case priority"""
    valid_priorities = ['low', 'medium', 'high', 'urgent']

    if priority and priority not in valid_priorities:
        raise ValidationError(
            f'Invalid priority. Must be one of: {", ".join(valid_priorities)}'
        )

    return True


def validate_file_upload(file):
    """Validate uploaded file"""
    if not file:
        raise ValidationError('No file provided')

    if file.filename == '':
        raise ValidationError('No file selected')

    # Check file size (max 16MB)
    file.seek(0, 2)  # Seek to end
    file_size = file.tell()
    file.seek(0)  # Reset to beginning

    max_size = 16 * 1024 * 1024  # 16MB
    if file_size > max_size:
        raise ValidationError('File size exceeds 16MB limit')

    # Check file extension
    allowed_extensions = {
        'pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'xls', 'xlsx'
    }
    file_ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else ''

    if file_ext not in allowed_extensions:
        raise ValidationError(
            f'Invalid file type. Allowed types: {", ".join(allowed_extensions)}'
        )

    return True
