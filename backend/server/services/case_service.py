from models import Case, db

def create_case(data):
    new_case = Case(client_name=data['client_name'], description=data['description'], 
                    assigned_to=data['assigned_to'], status='pending')
    db.session.add(new_case)
    db.session.commit()
    return new_case

def update_case(case_id, data):
    case = Case.query.get(case_id)
    if case:
        case.status = data.get('status', case.status)
        db.session.commit()
        return case
    return None

def delete_case(case_id):
    case = Case.query.get(case_id)
    if case:
        db.session.delete(case)
        db.session.commit()
        return True
    return False
