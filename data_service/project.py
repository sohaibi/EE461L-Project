import pymongo
from pymongo import MongoClient
import datetime
from bson import ObjectId
# import user
#/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages/pip

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/SemesterProject?retryWrites=true&w=majority", ssl=True,ssl_cert_reqs='CERT_NONE')
db = cluster["SemesterProject"]
collection = db["Project"]

def generate_date():
    now = datetime.datetime.now()
    date = now.strftime("%Y-%m-%d %H:%M:%S") # ex:2021-03-28 13:19:42
    return date


# def handle_project_creation(creation_date, project_name, user_id ): //create date inside funcition
def handle_project_creation(project_name, user_id,comment):
    print("Inside function")
     # status = "ongoing"  # history_dict = {creation_date:"Project Created"}  //for later
    hardware_set_dict = {}
    date_created = generate_date()
    post = { "date_created": date_created,"last_edited": date_created, "project_name": project_name, "user_id": user_id, "comment": comment, "hardware_set_dict": hardware_set_dict} #,  "status": status, "history_dict": history_dict
    print("post created")
    collection.insert_one(post)
    print("post added")
    print("created")

def handle_status(status, project_id):
    collection.update_one({"_id": project_id}, {"$set": {"status": status}})

def handle_comment(comment, project_id):
    collection.update_one({"_id": project_id}, {"$set": {"comment": comment}})

def handle_get_project_id(project_name, user_id):
    results = collection.find({"project_name": project_name, "user_id" : user_id})
    for result in results:
        project_id = result["_id"]
    return project_id

def handle_set_project_name(project_id, project_name):
    collection.update_one({"_id": project_id}, {"$set": {"project_name": project_name}})

def handlle_get_project_name(project_id):
    results = collection.find({"_id": project_id})
    for result in results:
        project_name = result["project_name"]
    return project_name 

def handle_update_hardware(project_id, key, data):
    results = collection.find({"project_id": project_id})
    for result in results:
        hardware_dict = result["hardware_set_dict"]
    hardware_dict[key] = data
    collection.update_one({"_id": project_id}, {"$set": {"hardware_set_dict": hardware_dict}})



#handle_project_creation("today", "TestPost", "Sheila")
#handle_status("completed", 0)
#print(handle_get_project_id("TestPost", "Mona"))

#handle_project_creation( "TestCreateDate", "user", "blu blu blu")

def handle_get_project_info(project_id:str):
    """
    get all the information for certain project
    :param project_id: project_id
    :returns: a dict object containing all the information of that user
    """
    project = collection.find_one({"_id": ObjectId(project_id)})
    return project

# print(handle_get_project_info("6064f8a60eb2ea5f785136dc"))

#testing GET code
# user_id = "60601c82cdd298d4ea3c5a04"
# project_dict = user.get_projects(user_id)
# #print("proj dict: ",project_dict)    
# project_list = [] # [] of {}
# for proj_id in project_dict:
#     proj_info = handle_get_project_info(proj_id)
#     project_list.append(proj_info)

# # print("proj list: ", project_list)
# print("json: ----",jsonify(project_list))