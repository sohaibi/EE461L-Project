# history.py :
# 1. datetime format sort by date?
# 2. sort by date

# project.py :
# 1. datetime format
# 2. replace all the fince() with find_one(), then no for loop will be needed
# 3. handle_update_hardware: increase or decrease by data;
# 4. hardware_set_dict : implement it as dic
# 5. history_dict is not needed from our last discussion?

# hardware.py
# 1. Send error code for each method
# 2. set_new_hardware -> name changed to create_new_hardware_set
# 3. atrribute: project_dictionary, implement it as dic(saved in mongoDB as Object)
# 4. set_hardware_project(), can you change the projects datatype as a dic, as Mona has done?
# 5. get_hardware_projectlist, same as #4, change to a dic
# 6. no need for checkin/ check out, we will write these two functions in the server_service, as they cater for the request from client,
# but not in data_service, since they're not basic level data operations.


# # test dic object in MongoDB
# from pymongo import MongoClient
# client = MongoClient(
#     "mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/test")
# # get database
# mydb = client["SemesterProject"]
# # get projects collection
# projects = mydb["Project"]
# # get users collection
# users = mydb["User"]

# # create dic to user Yue

# # users.update_one({'username': 'Yue'},
# #                  {'$set': {'dict': {}}})

# mydict = users.find_one({'username': 'Yue'})['dict']
# # mydict['1'] = 10
# # users.update_one({'username': 'Yue'},
# #                  {'$set': {'dict': mydict}})
# # if '1' in mydict.keys():
# #     print(True)
# # print(mydict['1'])
# mydict['1'] = 30
# # print(mydict['1'])
# users.update_one({'username': 'Yue'},
#                  {'$set': {'dict': mydict}})

# mydict = {}
# print(mydict[1])

# from .. import data_service
