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
from re import A
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from data_service import hardware, user, project
from passlib.hash import pbkdf2_sha256
from bson import ObjectId


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "secret"
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/check',  methods=['POST', 'GET'])
def check():
    # GET
    if request.method == 'GET':  # send list of user's projects to React side
        if "user" in session:
            user_id = session['user']
            project_ids = user.get_projects(
                user_id)   # list of project id strings

            projects = []

            for index in range(project_ids.length):
                projID = project_ids[index]
                name = project.handlle_get_project_name(projID)
                hardware = project.handle_get_project_info(
                    projID).hardware_set_dict
                credits = 80  # TODO: calculate credit

                proj = {
                    "name": name,
                    "id": projID,
                    "hardware": hardware,
                    "credits": credits
                }
                projects.append(proj)

            return jsonify(
                {"message": "success", "projects": projects}
            )
        else:
            return jsonify({'message': 'not login'})
    # POST
    data = request.json
    if not data:
        return jsonify({'message': 'Null request'})
    if data:
        projId = data['projId']
        update = data['update']
        hwInfo = hardware.get_HWSet_collection_info

        for i in range(update.length):   # update project and hardware sets
            project.handle_update_hardware(
                str(projId), str(hwInfo[i].id), update[i])
            hardware.set_HWSet_availability(str(hwInfo[i].id), update[i])

        return jsonify({'message': 'success'})


@app.route('/hardware')
def send_hardware_info():
    data_list = hardware.get_HWSet_collection_info()
    # return jsonify({'result': hardware.get_hardware_availability("test1")})
    data_dict = {}
    HW_name = []
    HW_ava = []
    HW_cap = []
    for index in range(len(data_list)):
        HW_name.append(data_list[index]['HWSet_name'])
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


@app.after_request
def creds(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


if(__name__ == "__main__"):
    app.run(debug=True)
