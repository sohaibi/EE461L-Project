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
from flask import Flask, jsonify
from flask_cors import CORS
from data_service import hardware

app = Flask(__name__)
CORS(app)

@app.route('/hardware')
def send_hardware_info():
    data_list = hardware.get_hardware_info()
    # return jsonify({'result': hardware.get_hardware_availability("test1")})
    data_dict ={}
    HW_name =[]
    HW_ava = []
    HW_cap =[]
    for index in range(len(data_list)):
        HW_name.append(data_list[index]['hardware_name'])
        HW_ava.append(data_list[index]['availability'])
        HW_cap.append(data_list[index]['capacity'])
    data_dict['HW_name']= HW_name
    data_dict['HW_ava']= HW_ava
    data_dict['HW_cap']= HW_cap
    return jsonify(data_dict)


if(__name__ == "__main__"):
    app.run(debug=True)