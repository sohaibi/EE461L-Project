import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin%21@semesterprojectcluster.nmjzk.mongodb.net/HardwareSet?retryWrites=true&w=majority")
database = cluster["SemesterProject"]
hardware_set = database["HardwareSet"]
project = database["Project"]
user = database["User"]


#create hardware -----------------------------------------------------------------------------------------
def set_new_hardware(hardware_name, capacity):
    
    if(capacity>0 and hardware_set.find_one({"hardware_name": hardware_name})): #ensure at least 1 hardware
        project_dictionary={}
        post ={"hardware_name": hardware_name, "capacity": capacity, "availability": capacity, "project":project_dictionary}
        hardware_set.insert_one(post)
    else:
        error_msg="Invalid input: Capacity is <= 0."
        return error_msg
#set_new_hardware(hardware_name="test", capacity=100)    #DEMO


#SET & GET ID-------------------------------------------------------------------------------------------------
#{#?? is this necessary since id is set when creating the hardware object?if updating id is needed, check if desire id exist before calling this function}
# def set_hardware_id(self,id): 
#     self.__id=id
#     return
#{above function kept for now}

def get_hardware_id(hardware_name):
    hardware = hardware_set.find_one({"hardware_name": hardware_name})
    if hardware is None:
        print("Hardware does not exist!") #DEBUG
        return -1
    else: 
        id = hardware["_id"]
        print("id: ", id)    #DEBUG
        return id
#get_hardware_id("test1")  #DEMO


#set & get capacity-------------------------------------------------------------------------------------------------
def set_hardware_capacity(hardware_name,amt_of_hardware): # '+' for addition '-' for deletion
    if(set_hardware_availability(hardware_name,amt_of_hardware)==0): #availability update is successful & availabilty is also updated
        old_capacity = hardware_set.find_one({"hardware_name":hardware_name})["capacity"]
        new_capacity = old_capacity + amt_of_hardware
        hardware_set.update_one({"hardware_name":hardware_name,},{"$set":{"capacity":new_capacity}})
        return
#update_hardware_capacity("test",-200) #DEMO

def get_hardware_capacity(hardware_name):
    capacity = hardware_set.find_one({"hardware_name": hardware_name})["capacity"]
    #print("capacity: ", capacity)    #DEBUG
    return capacity
#get_hardware_capacity("test")  #DEMO


#set & get availability-------------------------------------------------------------------------------------------------
def set_hardware_availability(hardware_name, amt_of_hardware): 
    old_availability = get_hardware_availability(hardware_name)  #availability before checkin
    if( old_availability + amt_of_hardware < 0): #check valid deletion amt
        error_msg="Invalid input: hardware deletion amount exceeds available amount."
        #print(error_msg) #DEBUG
        return error_msg  
    new_availability = old_availability + amt_of_hardware  #availability after checkin

    hardware_set.update_one({"hardware_name":hardware_name,},{"$set":{"availability":new_availability}})
    return #return 0 if success?
#set_hardware_availability("test1",100) #DEMO

def get_hardware_availability(hardware_name):
    availability = hardware_set.find_one({"hardware_name": hardware_name})["availability"]
    #print("availability: ", availability)    #DEBUG
    return availability
#get_hardware_availability("test")  #DEMO


#set & get project-----------------------------------------------------------------------------------------------------
def set_hardware_project(hardware_name,project_id,hardware_amt):
    #hardware_set.update_one({"hardware_name":hardware_name},{"$addToSet":{"project":{str(project_id):hardware_amt}}}) #obj structure 
    hardware_set.update_one({"hardware_name":hardware_name},{"$addToSet":{"project":[{"project_ID":project_id},{"checkedout_amt":hardware_amt}]}}) #array structure 
    # TOD0:
    # if project_id already exist, update hardware_amt of that project
    # get_hardware_proj_checkout() would be useful!!
    return  #appened project ID to hardware's project list; #addToSet checks duplicate :)
#set_hardware_project("test1",8765,100) #DEMO

def get_hardware_projectlist(hardware_name):
    project = hardware_set.find_one({"hardware_name": hardware_name})["project"]
    print("project: ", project)    #DEBUG
    return project  # return a list of project ids that checked out this hardware
#get_hardware_projectlist("test1")  #DEMO
 

#def get_hardware_proj_checkout(hardware_name,project_id):      #other()
    #checkedout_amt = get_hardware_projectlist(hardware_name)
    checkedout_amt = hardware_set.find_one({"hardware_name":hardware_name},{"project":[str(project_id)]})
    print("checkedout_amt: ",checkedout_amt)
#get_hardware_proj_checkout("test1",3232145)


#DEMOs:-----------------------------------------------------------------------------------------------------------
#set_new_hardware(hardware_name="test", capacity=100)    #DEMO: only need haedware name and capacity!
#get_hardware_id("Device5")  

#set_hardware_capacity("test",-20)
#get_hardware_capacity("test")  

#set_hardware_availability("test1",100)
#get_hardware_availability("test")  

#set_hardware_project("test1",8765,100)
#get_hardware_projectlist("test1")
#get_hardware_proj_checkout("test1",3232145)



#---------------------------------------#check in/out hardwares----------------------------------------------------
# def hardware_checkin(hardware_name,project_id,checkedout_amt,checkin_amount):
#     if(checkedout_amt >= checkin_amount):   #check valid check in amt; check in and out amt may differ
#         set_hardware_availability(hardware_name, checkin_amount)
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

#---------------------------------------#CODE FOR ANOTHER SECTION----------------------------------------------------






