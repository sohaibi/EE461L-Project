import pymongo
from pymongo import MongoClient
from bson import ObjectId


cluster = MongoClient(
    "mongodb+srv://ProjectGroup3:UTAustin%21@semesterprojectcluster.nmjzk.mongodb.net/HardwareSet?retryWrites=true&w=majority")
database = cluster["SemesterProject"]
hardware_set = database["HardwareSet"]


# -------------------Other than desire value,  Return of '-1' == Error; '0' == Sucess --------------------------------

# SET & GET ID-------------------------------------------------------------------------------------------------

def get_hardware_id(hardware_name: str) -> ObjectId:
    """
    get hardware_set ObjectId
    :param hardware_name: hardware_set name
    :returns: ObjectId if success; error code -1 if hardware does not exist
    """
    hardware = hardware_set.find_one({"hardware_name": hardware_name})
    if hardware is None:
        # print("Hardware does not exist!") #DEBUG
        return -1  # "Hardware does not exist!"

    else:
        id = hardware["_id"]
        # print("id: ", id)    #DEBUG
        # print(type(id))
        return id


# print(get_hardware_id("test12"))  # DEMO


# create hardware -----------------------------------------------------------------------------------------------------
def create_new_hardware_set(hardware_name, capacity):
    """
    create new hardware_set 
    :param hardware_name: hardware_set name
    :param capacity: hardware_set capacity
    :returns: 0 if success; -1 if capacity is negative; -2 if hardware_name already exists
    """
    # ensure HWset has at least 0 HW AND no hardware duplication
    if capacity < 0:
        return -1
    id = get_hardware_id(hardware_name)
    if id != -1:
        return -2
    project_dictionary = {}
    post = {"hardware_name": hardware_name, "capacity": capacity,
            "availability": capacity, "project": project_dictionary}
    hardware_set.insert_one(post)
    return 0

# print(create_new_hardware_set(hardware_name="test4", capacity=30))    #DEMO


# set & get availability-------------------------------------------------------------------------------------------------
def get_hardware_availability(hardware_name: str) -> int:
    """
    get hardware_set availability 
    :param hardware_name: hardware_set name
    :returns: availability if success; -1 if hardware name does not exist
    """
    id = get_hardware_id(hardware_name)
    if id == -1:
        return -1
    availability = hardware_set.find_one(
        {"_id": id})["availability"]
    # print("availability: ", availability)    #DEBUG
    return availability


# print(get_hardware_availability("test1"))  # DEMO


# '+' for addition '-' for deletion ; Note: amt_of_hardware != total
def set_hardware_availability(hardware_name: str, amt_of_hardware: int) -> int:
    """
    set hardware_set availability 
    :param hardware_name: hardware_set name
    :param amt_of_hardware: change of amount of hardware capacity in this hardware set
    :returns: 0 if success; -1 if hardware name does not exist; -2 if hardware deletion result in negative availability
    """
    id = get_hardware_id(hardware_name)
    if id == -1:
        return -1
    old_availability = get_hardware_availability(
        hardware_name)  # availability before checkin
    # check '< 0' or 'exceed capacity'
    if(old_availability + amt_of_hardware < 0):
        #error_msg="Invalid input: hardware deletion ."
        # print(error_msg) #DEBUG
        return -2
    new_availability = old_availability + \
        amt_of_hardware  # availability after checkin

    hardware_set.update_one({"hardware_name": hardware_name, }, {
                            "$set": {"availability": new_availability}})
    return 0  # return 0 if success


# print(set_hardware_availability("test21", -300))  # DEMO


# set & get capacity-------------------------------------------------------------------------------------------------
def get_hardware_capacity(hardware_name: str) -> int:
    """
    get hardware_set capacity
    :param hardware_name: hardware_set name
    :returns: capacity if success; error code= -1 when hardware cannot be found
    """
    id = get_hardware_id(hardware_name)
    if id == -1:
        return -1
    capacity = hardware_set.find_one(
        {"_id": id})["capacity"]
    # print("capacity: ", capacity)    #DEBUG
    return capacity


# print(get_hardware_capacity("test2"))  # DEMO


# '+' for addition '-' for deletion ; Note: amt_of_hardware != total
def set_hardware_capacity(hardware_name: str, amt_of_hardware: int) -> int:
    """
    set hardware_set capacity, amt_of_hardware can be positive or negative 
    :param hardware_name: hardware_set name
    :param amt_of_hardware: change of amount of hardware capacity in this hardware set
    :returns: error code as int.  res= 0 success; -1 when hardware cannot be found ; -2 when decrease of capacity exceeds current availability
    """
    # decrease of capacity should not exceed current availability; else availability is updated
    code = set_hardware_availability(hardware_name, amt_of_hardware)
    if code == -1 or code == -2:
        return code
    # update new_capacity
    new_capacity = get_hardware_capacity(hardware_name) + amt_of_hardware
    hardware_set.update_one({"hardware_name": hardware_name, }, {
                            "$set": {"capacity": new_capacity}})

    return 0


# print(set_hardware_capacity("test1", 10))  # DEMO


# set & get project-----------------------------------------------------------------------------------------------------
def get_hardware_projectlist(hardware_name: str) -> list:
    """
    get hardware_set projectlist
    :param hardware_name: hardware_set name
    :returns: project list if hardware_set is found, else -1 if hardware_set is not found
    """
    id = get_hardware_id(hardware_name)
    if id == -1:
        return -1
    # if hardware exist
    project_list = hardware_set.find_one(
        {"hardware_name": hardware_name})["project"]
    return project_list  # return a list of project ids that checked out this hardware


# print(get_hardware_projectlist("test12"))  # DEMO


def get_hardware_proj_checkout(hardware_name: str, project_id: ObjectId) -> int:
    """
    get a project's checkout amount from this hardware_set
    :param hardware_name: hardware_set name
    :param project_id: project_id
    :returns: checkout amount if find hardware_set and project_id; -1 if hardware_set doesn't exist; -2 if this project does not exist
    """
    project_list = get_hardware_projectlist(hardware_name)
    if project_list != -1:  # project list exist
        try:
            # tricky bug: key must be string
            checkedout_amt = project_list[str(project_id)]
        except KeyError:
            #print("this project does not exist")
            return -2  # this project does not exist
        else:
            # print("checkedout_amt: ",checkedout_amt) #debug
            return checkedout_amt
    else:
        return -1  # hardware doesn't exist


# print(get_hardware_proj_checkout("test1", 8765555))


# CALL this function in check in/out(); Dont call this directly, lack logic check
def update_hardware_proj_checkout(hardware_name: str, project_id: ObjectId, hardware_amt: int):
    """
    set hardware_set projectlist
    :param hardware_name: hardware_set name
    :param project_id: project_id
    :returns: 0 if success; -1 if hardware_set does not exist
    """
    checked_out = get_hardware_proj_checkout(hardware_name, project_id)
    project_dict = get_hardware_projectlist(hardware_name)

    if(checked_out == -1):  # hardware_set does not exist
        return -1
    if(checked_out != -2):  # project exist, simply update hardware_amt
        project_dict[str(project_id)] += hardware_amt
        #print("check out: ", project_dict[str(project_id)])
    else:  # Either hardware OR this project doesn't exist
        # project_dict = {str(project_id):hardware_amt}
        project_dict[str(project_id)] = hardware_amt

    hardware_set.update_one({"hardware_name": hardware_name}, {
                            "$set": {"project": project_dict}}, upsert=False)
    return 0


# print(update_hardware_proj_checkout("test1", 8765, 55))  # DEMO

def get_hardware_info():
    docs = hardware_set.find({})
    return list(docs)
# get_hardware_info()
# DEMOs:-----------------------------------------------------------------------------------------------------------
#create_new_hardware_set(hardware_name="test", capacity=100)
# get_hardware_id("Device5")

# set_hardware_capacity("test",-20)
# get_hardware_capacity("test")

# set_hardware_availability("test1",100)
# get_hardware_availability("test")

# set_hardware_project("test1",8765,100)
# get_hardware_projectlist("test1")
# get_hardware_proj_checkout("test1",3232145)


# ---------------------------------------#check in/out hardwares----------------------------------------------------
# def hardware_checkin(hardware_name,project_id,checkedout_amt,checkin_amount):
#     if(checkedout_amt >= checkin_amount):   #check valid check in amt; check in and out amt may differ
#         set_hardware_availability(hardware_name, checkin_amount)
#         set_hardware_project(hardware_name,project_id,checkin_amount)
#     if(checkedout_amt == checkin_amount): #if returning all hardwares checked out, remove this proj id from hardware's proj list
#         hardware_set.update_one({"hardware_name":hardware_name},{"$pull":{"project":{str(project_id):checkin_amount}}}) #note: str key
#     return
# #hardware_checkin("test1",3232145,5) #DEMO

# def hardware_checkout(hardware_name,project_id,checkout_amount):
#     checkout = checkout_amount * -1      # negative number for check out
#     availability = get_hardware_availability(hardware_name) #availability before checkout
#     if (availability >= checkout_amount): #check hardware amount is available
#         set_hardware_project(hardware_name,project_id,checkout_amount) #appened project ID to hardware's project list
#         set_hardware_availability(hardware_name,checkout)
#     return
# #hardware_checkout("test1",8765432,10) #DEMO

# ---------------------------------------#CODE FOR ANOTHER SECTION----------------------------------------------------
