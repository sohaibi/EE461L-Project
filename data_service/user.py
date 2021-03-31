from pymongo import MongoClient
from bson import ObjectId
import certifi

client = MongoClient(
    "mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/test",  tlsCAFile=certifi.where())

# get database
mydb = client["SemesterProject"]
# get projects collection
projects = mydb["Project"]
# get users collection
users = mydb["User"]


def check_duplicate(username: str, email: str) -> list:
    """
    Check no duplicates of username and email in the database
    :param username: username
    :param email: email
    :returns res: list of error code. res[0] indicates username error code; res[1] indicates email error code
    :              res[i]= 0 success; res[i]= -1 duplicate exists
    """

    check1 = users.find_one({"username": username})
    # print(check1)
    # check duplicated email
    check2 = users.find_one({"email": email})
    res = [0, 0]
    if check1 is not None:
        res[0] = -1
    if check2 is not None:
        res[1] = -1
    return res


# print(check_duplicate("Yue1", "yue1@utexas.edu"))
# print(check_duplicate.__doc__)


def get_user(username: str):
    """
    Get user information by the username provided by the client
    :param username: username
    :returns res: -1 if user does not exist; user dictionary object if user exists
    """
    res_dup = check_duplicate(username, '')
    # if user does not exist
    if res_dup[0] == 0:
        return -1
    user = users.find_one({"username": username})
    return user
# print(get_user('Yue'))


def get_user_byID(user_id: str):
    """
    Get user information by user_id
    :param user_id in string format
    :returns res: -1 if user does not exist; user dictionary object if user exists
    """

    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return -1
    return user

# print(get_user_byID("605d311f619fda7de819bece"))


def create_user(username: str, password: str, email: str) -> list:
    """
    Register：Create a new user in the database
    :param username: username
    :param password: password
    :param email: email
    :returns res: list of error code. res[0] indicates username error code; res[1] indicates email error code
    :              res[i]= 0 success; res[i]= -1 duplicate exists
    """
    res = check_duplicate(username, email)
    # print("check duplicate res =", res)
    if res[0] == 0 and res[1] == 0:
        users.insert_one({"username": username, "password": password,
                          "email": email, "projects": []})
        # print("Inside it, my res should be:", res)
    # print("Now my res should be:", res)
    return res


# print(create_user("Yue2", "1223", "yue2@utexas.edu"))
# print(check_duplicate("", ""))

# @param: pass in "" if the attributes does not need to be updated


def update_user(new_username: str, new_password: str, new_email: str, user_id: str) -> list:
    """
    Update user information in database
    :param new_username: new updated username; "" indicates no updates
    :param new_password: new updated password; "" indicates no updates
    :param new_email: new updated email; "" indicates no updates
    :param user_id: userID in mongoDB
    :returns res: list of error code. res[0] indicates username error code; res[1] indicates email error code
    :              res[i]= 0 success; res[i]= -1 duplicate exists
    """
    res = check_duplicate(new_username, new_email)
    if res[0] == 0 and res[1] == 0:
        if new_username != "":
            users.update_one(filter={"_id": ObjectId(user_id)}, update={'$set': {
                             "username": new_username}}, upsert=False)
        if new_password != "":
            users.update_one(filter={"_id": ObjectId(user_id)}, update={'$set': {
                             "password": new_password}}, upsert=False)
        if new_email != "":
            users.update_one(filter={"_id": ObjectId(user_id)}, update={'$set': {
                             "email": new_email}}, upsert=False)

    return res


# print(update_user("", "123", "", "Yue"))
# print(update_user("", "456", "chengyue@utexas.edu", "Yue"))


def add_projects(user_id: str, project_id: str):
    """
    Add new project into projects list
    :param user_id: user_id in str type
    :param project_id: project_id to be added into the lists
    :returns:  list of project_id after adding the project
    """
    # # get project list from user_id
    # projects = users.find_one({"_id": ObjectId(user_id)})['projects']
    # no need to check if project_id already exists in projects list, since it's '$addToSet' operation
    users.update_one({"_id": ObjectId(user_id)}, update={
                     '$addToSet': {'projects': project_id}}, upsert=False)
    return users.find_one(({"_id": ObjectId(user_id)}))['projects']


# print(add_projects("604e7d148aaacd6a12855cbb", "43210"))

def delete_projects(user_id: str, project_id: str):
    """
    Delete an existing project in projects list
    :param user_id: user_id in str type
    :param project_id: project_id to be added into the lists
    :returns:  res= -1 project_id does not exist in the projects list;  list of project_id if success
    """
    # get project list from user_id
    projects = users.find_one({"_id": ObjectId(user_id)})['projects']
    # check if project_id already exists in projects list
    if project_id not in projects:
        return -1
    users.update_one({"_id": ObjectId(user_id)}, update={
        '$pull': {'projects': project_id}}, upsert=False)
    return users.find_one(({"_id": ObjectId(user_id)}))['projects']


# print(delete_projects("604e7d148aaacd6a12855cbb", "432166"))


def get_projects(user_id: str):
    """
    get the projects list belong to this user
    :param user_id: user_id in str type
    :returns: list of project_id if success
    """
    return users.find_one(({"_id": ObjectId(user_id)}))['projects']


# print(get_projects("604e7d148aaacd6a12855cbb"))