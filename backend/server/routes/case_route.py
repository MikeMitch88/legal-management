from flask import Blueprint, request, jsonify
from services.case_service import create_case, update_case, delete_case
from services.auth_service import role_required

case_bp = Blueprint('case', __name__)

@case_bp.route('/create', methods=['POST'])
@role_required('reception')  # Only reception can create cases
def create_new_case():
    data = request.get_json()
    new_case = create_case(data)
    return jsonify({'message': 'Case created', 'case': new_case.id}), 201

@case_bp.route('/<int:case_id>', methods=['PUT'])
@role_required('legal')  # Only legal role can update cases
def edit_case(case_id):
    data = request.get_json()
    updated_case = update_case(case_id, data)
    if updated_case:
        return jsonify({'message': 'Case updated', 'case': updated_case.id}), 200
    return jsonify({'message': 'Case not found'}), 404

@case_bp.route('/<int:case_id>', methods=['DELETE'])
@role_required('admin')  # Only admin can delete cases
def remove_case(case_id):
    if delete_case(case_id):
        return jsonify({'message': 'Case deleted'}), 200
    return jsonify({'message': 'Case not found'}), 404
