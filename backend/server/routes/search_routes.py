"""
Search and statistics routes
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import func, or_, and_
from datetime import datetime, timedelta
from ..models import db, Case, Client, User, CaseActivity
from ..utils import (
    handle_errors,
    create_response,
    paginate_query,
    search_filter
)

search_bp = Blueprint('search', __name__)


@search_bp.route('/search', methods=['GET'])
@jwt_required()
@handle_errors
def global_search():
    """
    Global search across cases and clients
    Query params: q (search term), type (cases/clients/all), page, per_page
    """
    search_term = request.args.get('q', '').strip()
    search_type = request.args.get('type', 'all')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))

    results = {'cases': [], 'clients': []}

    if search_term:
        # Search cases
        if search_type in ['all', 'cases']:
            case_query = Case.query.join(Client)
            case_query = search_filter(
                case_query,
                Case,
                search_term,
                ['title', 'description', 'case_number', 'category']
            )
            case_query = case_query.union(
                Case.query.join(Client).filter(
                    Client.name.ilike(f'%{search_term}%')
                )
            )
            cases = case_query.limit(per_page).all()
            results['cases'] = [case.to_dict() for case in cases]

        # Search clients
        if search_type in ['all', 'clients']:
            client_query = search_filter(
                Client.query,
                Client,
                search_term,
                ['name', 'email', 'passport_id', 'telephone_no', 'country_of_origin']
            )
            clients = client_query.limit(per_page).all()
            results['clients'] = [client.to_dict() for client in clients]

    return create_response(data=results)


@search_bp.route('/statistics', methods=['GET'])
@jwt_required()
@handle_errors
def get_statistics():
    """
    Get dashboard statistics
    """
    # Total counts
    total_cases = Case.query.count()
    total_clients = Client.query.count()
    total_users = User.query.count()

    # Case statistics by status
    cases_by_status = db.session.query(
        Case.status,
        func.count(Case.id)
    ).group_by(Case.status).all()

    status_counts = {status: count for status, count in cases_by_status}

    # Case statistics by priority
    cases_by_priority = db.session.query(
        Case.priority,
        func.count(Case.id)
    ).group_by(Case.priority).all()

    priority_counts = {priority: count for priority, count in cases_by_priority}

    # Recent cases (last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_cases = Case.query.filter(
        Case.created_at >= thirty_days_ago
    ).count()

    # Cases by category
    cases_by_category = db.session.query(
        Case.category,
        func.count(Case.id)
    ).group_by(Case.category).all()

    category_counts = {
        category or 'Uncategorized': count
        for category, count in cases_by_category
    }

    # Overdue cases (due_date < today and status != completed/closed)
    today = datetime.utcnow().date()
    overdue_cases = Case.query.filter(
        and_(
            Case.due_date < today,
            Case.status.notin_(['completed', 'closed'])
        )
    ).count()

    # Cases assigned by user
    cases_by_user = db.session.query(
        User.full_name,
        User.email,
        func.count(Case.id)
    ).join(Case, User.id == Case.assigned_to_id).group_by(
        User.id, User.full_name, User.email
    ).all()

    user_workload = [
        {
            'name': name or email,
            'email': email,
            'case_count': count
        }
        for name, email, count in cases_by_user
    ]

    # Recent activity
    recent_activities = CaseActivity.query.order_by(
        CaseActivity.created_at.desc()
    ).limit(10).all()

    statistics = {
        'totals': {
            'cases': total_cases,
            'clients': total_clients,
            'users': total_users,
            'recent_cases': recent_cases,
            'overdue_cases': overdue_cases,
        },
        'cases_by_status': status_counts,
        'cases_by_priority': priority_counts,
        'cases_by_category': category_counts,
        'user_workload': user_workload,
        'recent_activities': [activity.to_dict() for activity in recent_activities],
    }

    return create_response(data=statistics)


@search_bp.route('/statistics/trends', methods=['GET'])
@jwt_required()
@handle_errors
def get_trends():
    """
    Get trend data for charts
    Query params: period (week/month/year)
    """
    period = request.args.get('period', 'month')

    # Calculate date range
    now = datetime.utcnow()
    if period == 'week':
        start_date = now - timedelta(days=7)
        date_format = '%Y-%m-%d'
    elif period == 'year':
        start_date = now - timedelta(days=365)
        date_format = '%Y-%m'
    else:  # month
        start_date = now - timedelta(days=30)
        date_format = '%Y-%m-%d'

    # Cases created over time
    cases_trend = db.session.query(
        func.date_trunc('day', Case.created_at).label('date'),
        func.count(Case.id).label('count')
    ).filter(
        Case.created_at >= start_date
    ).group_by('date').order_by('date').all()

    # Clients registered over time
    clients_trend = db.session.query(
        func.date_trunc('day', Client.created_at).label('date'),
        func.count(Client.id).label('count')
    ).filter(
        Client.created_at >= start_date
    ).group_by('date').order_by('date').all()

    trends = {
        'cases': [
            {
                'date': date.isoformat() if date else None,
                'count': count
            }
            for date, count in cases_trend
        ],
        'clients': [
            {
                'date': date.isoformat() if date else None,
                'count': count
            }
            for date, count in clients_trend
        ],
    }

    return create_response(data=trends)


@search_bp.route('/cases/filter', methods=['POST'])
@jwt_required()
@handle_errors
def filter_cases():
    """
    Advanced case filtering
    Body: status, priority, category, assigned_to_id, date_range, etc.
    """
    data = request.get_json()

    query = Case.query

    # Filter by status
    if 'status' in data and data['status']:
        query = query.filter(Case.status == data['status'])

    # Filter by priority
    if 'priority' in data and data['priority']:
        query = query.filter(Case.priority == data['priority'])

    # Filter by category
    if 'category' in data and data['category']:
        query = query.filter(Case.category == data['category'])

    # Filter by assigned user
    if 'assigned_to_id' in data and data['assigned_to_id']:
        query = query.filter(Case.assigned_to_id == data['assigned_to_id'])

    # Filter by date range
    if 'start_date' in data and data['start_date']:
        query = query.filter(Case.created_at >= data['start_date'])

    if 'end_date' in data and data['end_date']:
        query = query.filter(Case.created_at <= data['end_date'])

    # Pagination
    page = int(data.get('page', 1))
    per_page = int(data.get('per_page', 20))

    result = paginate_query(query, page, per_page)

    return create_response(data=result)
