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




def check_duplicate(username: str, email: str) -> list[int]:
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


def get_user(username:str):
    """
    Get user information by the username provided by the client
    :param username: username
    :returns res: -1 if user does not exist; user dictionary object if user exists
    """
    res_dup = check_duplicate(username,'')
    # if user does not exist
    if res_dup[0]==0:
        return -1
    user = users.find_one({"username": username})
    return user
# print(get_user('Yue'))

def get_user_byID(user_id:str):
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


def create_user(username: str, password: str, email: str) -> list[int]:
    """
    Register：Create a new user in the database
    :param username: username 
    :param password: password
    :param email: email
    :returns res: list of error code. res[0] indicates username error code; res[1] indicates email error code
    :              res[i]= 0 success; res[i]= -1 duplicate exists
    """
    res = check_duplicate(username, email)
    print("check duplicate res =", res)
    if res[0] == 0 and res[1] == 0:
        users.insert_one({"username": username, "password": password,
                          "email": email, "projects": []})
        print("Inside it, my res should be:", res)
    print("Now my res should be:", res)
    return res


# print(create_user("Yue2", "1223", "yue2@utexas.edu"))
# print(check_duplicate("", ""))

# @param: pass in "" if the attributes does not need to be updated


def update_user(new_username: str, new_password: str, new_email: str, user_id: ObjectId) -> list[int]:
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
            users.update_one(filter={"_id": user_id}, update={'$set': {
                             "username": new_username}}, upsert=False)
        if new_password != "":
            users.update_one(filter={"_id": user_id}, update={'$set': {
                             "password": new_password}}, upsert=False)
        if new_email != "":
            users.update_one(filter={"_id": user_id}, update={'$set': {
                             "email": new_email}}, upsert=False)

    return res


# print(update_user("", "123", "", "Yue"))
# print(update_user("", "456", "chengyue@utexas.edu", "Yue"))


def add_projects(username: str, project_id: str) -> int:
    """
    Add new project into projects list
    :param username: new updated username; "" indicates no updates 
    :param project_id: new updated password; "" indicates no updates
    :returns: error code as int.  res= 0 success; res= -1 project_id duplicate exists
    """
    # get user_id
    user_id = users.find_one({"username": username})["_id"]
    # # check if project_id already exists in projects list
    # projects = users.find_one({"_id": user_id})["projects"]
    # if project_id in projects:
    #     return -1
    users.update_one({"_id": user_id}, update={
        '$addToSet': {'projects': project_id}}, upsert=False)
    return 0


# print(add_projects("Yue", "4321"))
