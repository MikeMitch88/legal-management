"""
Logging configuration for the application
"""

import logging
import os
from logging.handlers import RotatingFileHandler
from datetime import datetime


def setup_logger(app):
    """
    Setup application logger with file and console handlers
    """
    # Create logs directory if it doesn't exist
    logs_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
    os.makedirs(logs_dir, exist_ok=True)

    # Set log level from config or default to INFO
    log_level = os.getenv('LOG_LEVEL', 'INFO')
    app.logger.setLevel(getattr(logging, log_level))

    # Remove existing handlers
    app.logger.handlers.clear()

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_format = logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
    )
    console_handler.setFormatter(console_format)

    # File handler with rotation
    log_file = os.path.join(logs_dir, 'app.log')
    file_handler = RotatingFileHandler(
        log_file,
        maxBytes=10485760,  # 10MB
        backupCount=10
    )
    file_handler.setLevel(logging.INFO)
    file_format = logging.Formatter(
        '[%(asctime)s] %(levelname)s [%(pathname)s:%(lineno)d] - %(message)s'
    )
    file_handler.setFormatter(file_format)

    # Add handlers to app logger
    app.logger.addHandler(console_handler)
    app.logger.addHandler(file_handler)

    # Log startup
    app.logger.info('='*50)
    app.logger.info(f'Application started at {datetime.now()}')
    app.logger.info('='*50)

    return app.logger


def log_request(app, request):
    """Log incoming request"""
    app.logger.info(
        f'{request.method} {request.path} - IP: {request.remote_addr}'
    )


def log_response(app, response):
    """Log outgoing response"""
    app.logger.info(
        f'Response Status: {response.status_code}'
    )


def log_error(app, error, exc_info=False):
    """Log error with traceback"""
    app.logger.error(
        f'Error: {str(error)}',
        exc_info=exc_info
    )
