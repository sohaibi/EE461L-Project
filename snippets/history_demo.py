from pymongo import MongoClient
import datetime

client = MongoClient(
    "mongodb+srv://ProjectGroup3:UTAustin!@semesterprojectcluster.nmjzk.mongodb.net/test")

# get database
mydb = client["SemesterProject"]
# get projects collection
projects = mydb["Project"]
# get users collection
users = mydb["User"]

histories = mydb["histories"]  # create or get a new collection from db

# here project_id should be mongoDB's created project's _id value, I use integer as an example
# histories.insert({"project_id": 1, "tag": "create", "date": datetime.datetime.strptime("2021-03-01", "%Y-%m-%d")})
# histories.insert({"project_id": 1, "tag": "modify", "date": datetime.datetime.strptime("2021-03-02", "%Y-%m-%d")})
# histories.insert({"project_id": 1, "tag": "download", "date": datetime.datetime.strptime("2021-03-03", "%Y-%m-%d")})
# histories.insert({"project_id": 1, "tag": "download", "date": datetime.datetime.strptime("2021-01-01", "%Y-%m-%d")})
# histories.insert({"project_id": 2, "tag": "download", "date": datetime.datetime.strptime("2020-01-01", "%Y-%m-%d")})

# find all history of project_id = 1, do not return _id
all_history = histories.find({"project_id": 1}, {"_id": 0}).sort("date")
for each in all_history:
    print(each)

print("==========")
# # # find download history of project_id = 1
download_history = histories.find(
    {"$and": [{"project_id": 1}, {"tag": "download"}]}, {"_id": 0}).sort("date")
for each in download_history:
    print(each)
