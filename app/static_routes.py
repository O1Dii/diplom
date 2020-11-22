from flask import send_from_directory

def make_static_routes(app):
    @app.route('/')
    def static_route():
        return app.send_static_file('dist/index.html')

    @app.route('/service-worker.js')
    def get_service_worker():
        return app.send_static_file('service-worker.js')

    @app.route('/sounds/<path:path>')
    def send_sound(path):
        return app.send_static_file(f'sounds/{path}')

    from .admin.static_routes import make_static_routes as adm_msr

    adm_msr(app)
