from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps


client = MongoClient(
    "mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/test")
# get database
mydb = client["SemesterProject"]
# get projects collection
projects = mydb["Project"]
# get users collection
users = mydb["User"]


# check no duplicates of username and email in the database
def check_duplicate(username, email):
    check1 = users.find_one({"username": username})
    # check duplicated email
    check2 = users.find_one({"email": email})
    res = [0, 0]
    if check1 is not None:
        res[0] = -1
    if check2 is not None:
        res[1] = -1
    return res


# create new user object
def create_user(username, password, email):
    res = check_duplicate(username, email)
    if res[0] == 0 and res[1] == 0:
        users.insert_one({"username": username, "password": password,
                          "email": email, "projects": []})
    return res


# create_user("tom", "123", "tom@utexas.edu")
# print(create_user("Yue", "123", "yue2@utexas.edu"))
# print(check_duplicate("", ""))

# @param: pass in "" if the attributes does not need to be updated
def update_user(new_username, new_password, new_email, old_username):
    res = check_duplicate(new_username, new_email)
    if res[0] == 0 and res[1] == 0:
        user_id = users.find_one({"username": old_username})["_id"]
        if new_username != "":
            users.update_one(filter={"_id": user_id}, update={'$set': {
                             "username": new_username}}, upsert=False)
        if new_password != "":
            users.update_one(filter={"_id": user_id}, update={'$set': {
                             "password": new_password}}, upsert=False)
        if new_email != "":
            users.update_one(filter={"_id": user_id}, update={'$set': {
                             "email": new_email}}, upsert=False)

    return res


# print(update_user("", "456", "", "Yue"))
# print(update_user("", "456", "chengyue@utexas.edu", "Yue"))

# add new project into projects list
# I feel like this method is not necessary...
def add_projects(username: str, project_id: str):
    user_id = users.find_one({"username": username})["_id"]
    users.update_one({"_id": user_id}, update={
        '$push': {'projects': project_id}}, upsert=False)


# add_projects("Yue", "123456")
