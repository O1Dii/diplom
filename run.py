from flask import Flask
from app import create_app

application = create_app(Flask)

if __name__ == "__main__":
    application.run('0.0.0.0', debug=True, port=5000)

