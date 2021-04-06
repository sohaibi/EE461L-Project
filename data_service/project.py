import pymongo
from pymongo import MongoClient
import datetime
from bson import ObjectId
# import user
# /Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages/pip

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/SemesterProject?retryWrites=true&w=majority",
                      ssl=True, ssl_cert_reqs='CERT_NONE')
db = cluster["SemesterProject"]
collection = db["Project"]


def generate_date():
    """
    return date
    :returns res: date in python datetime format
    """
    now = datetime.datetime.now()
    date = now.strftime("%Y-%m-%d %H:%M:%S")  # ex:2021-03-28 13:19:42
    return date
# print(generate_date())

# def handle_project_creation(creation_date, project_name, user_id ): //create date inside funcition


def handle_project_creation(project_name: str, user_id: str, comment: str) -> str:
    """
    create a new project
    :param project_name: project_name
    :param user_id: user_id
    :param comment : comment
    :returns: project_id
    """
    # print("Inside function")
    # status = "ongoing"  # history_dict = {creation_date:"Project Created"}  //for later
    hardware_set_dict = {}
    date_created = generate_date()
    post = {"date_created": date_created, "last_edited": date_created, "project_name": project_name, "user_id": user_id,
            "comment": comment, "hardware_set_dict": hardware_set_dict, "team": [user_id]}  # ,  "status": status, "history_dict": history_dict
    # print("post created")
    result = collection.insert_one(post)
    return str(result.inserted_id)
    # print("post added")
    # print("created")


def handle_update_hardware(project_id: str, HWSet_id: str, changedNumber: int):
    """
    update hardware_set_dict for certain project
    :param project_id: project_id
    :param HWSet_id: HWSet_id
    :param changedNumber: for checkin, positive number; for checkout, negative number
    :returns: project_name
    """
    hardware_set_dict = collection.find_one({"_id": ObjectId(project_id)})[
        'hardware_set_dict']
    if HWSet_id not in hardware_set_dict.keys():
        hardware_set_dict[HWSet_id] = 0
    hardware_set_dict[HWSet_id] += changedNumber
    # delete HWSet_id if the total value turns zero
    if hardware_set_dict[HWSet_id] == 0:
        del hardware_set_dict[HWSet_id]
    collection.update_one({"_id": ObjectId(project_id)}, {"$set": {
                          "hardware_set_dict": hardware_set_dict, "last_edited": generate_date()}})


# handle_update_hardware("6064f8a60eb2ea5f785136dc", "60620d64d962298b2837d3d7", -30)

def handle_get_project_info(project_id: str):
    """
    get all the information for certain project
    :param project_id: project_id
    :returns: a dict object containing all the information of that user
    """
    project = collection.find_one({"_id": ObjectId(project_id)})
    return project

# print(handle_get_project_info("6064f8a60eb2ea5f785136dc"))


def handle_update_project(project_id: str, project_name: str, comment: str):

    fields = {}
    # post["_id"] = project_id
    if project_name != '':
        fields["project_name"] = project_name
    if comment:
        fields["comment"] = comment
    if len(fields) > 0:
        fields["last_edited"] = generate_date()
    collection.update_one({"_id": ObjectId(project_id)}, {"$set": fields})


def handle_update_project_team(project_id: str, member_id: str, action: str):
    """
    update a project's team information, either to add member or delete member
    :param project_id: project_id
    :param  member_id: user_id of that member
    :param  action: "+" to add member, "-" to remove member
    :returns: none
    """
    # post["_id"] = project_id
    if action == "+":
        collection.update_one({"_id": ObjectId(project_id)}, update={
            '$addToSet': {'team': member_id}}, upsert=False)
    elif action == "-":
        collection.update_one({"_id": ObjectId(project_id)}, update={
            '$pull': {'team': member_id}}, upsert=False)


# handle_update_project_team("6068e28d9a08f52a9e97b8d1",
#                            "604e7d148aaacd6a12855cbb", "-")


def delete_project(project_id: str):
    """
    delete project_id
    :param project_id: project_id

    """
    collection.delete_one({"_id": ObjectId(project_id)})
