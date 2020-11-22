# from flask import request, g, jsonify
# from flask_inputs import Inputs
# from flask_inputs.validators import JsonSchema
#
# from . import admin
# from ..auth.models import User, Role
# from ..constants import Permissions
# from ..helpers import csrf_protect, login_required_ajax, app_error
#
#
# class RequestInput(Inputs):
#     json = [JsonSchema(schema={
#         'type': 'object',
#         'required': ['role_id'],
#         'properties': {
#             'role_id': {'type': 'string'}
#         }
#     })]
#
#
# @admin.route('/admin/get_role_data', methods=['POST'])
# @login_required_ajax
# @csrf_protect
# def admin_get_role_data():
#     inputs = RequestInput(request)
#     if not inputs.validate():
#         return app_error(inputs.errors.pop())
#
#     user: User = g.user
#     if not user.can(Permissions.manage_roles):
#         return app_error('Access denied')
#
#     role = Role.query.filter(Role.id == request.json['role_id']).first()
#
#     return jsonify({
#         'data': {
#             'role': {
#                 'id': role.id,
#                 'name': role.role_name,
#                 'description': role.role_description,
#                 'lab_id': role.lab_id,
#                 'permissions': role.get_permissions_array()
#             }
#         }
#     })
