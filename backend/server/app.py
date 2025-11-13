from flask import Flask
from models import db  # Import db from models.py
from flask_migrate import Migrate  # Import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from flask_cors import CORS

migrate = Migrate()  # Initialize Migrate

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)  # Bind db to app
    migrate.init_app(app, db)  # Bind Migrate to app and db
    jwt = JWTManager(app)

    # Import and register blueprints
    from routes.auth import auth_bp
    from routes.user_routes import user_bp
    from routes.case_route import case_bp
    from routes.upload_routes import upload_bp
    from routes.search_routes import search_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(case_bp, url_prefix='/api/cases')
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(search_bp, url_prefix='/api')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
