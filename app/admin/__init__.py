from flask import Blueprint

admin = Blueprint(
    'admin',
    __name__,
    static_folder='../static',
    template_folder='../templates')

# from .get_user_data import admin_get_user_data
