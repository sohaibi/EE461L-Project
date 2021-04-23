import logging
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request, session, send_from_directory, send_file, Blueprint
from data_service import hardware, user, project, dataset
from passlib.hash import pbkdf2_sha256
from bson import ObjectId, json_util
import io
import os
import shutil
from . import project_module_helper


project_module = Blueprint("project_module", __name__)

@project_module.route("/project_module")
def second():
    return project_module_helper.test_this()

@project_module.route('/project', methods=['POST', 'GET'])
def projectAccess():
    if 'user' not in session:
        return jsonify({'message': 'cannot access project without login'})
    user_id = session['user']
    # POST: (update/create new project)
    if request.method == 'POST':
        data = request.get_json(force=True)
        if not data:
            return jsonify({'message': 'Null request'})
        # print(user_id)
        if data['action'] == 'delete':
            project_id = data['project_id']
            res = project_module_helper.delete_project(project_id, user_id)
            if res:
                return res

        if data['action'] == 'create':
            project_name = data['project_name']
            comment = data['comment']
            project_module_helper.create_project(project_name, user_id, comment)

        if data['action'] == 'update':
            project_id = data['project_id']
            project_name = data['project_name']
            comment = data['comment']
            project_module_helper.update_project(project_id, project_name, comment)

        if data['action'] == 'join':
            project_id = data['project_id']
            res = project_module_helper.join_project(project_id, user_id)
            if res:
                return res

    # Either POST OR GET: (display project list)
    project_dict = user.get_projects(user_id)
    project_list = []  # [] of {}
    for proj_id in project_dict:
        proj_info = project.handle_get_project_info(proj_id)
        if proj_info:  # if project can be found
            proj_info['_id'] = str(proj_info['_id'])  # make ObjectID jsonable
            project_list.append(proj_info)
    # print("proj list: ", project_list
    return jsonify({'message': 'success', 'records': tuple(project_list)})
    # return json.loads(json_util.dumps(project_list))
