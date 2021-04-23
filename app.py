import logging
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request, session, send_from_directory, send_file
from data_service import hardware, user, project, dataset
from passlib.hash import pbkdf2_sha256
from bson import ObjectId, json_util
import io
import os
import shutil


# import all the modules
from modules.hardware_module import hardware_module
from modules.user_module import user_module
from modules.project_module import project_module
from modules.dataset_module import dataset_module



def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app,supports_credentials=True)
    app.secret_key = "secret"
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config["DEBUG"] = False
    app.config["SESSION_COOKIE_HTTPONLY"] = False
    app.config["TESTING"] = False

    app.config['snippets'] = os.path.dirname(os.path.abspath(__file__))+'/snippets/'


    app.register_blueprint(hardware_module, url_prefix="")
    app.register_blueprint(user_module, url_prefix="")
    app.register_blueprint(project_module, url_prefix="")
    app.register_blueprint(dataset_module, url_prefix="")


    @app.after_request
    def creds(response):
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers',
                        "Origin, X-Requested-With, Content-Type, Accept, x-auth")
        # response.set_cookie("Yue's cookie", session)
        # response.headers['Access-Control-Allow-Origin']
        return response



    if(__name__ == "__main__"):
        app.run(debug=False)

    if __name__ != '__main__':
        gunicorn_logger = logging.getLogger('gunicorn.error')
        app.logger.handlers = gunicorn_logger.handlers
        app.logger.setLevel(gunicorn_logger.level)
 
    return app