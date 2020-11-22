# from flask import g, jsonify
#
# from . import admin
# from ..constants import Permissions
# from ..helpers import login_required_ajax, csrf_protect, ajax_user_error
# from ..models import db
# from ..auth.models import User, Lab
# from ..api.models import Client
#
#
# @admin.route('/admin/get_apps_list', methods=['POST'])
# @login_required_ajax
# @csrf_protect
# def admin_get_apps_list():
#     try:
#         user: User = g.user
#         assert user.can(Permissions.manage_apps), 'Access Denied'
#
#         oauth_client_query = db.session.query(
#             Client.name,
#             Client.description,
#             Client.user_id,
#             Client.client_id,
#             Client.client_secret,
#             Client._redirect_uris,
#             Client._default_scopes,
#             Lab.id,
#             Lab.name
#         ).select_from(db.join(Client, Lab))
#
#         if not user.is_super_user():
#             oauth_client_query = oauth_client_query.filter(Client.lab_id == user.lab_id)
#
#         results = db.session.execute(oauth_client_query)
#
#         return jsonify({
#             'data': {
#                 'clients': [{
#                     'name': x[0],
#                     'description': x[1],
#                     'user_id': x[2],
#                     'client_id': x[3],
#                     'client_secret': x[4],
#                     '_redirect_uris': x[5],
#                     'selected_scopes': x[6].split(",") if x[6] is not None else [],
#                     'lab__id': x[7],
#                     'lab__name': x[8]
#                 } for x in results]
#             }
#         })
#
#     except AssertionError as e:
#         return ajax_user_error(e)
