# from flask import Flask
# # resource: https://www.youtube.com/watch?v=Z1RJmh_OqeA

# app = Flask(__name__) #referencing this file

# @app.route('/') #pass in url here; index route so no 404
# # define function for that route
# def index():
#     return "Hello,WIRE powderless!"

# if __name__ == "__main__":
#     app.run(debug=True) # error would display on webpage
# #type <localhost:5000> in browser
from flask import Flask, json, jsonify, request, session
from flask_cors import CORS
from data_service import hardware, user, project
from passlib.hash import pbkdf2_sha256
from bson import ObjectId
from bson import json_util


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "secret"
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/hardware')
def send_hardware_info():
    data_list = hardware.get_hardware_info()
    # return jsonify({'result': hardware.get_hardware_availability("test1")})
    data_dict = {}
    HW_name = []
    HW_ava = []
    HW_cap = []
    for index in range(len(data_list)):
        HW_name.append(data_list[index]['hardware_name'])
        HW_ava.append(data_list[index]['availability'])
        HW_cap.append(data_list[index]['capacity'])
    data_dict['HW_name'] = HW_name
    data_dict['HW_ava'] = HW_ava
    data_dict['HW_cap'] = HW_cap
    return jsonify(data_dict)


@app.route('/login', methods=['POST', 'GET'])
def login():
    # GET
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
    data = request.json
    # print(data)
    if not data:
        return jsonify({'message': 'Null request'})
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
    data = request.json
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
        data = request.json
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
    data = request.json
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
        data = request.json
        if not data:
            return jsonify({'message': 'Null request'})
        # print(user_id)
        if data['action'] == 'delete':
            project_id = data['project_id']
            # delete from user proj list and project db
            user.delete_projects(user_id, project_id)
            # if remove member from project team
            project.handle_update_project_team(project_id, user_id, "-")
            team_list = project.handle_get_project_info(project_id)['team']
            # delete one project only when no one is managing that
            if len(team_list) == 0:
                project.delete_project(project_id)
            # print("succefully deleted!")

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


@app.after_request
def creds(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


if(__name__ == "__main__"):
    app.run(debug=True)

# Adding Project Route
