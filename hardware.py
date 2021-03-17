import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin%21@semesterprojectcluster.nmjzk.mongodb.net/HardwareSet?retryWrites=true&w=majority")
database = cluster["SemesterProject"]
hardware_set = database["HardwareSet"]
project = database["Project"]
user = database["User"]


#create hardware  #?? should we add timestamp to when new hardware is created?
def set_new_hardware(hardware_name, capacity):
    if(capacity>0): #ensure at least 1 hardware
        project_dictionary={}
        post ={"hardware_name": hardware_name, "capacity": capacity, "availability": capacity, "project":project_dictionary}
        hardware_set.insert_one(post)
    else:
        error_msg="Invalid input: Capacity is <= 0."
        return error_msg
#set_new_hardware(hardware_name="test", capacity=100)    #DEMO: only need haedware name and capacity!


#SET & GET ID-------------------------------------------------------------------------------------------------
#{#?? is this necessary since id is set when creating the hardware object?if updating id is needed, check if desire id exist before calling this function}
# def set_hardware_id(self,id): 
#     self.__id=id
#     return
#{above function kept for now}

def get_hardware_id(hardware_name):
    id = hardware_set.find_one({"hardware_name": hardware_name})["_id"]
    #print("id: ", id)    #DEBUG
    return id
#get_hardware_id("test")  #DEMO


#set & get capacity-------------------------------------------------------------------------------------------------
def update_hardware_capacity(hardware_name,amt_of_hardware): # '+' for addition '-' for deletion
    old_capacity = hardware_set.find_one({"hardware_name":hardware_name})["capacity"]
    old_availability = hardware_set.find_one({"hardware_name":hardware_name})["availability"]
    if( old_availability + amt_of_hardware < 0): #check valid deletion amt
        error_msg="Invalid input: hardware deletion amount exceeds available amount."
        #print(error_msg)
        return error_msg    

    new_capacity = old_capacity + amt_of_hardware
    new_availability = old_availability + amt_of_hardware
    hardware_set.update_one({"hardware_name":hardware_name,},{"$set":{"capacity":new_capacity,"availability":new_availability}})
    return
#update_hardware_capacity("test",-200) #DEMO

def get_hardware_capacity(hardware_name):
    capacity = hardware_set.find_one({"hardware_name": hardware_name})["capacity"]
    #print("capacity: ", capacity)    #DEBUG
    return capacity
#get_hardware_capacity("test")  #DEMO


#set & get availability-------------------------------------------------------------------------------------------------
def set_hardware_availability(hardware_name, avilability): 
    hardware_set.update_one({"hardware_name":hardware_name,},{"$set":{"availability":avilability}})
    return

def get_hardware_availability(hardware_name):
    availability = hardware_set.find_one({"hardware_name": hardware_name})["availability"]
    #print("availability: ", availability)    #DEBUG
    return availability
#get_hardware_availability("test")  #DEMO


#set & get project-----------------------------------------------------------------------------------------------------
def set_hardware_project(hardware_name,project_id,hardware_amt):
    hardware_set.update_one({"hardware_name":hardware_name},{"$addToSet":{"project":{str(project_id):hardware_amt}}}) #ISSUE!!
    return  #appened project ID to hardware's project list
#set_hardware_project("Device5",9089,25) #DEMO

def get_hardware_project(hardware_name):
    project = hardware_set.find_one({"hardware_name": hardware_name})["project"]
    print("project: ", project)    #DEBUG
    return project  # return a list of project ids that checked out this hardware
#get_hardware_project("Device5")  #DEMO
 


#check in/out hardwares
def hardware_checkin(hardware_name,project_id, checkedout_amt,checkin_amount):
    if(checkedout_amt >= checkin_amount):   #check valid check in amt; check in and out amt may differ
        availability = get_hardware_availability(hardware_name) #availability before checkin
        availability+= checkin_amount #availability after checkin
        set_hardware_availability(hardware_name, availability)

    if(checkedout_amt == checkin_amount): 
        hardware_set.update({"hardware_name":hardware_name},{"$pull":{project_id}}) #ISSUE!!
        #if returning all hardwares checked out, remove this proj id from hardware's proj list
    return

def hardware_checkout(self,project_id,checkout_amount):
    if ( self.__availability >= checkout_amount): #check hardware amount is available
        self.__project.append(project_id) #appened project ID to hardware's project list
        self.__availability-= checkout_amount
    return


#DEMO:
#set_new_hardware(hardware_name="test", capacity=100)    #DEMO: only need haedware name and capacity!
#get_hardware_id("Device5")  
#update_hardware_capacity("test",-20)
#get_hardware_capacity("test")  #DEMO
#get_hardware_availability("test")  #DEMO
#set_hardware_project("Device2",222,30)