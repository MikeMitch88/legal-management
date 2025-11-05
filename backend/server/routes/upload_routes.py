"""
File upload routes
"""

import os
from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from ..models import db, Document, Case
from ..utils import (
    validate_file_upload,
    generate_filename,
    allowed_file,
    NotFoundError,
    ValidationError,
    handle_errors,
    create_response,
    create_error_response
)

upload_bp = Blueprint('upload', __name__)

# Upload directory
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    'uploads'
)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@upload_bp.route('/upload', methods=['POST'])
@jwt_required()
@handle_errors
def upload_file():
    """
    Upload a file for a case
    Required: file, case_id
    Optional: document_type, description
    """
    current_user = get_jwt_identity()

    # Check if file is in request
    if 'file' not in request.files:
        raise ValidationError('No file part in request')

    file = request.files['file']
    validate_file_upload(file)

    # Get form data
    case_id = request.form.get('case_id')
    document_type = request.form.get('document_type', 'general')
    description = request.form.get('description', '')

    if not case_id:
        raise ValidationError('case_id is required')

    # Check if case exists
    case = Case.query.get(case_id)
    if not case:
        raise NotFoundError(f'Case with ID {case_id} not found')

    # Generate unique filename
    original_filename = secure_filename(file.filename)
    unique_filename = generate_filename(original_filename)

    # Save file
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(file_path)

    # Get file info
    file_size = os.path.getsize(file_path)
    file_type = file.content_type

    # Create document record
    document = Document(
        case_id=case_id,
        uploaded_by=current_user.get('id'),
        filename=unique_filename,
        original_filename=original_filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file_type,
        document_type=document_type,
        description=description
    )

    db.session.add(document)
    db.session.commit()

    return create_response(
        data=document.to_dict(),
        message='File uploaded successfully',
        status_code=201
    )


@upload_bp.route('/documents/<int:document_id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_document(document_id):
    """Get document details"""
    document = Document.query.get(document_id)

    if not document:
        raise NotFoundError(f'Document with ID {document_id} not found')

    return create_response(data=document.to_dict())


@upload_bp.route('/documents/<int:document_id>/download', methods=['GET'])
@jwt_required()
@handle_errors
def download_document(document_id):
    """Download a document"""
    document = Document.query.get(document_id)

    if not document:
        raise NotFoundError(f'Document with ID {document_id} not found')

    directory = os.path.dirname(document.file_path)
    filename = os.path.basename(document.file_path)

    return send_from_directory(
        directory,
        filename,
        as_attachment=True,
        download_name=document.original_filename
    )


@upload_bp.route('/documents/<int:document_id>', methods=['DELETE'])
@jwt_required()
@handle_errors
def delete_document(document_id):
    """Delete a document"""
    current_user = get_jwt_identity()
    document = Document.query.get(document_id)

    if not document:
        raise NotFoundError(f'Document with ID {document_id} not found')

    # Delete file from filesystem
    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    # Delete from database
    db.session.delete(document)
    db.session.commit()

    return create_response(message='Document deleted successfully')


@upload_bp.route('/cases/<int:case_id>/documents', methods=['GET'])
@jwt_required()
@handle_errors
def get_case_documents(case_id):
    """Get all documents for a case"""
    case = Case.query.get(case_id)

    if not case:
        raise NotFoundError(f'Case with ID {case_id} not found')

    documents = Document.query.filter_by(case_id=case_id).all()

    return create_response(
        data=[doc.to_dict() for doc in documents]
    )
