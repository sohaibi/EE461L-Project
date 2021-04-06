import pymongo
from pymongo import MongoClient
import datetime
#/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages/pip

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/SemesterProject?retryWrites=true&w=majority", ssl=True,ssl_cert_reqs='CERT_NONE')
db = cluster["SemesterProject"]
collection = db["History"]

def create_history(project_id, tag, description, date):
    post = {"project_id": project_id, "tag": tag, "description": description, "date":date}
    collection.insert_one(post)

def sort_by_tag_and_project(tag, project_id):
    history = collection.find({"project_id": project_id, "tag": tag})
    return history

def handle_project_history(project_id):
    project_history = collection.find({"project_id": project_id})
    return project_history

