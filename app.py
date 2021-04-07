import logging
from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from data_service import hardware, user, project
from passlib.hash import pbkdf2_sha256
from bson import ObjectId
from bson import json_util


app = Flask(__name__)
CORS(app)
app.secret_key = "secret"
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True



@app.after_request
def creds(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    # response.headers.add('Access-Control-Allow-Credentials')
    # response.headers.add('Access-Control-Allow-Headers',
    #                     "Origin, X-Requested-With, Content-Type, Accept, x-auth")
    return response

# @app.after_request
# def creds(response):
# response.headers.add('Access-Control-Allow-Headers',
#                      "Origin, X-Requested-With, Content-Type, Accept, x-auth")
#     return response



# @app.route('/')
# # @cross_origin()
# # def index():
# #     return app.send_static_file('index.html')

@app.route('/check',  methods=['POST', 'GET'])
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
                credits = 80  # TODO: calculate credit
                proj = {
                    "name": name,
                    "id": projID,
                    "hardware": HW_info,
                    "credits": credits
                }
                # print(proj)
                projects.append(proj)

            return jsonify(
                {"message": "success", "projects": projects}
                # {"message": "success"}

            )
        else:
            return jsonify({'message': 'not login'})
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
                        'log': {"1": "hi", "2": "ok"}})


@app.route('/hardware')
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


@app.route('/login', methods=['POST', 'GET'])
def login():
    # GET
    app.logger.debug('this is a DEBUG message')
    app.logger.info('this is an INFO message')
    app.logger.warning('this is a WARNING message')
    app.logger.error('this is an ERROR message')
    app.logger.critical('this is a CRITICAL message')
    if request.method == 'GET':
        if "user" in session:
            return jsonify({
                'ans': 'Y',
                'userID': session['user']
            })
        return jsonify(
            {
                'ans': 'N',
            }
        )

    # POST
    data = request.get_json(force=True)
    # print(data)
    app.logger.debug("data received as:")
    app.logger.debug(request)
    app.logger.debug(data)
    if not data:
        return jsonify({'message': 'Null request????'})
    if data:
        username = data['username']
        password = data['password']
        # compare user data in MongoDB
        client = user.get_user(username)
        # print(client)
        if client == -1:
            return jsonify({'message': 'Username does not exist'})

        if not pbkdf2_sha256.verify(password, client['password']):
            return jsonify({'message': 'Username and password does not match'})

        # # success login, send userID back

        session['user'] = str(client['_id'])  # make jsonID serializable
        # print(client)
        if "user" in session:
            response = jsonify(
                {'message': 'success', 'userID': session['user']})

            return response
        return jsonify({'message': 'something wrong'})


@app.route('/register', methods=['POST', 'GET'])
def register():
    # GET:
    if request.method == 'GET':
        return jsonify({"message": "This will not happen"})
    # POST:
    data = request.get_json(force=True)
    if not data:
        return jsonify({'message': 'Null request'})
    # data is valid:
    username = data['username']
    en_password = pbkdf2_sha256.encrypt(data['password'])
    email = data['email']
    res = user.create_user(username, en_password, email)
    if res[0] == -1:
        return jsonify({'message': 'Username already exists'})
    if res[1] == -1:
        return jsonify({'message': 'Email address already exists'})
    # success register, send userID back
    client = user.get_user(username)
    session['user'] = str(client['_id'])
    response = jsonify({
        'message': 'success',
        'userID': session['user']
    })
    return response


@app.route('/logout', methods=['POST', 'GET'])
def logout():
    if request.method == 'POST':
        if "user" in session:
            session.clear()
            return jsonify({'message': 'logout successfully'})
        else:
            return jsonify({'message': 'not logged in'})
    return jsonify({'message': 'get request will not be handled'})


@app.route('/userProfile', methods=['POST', 'GET'])
def userProfile():
    # GET:
    if request.method == 'GET':
        if 'user' in session:
            user_id = session['user']
            client = user.get_user_byID(user_id)
            return jsonify(
                {"message": "success", "username": client['username'], "email": client['email']})
        else:
            return jsonify({'message': 'not login'})
    # POST:
    data = request.get_json(force=True)
    if not data:
        return jsonify({'message': 'Null request'})
    # data is valid:
    print(data)
    username = data['username']
    email = data['email']
    user_id = session['user']
    res = user.update_user(username, "", email, user_id)
    if res[0] == -1:
        return jsonify({'message': 'Username already exists'})
    if res[1] == -1:
        return jsonify({'message': 'Email address already exists'})
    # successfully edited profile, send 'success' back
    # client = user.get_user(username)
    response = jsonify({
        'message': 'success',
    })
    return response


@app.route('/project', methods=['POST', 'GET'])
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
            # delete from user proj list and project db

            # first to check if all the hardware has been returned
            hardware_set_dict = project.handle_get_project_info(project_id)[
                "hardware_set_dict"]
            # if all the hardware has been returned, delete this project from user's projects list directly
            if len(hardware_set_dict) > 0:
                # check if this user is the only one person to manage this project
                team_list = project.handle_get_project_info(project_id)['team']
                if len(team_list) == 1:
                    return jsonify({'message': 'As the only manager for this project please return the hardware before delete it. This project will be permanently deleted afterwards.'})
            # remove project_id from user's projects list
            user.delete_projects(user_id, project_id)
            # remove member from project team
            project.handle_update_project_team(project_id, user_id, "-")
            team_list = project.handle_get_project_info(project_id)['team']
            # delete one project only when no one is managing that, and all the HW has been returned
            if len(team_list) == 0:
                project.delete_project(project_id)
            print("succefully deleted!")

        if data['action'] == 'create':
            project_name = data['project_name']
            comment = data['comment']
            proj_id = project.handle_project_creation(
                project_name, user_id, comment)  # create new proj
            # also need to add proj_id to user's project list!!
            user.add_projects(user_id, proj_id)

        if data['action'] == 'update':
            project_id = data['project_id']
            project_name = data['project_name']
            comment = data['comment']
            project.handle_update_project(project_id, project_name, comment)
        # error repsonese check:
        # successfully create new project, send 'success' back
        if data['action'] == 'join':
            project_id = data['project_id']
            # print(ObjectId.is_valid(project_id))
            if (not ObjectId.is_valid(project_id)) or (not project.handle_get_project_info(project_id)):
                return jsonify({'message': 'Project ID does not exist!'})
            # if project does exist
            user.add_projects(user_id, project_id)
            project.handle_update_project_team(project_id, user_id, "+")

    # Either POST OR GET: (display project list)
    project_dict = user.get_projects(user_id)
    project_list = []  # [] of {}
    for proj_id in project_dict:
        proj_info = project.handle_get_project_info(proj_id)
        if proj_info:  # if project can be found
            proj_info['_id'] = str(proj_info['_id'])  # make ObjectID jsonable
            project_list.append(proj_info)
    # print("proj list: ", project_list)
    # print(project_list)
    return jsonify({'message': 'success', 'records': tuple(project_list)})
    # return json.loads(json_util.dumps(project_list))




if(__name__ == "__main__"):
    app.run(debug=True)

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
# Adding Project Route
