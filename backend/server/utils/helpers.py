"""
Helper utility functions
"""

import os
import uuid
from datetime import datetime, date
from werkzeug.utils import secure_filename


def generate_case_number():
    """Generate unique case number"""
    now = datetime.now()
    random_suffix = str(uuid.uuid4())[:8].upper()
    return f"CASE-{now.year}-{now.month:02d}-{random_suffix}"


def generate_filename(original_filename):
    """Generate unique filename for uploads"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    random_suffix = str(uuid.uuid4())[:8]
    secure_name = secure_filename(original_filename)
    name, ext = os.path.splitext(secure_name)
    return f"{timestamp}_{random_suffix}{ext}"


def allowed_file(filename, allowed_extensions=None):
    """Check if file has allowed extension"""
    if allowed_extensions is None:
        allowed_extensions = {
            'pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'xls', 'xlsx'
        }

    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions


def format_file_size(size_bytes):
    """Format file size in human-readable format"""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.2f} KB"
    elif size_bytes < 1024 * 1024 * 1024:
        return f"{size_bytes / (1024 * 1024):.2f} MB"
    else:
        return f"{size_bytes / (1024 * 1024 * 1024):.2f} GB"


def parse_date(date_string):
    """Parse date string to date object"""
    if not date_string:
        return None

    if isinstance(date_string, date):
        return date_string

    try:
        return datetime.strptime(date_string, '%Y-%m-%d').date()
    except ValueError:
        try:
            return datetime.strptime(date_string, '%d/%m/%Y').date()
        except ValueError:
            return None


def serialize_date(date_obj):
    """Serialize date object to string"""
    if not date_obj:
        return None

    if isinstance(date_obj, datetime):
        return date_obj.date().isoformat()

    if isinstance(date_obj, date):
        return date_obj.isoformat()

    return str(date_obj)


def paginate_query(query, page=1, per_page=20):
    """Paginate SQLAlchemy query"""
    if page < 1:
        page = 1

    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return {
        'items': [item.to_dict() if hasattr(item, 'to_dict') else item for item in pagination.items],
        'total': pagination.total,
        'page': pagination.page,
        'per_page': pagination.per_page,
        'pages': pagination.pages,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev,
    }


def search_filter(query, model, search_term, search_fields):
    """Add search filter to query"""
    if not search_term:
        return query

    filters = []
    for field in search_fields:
        if hasattr(model, field):
            column = getattr(model, field)
            filters.append(column.ilike(f'%{search_term}%'))

    if filters:
        from sqlalchemy import or_
        query = query.filter(or_(*filters))

    return query


def create_response(data=None, message=None, status='success', status_code=200):
    """Create standardized API response"""
    response = {
        'status': status,
    }

    if message:
        response['message'] = message

    if data is not None:
        response['data'] = data

    return response, status_code


def create_error_response(message, status_code=400, errors=None):
    """Create standardized error response"""
    response = {
        'status': 'error',
        'message': message,
    }

    if errors:
        response['errors'] = errors

    return response, status_code
