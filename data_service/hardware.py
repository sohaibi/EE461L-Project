import pymongo
from pymongo import MongoClient
from bson import ObjectId


cluster = MongoClient(
    "mongodb+srv://ProjectGroup3:UTAustin%21@semesterprojectcluster.nmjzk.mongodb.net/HardwareSet?retryWrites=true&w=majority")
database = cluster["SemesterProject"]
hardware_set = database["HardwareSet"]


# -------------------Other than desire value,  Return of '-1' == Error; '0' == Sucess --------------------------------

# SET & GET ID-------------------------------------------------------------------------------------------------

def get_HWSet_name(HWSet_id: str) -> str:
    """
    get HWSet_name by HWSet_id in str type
    :param HWSet_id: HWSet_id in str type
    :returns: HWSet_name if success; error code -1 if hardware does not exist
    """
    HWSet = hardware_set.find_one({"_id": ObjectId(HWSet_id)})
    if HWSet is None:
        # print("HWSet does not exist!") #DEBUG
        return -1  # "HWSet does not exist!"

   # if HWSet exists
    return HWSet["HWSet_name"]


# print(get_HWSet_name("6053e85aac3bed1ba2ecc70f"))  # DEMO


# create hardware_set -----------------------------------------------------------------------------------------------------
def create_new_HWSet(HWSet_name: str, capacity: int) -> str:
    """
    create new HWSet 
    :param hardware_name: HWSet name
    :param capacity: HWSet capacity
    :returns: HWSet_id in str format if success; -1 if capacity is negative
    """
    if capacity < 0:
        return -1

    post = {"HWSet_name": HWSet_name, "capacity": capacity,
            "availability": capacity}
    HWSet = hardware_set.insert_one(post)
    return str(HWSet.inserted_id)


# print(create_new_HWSet(HWSet_name="test4", capacity=-3))  # DEMO


# set & get availability-------------------------------------------------------------------------------------------------
def get_HWSet_availability(HWSet_id: str) -> int:
    """
    get HWSet availability by HWSet_id
    :param HWSet_id: HWSet_id in str type
    :returns: availability if success; -1 if HWSet_id does not exist
    """
    HWSet = hardware_set.find_one({"_id": ObjectId(HWSet_id)})
    if HWSet is not None:
        availability = HWSet["availability"]
        # print("availability: ", availability)    #DEBUG
        return availability
    return -1


# print(get_HWSet_availability("60620d64d962298b2837d3d7"))  # DEMO


# '+' for addition '-' for deletion ; Note: amt_of_hardware != total
def set_HWSet_availability(HWSet_id: str, amt_of_hardware: int) -> int:
    """
    set HWset availability 
    :param HWSet_id: HWset id
    :param amt_of_hardware: change of amount of hardware capacity in this hardware set
    :returns: new availability if success; -1 if HWSet does not exist; -2 if hardware deletion result in negative availability
    """
    old_availability = get_HWSet_availability(
        HWSet_id)   # availability before checkin
    if old_availability == -1:
        return -1
    # check '< 0' or 'exceed capacity'
    if(old_availability + amt_of_hardware < 0):
        #error_msg="Invalid input: hardware deletion ."
        # print(error_msg) #DEBUG
        return -2
    new_availability = old_availability + \
        amt_of_hardware  # availability after checkin

    hardware_set.update_one({"_id": ObjectId(HWSet_id), }, {
                            "$set": {"availability": new_availability}})
    return new_availability  # return 0 if success


# print(set_HWSet_availability("60620d64d962298b2837d3d7", -100))  # DEMO


# set & get capacity-------------------------------------------------------------------------------------------------
def get_HWSet_capacity(HWSet_id: str) -> int:
    """
    get HWSet capacity
    :param HWSet_id: hardware_set id
    :returns: capacity if success; error code= -1 when HWSet cannot be found
    """
    HWSet = hardware_set.find_one(
        {"_id": ObjectId(HWSet_id)})
    if HWSet is None:
        return -1
    return HWSet["capacity"]


# print(get_HWSet_capacity("60620d64d962298b2837d3d7"))  # DEMO


# '+' for addition '-' for deletion ; Note: amt_of_hardware != total
def set_HWSet_capacity(HWSet_id: str, amt_of_hardware: int) -> int:
    """
    set hardware_set capacity, amt_of_hardware can be positive or negative 
    :param HWSet_id: HWSet id
    :param amt_of_hardware: change of amount of hardware capacity in this hardware set
    :returns: new capacity if success; error code as int. -1 when hardware cannot be found ; -2 when decrease of capacity exceeds current availability
    """
    # decrease of capacity should not exceed current availability; else availability is updated
    code = set_HWSet_availability(HWSet_id, amt_of_hardware)
    if code == -1 or code == -2:
        return code
    # update new_capacity
    new_capacity = get_HWSet_capacity(HWSet_id) + amt_of_hardware
    hardware_set.update_one({"_id": ObjectId(HWSet_id), }, {
                            "$set": {"capacity": new_capacity}})

    return new_capacity

# print(set_HWSet_capacity("60620d64d962298b2837d3d7", -46))  # DEMO


def get_HWSet_collection_info():
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
