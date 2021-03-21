import pymongo
from pymongo import MongoClient
import datetime
#/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages/pip

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/SemesterProject?retryWrites=true&w=majority", ssl=True,ssl_cert_reqs='CERT_NONE')
db = cluster["SemesterProject"]
collection = db["Project"]

def handle_project_creation(creation_date, project_name, user_id ):
    print("Inside function")
    history_dict = {creation_date:"Project Created"}
    hardware_set_dict = {}
    status = "ongoing"
    post = { "creation_date": creation_date, "project_name": project_name, "user_id": user_id, "status": status, "hardware_set_dict": hardware_set_dict, "history_dict": history_dict}
    print("post created")
    collection.insert_one(post)
    print("post added")
    print("created")

def handle_status(status, project_id):
    collection.update_one({"_id": project_id}, {"$set": {"status": status}})

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