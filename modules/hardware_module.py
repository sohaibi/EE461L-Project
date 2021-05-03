import logging
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request, session, send_from_directory, send_file, Blueprint
from data_service import hardware, user, project, dataset
from bson import ObjectId, json_util



hardware_module = Blueprint("hardware_module", __name__)

@hardware_module.route("/hardware_module")
def second():
    return "hardware_module"

@hardware_module.route('/check',  methods=['POST', 'GET'])
def check():
    # GET
    if request.method == 'GET':  # send list of user's projects to React side
        if "user" in session:
            user_id = session['user']
            # print(user_id)
        
            project_ids = user.get_projects(
                user_id)   # list of project id strings
            # print(project_ids)
            projects = []
            for projID in project_ids:
                proj_info = project.handle_get_project_info(projID)
                name = proj_info['project_name']
                hardware_dict = proj_info['hardware_set_dict']
                HW_info = []
            
                for HW_id in hardware_dict.keys():
                    temp_dict = {}
                    temp_dict = {'HW_use': hardware_dict[HW_id]}
                    each_name = hardware.get_HWSet_name(HW_id)
                    temp_dict['HW_name'] = each_name
                    temp_dict['HW_id'] = HW_id
                    HW_info.append(temp_dict)
                # credits = 80  # TODO: calculate credit
            
                proj = {
                    "name": name,
                    "id": projID,
                    "hardware": HW_info,
                    # "credits": credits
                }
                # print(proj)
                projects.append(proj)
            
            return jsonify( {"message": "success", "projects": tuple(projects)})
        else:
            return jsonify({'message': "not login"})
    # POST
    data = request.get_json(force=True)
    if not data:
        return jsonify({'message': 'Null request'})
    # get the project id and the HWSet to be updated
    project_id = data['project_id']
    update_dict = data['update']
    # print(project_id)
    log = {}
    for each in update_dict.items():
        print(each[0], each[1])
        code = hardware.set_HWSet_availability(each[0], each[1])
        if code == -1:
            log[each[0]] = "This hardware set id does not exist! Please try again."
        elif code == -2:
            log[each[0]] = "Check out hardware set " + hardware.get_HWSet_name(
                each[0]) + " result in negative availability! Please try again."
        # update in project object, note that sign should be flipped
        else:
            project.handle_update_hardware(project_id, each[0], -each[1])

    if len(log) == 0:
        return jsonify({'message': 'success'})
    else:
        return jsonify({'message': 'The hardware listed in the log are not successfully checked in/out.',
                        'log': log})


@hardware_module.route('/hardware')
def send_hardware_info():
    data_list = hardware.get_HWSet_collection_info()
    # return jsonify({'result': hardware.get_hardware_availability("test1")})
    data_dict = {}
    HW_name = []
    HW_ava = []
    HW_cap = []
    HW_id = []
    for index in range(len(data_list)):
        HW_name.append(data_list[index]['HWSet_name'])
        HW_ava.append(data_list[index]['availability'])
        HW_cap.append(data_list[index]['capacity'])
        HW_id.append(str(data_list[index]['_id']))
    data_dict['HW_name'] = HW_name
    data_dict['HW_ava'] = HW_ava
    data_dict['HW_cap'] = HW_cap
    data_dict['HW_id'] = HW_id
    return jsonify(data_dict)