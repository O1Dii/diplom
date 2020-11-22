def make_static_routes(app):

    @app.route('/admin/users', defaults={'action': None, 'user_id': None})
    @app.route('/admin/users/<action>', defaults={'user_id': None})
    @app.route('/admin/users/<user_id>/<action>')
    def admin_users(user_id, action):
        return app.send_static_file('dist/index.html')

    @app.route('/admin/apps', defaults={'action': None, 'app_id': None})
    @app.route('/admin/apps/<action>', defaults={'app_id': None})
    @app.route('/admin/apps/<app_id>/<action>')
    def admin_apps(app_id, action):
        return app.send_static_file('dist/index.html')

    @app.route('/admin/labs', defaults={'action': None, 'lab_id': None})
    @app.route('/admin/labs/<action>', defaults={'lab_id': None})
    @app.route('/admin/labs/<lab_id>/<action>')
    def admin_labs(lab_id, action):
        return app.send_static_file('dist/index.html')

    @app.route('/admin/roles', defaults={'action': None, 'lab_id': None})
    @app.route('/admin/roles/<action>', defaults={'lab_id': None})
    @app.route('/admin/roles/<lab_id>/<action>')
    def admin_roles(lab_id, action):
        return app.send_static_file('dist/index.html')

