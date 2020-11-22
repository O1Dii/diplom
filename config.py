import os, redis
from datetime import timedelta


class BaseConfig(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_PERMANENT = False
    SESSION_COOKIE_NAME = os.environ.get('SESSION_COOKIE_NAME')
    SESSION_COOKIE_SAMESITE = 'Strict'
    SESSION_COOKIE_HTTPONLY = True
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1)
    JSONIFY_MIMETYPE = 'application/vnd.api+json'

    def __init__(self):
        self.SESSION_REDIS = redis.from_url(os.environ.get('SESSION_REDIS'))


class LocalConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_ECHO = False


class TestConfig(LocalConfig):
    SQLALCHEMY_ECHO = False
    SESSION_TYPE = None
    SESSION_PERMANENT = False
    TESTING = True
    SESSION_REDIS = None

