import logging
import sys
from logging import DEBUG

from flask.logging import default_handler
from flask_migrate import Migrate
from flask_session import Session

import config
import os
from app.models import db
from .admin import admin as admin_blueprint


def create_app(Flask):
    environment = os.environ.get('FLASK_ENV')
    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setLevel(DEBUG)
    stream_handler.setFormatter(logging.Formatter(
        '[FLASK][%(levelname)s][%(asctime)s][%(module)s][%(message)s]'
    ))
    logger = logging.getLogger('root')
    logger.addHandler(stream_handler)
    oauth_logger = logging.getLogger('flask_oauthlib')
    oauth_logger.addHandler(stream_handler)

    app = Flask(__name__)
    app.logger.addHandler(stream_handler)
    app.logger.removeHandler(default_handler)

    app.register_blueprint(admin_blueprint)

    if environment == "development":
        app.config.from_object(config.LocalConfig())
    elif environment == "testing":
        app.config.from_object(config.TestConfig)
    else:
        app.config.from_object(config.BaseConfig())

    app.config['APP_FOLDER'] = os.path.dirname(os.path.realpath(__file__))

    db.init_app(app)
    Migrate(app, db)
    Session(app)

    from .static_routes import make_static_routes
    make_static_routes(app)

    return app
