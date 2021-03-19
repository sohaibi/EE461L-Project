import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://ProjectGroup3:UTAustin%21@semesterprojectcluster.nmjzk.mongodb.net/HardwareSet?retryWrites=true&w=majority")
database = cluster["SemesterProject"]
hardware_set = database["HardwareSet"]


#-------------------Other than desire value,  Return of '-1' == Error; '0' == Sucess --------------------------------

#SET & GET ID-------------------------------------------------------------------------------------------------

def get_hardware_id(hardware_name):
    hardware = hardware_set.find_one({"hardware_name": hardware_name})
    if hardware is None:
        #print("Hardware does not exist!") #DEBUG
        return -1   #"Hardware does not exist!"
          
    else: 
        id = hardware["_id"]
        #print("id: ", id)    #DEBUG
        return id
#get_hardware_id("test")  #DEMO


#create hardware -----------------------------------------------------------------------------------------------------
def create_new_hardware_set(hardware_name, capacity):
    hw_existence = get_hardware_id(hardware_name)
    if(capacity>0 and hw_existence==-1): #ensure HWset has at least 1 HW AND no hardware duplication
        project_dictionary={}
        post ={"hardware_name": hardware_name, "capacity": capacity, "availability": capacity, "project":project_dictionary}
        hardware_set.insert_one(post)
        return 0
    else:
        return -1  #error_msg="Invalid Input: Capacity is < 1 or Hardware already exist."
#create_new_hardware_set(hardware_name="test1", capacity=100)    #DEMO


#set & get availability-------------------------------------------------------------------------------------------------
def get_hardware_availability(hardware_name):
    availability = hardware_set.find_one({"hardware_name": hardware_name})["availability"]
    #print("availability: ", availability)    #DEBUG
    return availability
get_hardware_availability("test1")  #DEMO

def set_hardware_availability(hardware_name, amt_of_hardware): # '+' for addition '-' for deletion ; Note: amt_of_hardware != total 
    old_availability = get_hardware_availability(hardware_name)  #availability before checkin
    capacity = hardware_set.find_one({"hardware_name":hardware_name})["capacity"]
    if( (old_availability + amt_of_hardware < 0) or (old_availability + amt_of_hardware > capacity)) : #check '< 0' or 'exceed capacity'
        #error_msg="Invalid input: hardware deletion or addition amount exceeds limit."
        #print(error_msg) #DEBUG
        return -1  
    new_availability = old_availability + amt_of_hardware  #availability after checkin

    hardware_set.update_one({"hardware_name":hardware_name,},{"$set":{"availability":new_availability}})
    return 0 #return 0 if success
#set_hardware_availability("test1",-20) #DEMO



#set & get capacity-------------------------------------------------------------------------------------------------
def get_hardware_capacity(hardware_name):
    capacity = hardware_set.find_one({"hardware_name": hardware_name})["capacity"]
    #print("capacity: ", capacity)    #DEBUG
    return capacity
#get_hardware_capacity("test1")  #DEMO

def set_hardware_capacity(hardware_name,amt_of_hardware): # '+' for addition '-' for deletion ; Note: amt_of_hardware != total 
    cur_availability = get_hardware_availability(hardware_name)
    if(amt_of_hardware < (cur_availability*-1)): #max # of reduction == cur_availability
        print("error: reduction exceed limit")
        return -1

    old_capacity = get_hardware_capacity(hardware_name)
    new_capacity = old_capacity + amt_of_hardware
    hardware_set.update_one({"hardware_name":hardware_name,},{"$set":{"capacity":new_capacity}})
    set_hardware_availability(hardware_name,amt_of_hardware) #update availability
    return 0
    
#set_hardware_capacity("test1",-280) #DEMO


#set & get project-----------------------------------------------------------------------------------------------------
def get_hardware_projectlist(hardware_name):
    hardware_existence = get_hardware_id(hardware_name)
    if (hardware_existence!=-1): #if hardware exist
        project_list = hardware_set.find_one({"hardware_name": hardware_name})["project"]
        if project_list == {}: #empty list
            #print("project list is empty!")
            return -1 #empty project list
        else:
            #print("project: ", project_list)    #DEBUG
            return project_list  # return a list of project ids that checked out this hardware
    else:
        #print("hardware does not exist!")
        return -1 #hardware doesn't exist
#get_hardware_projectlist("test1")  #DEMO
 

def get_hardware_proj_checkout(hardware_name,project_id):      #other()
    project_list = get_hardware_projectlist(hardware_name) 
    if(project_list != -1 ): #project list exist
        try:
            checkedout_amt = project_list[str(project_id)] #tricky bug: key must be string
        except KeyError:
            #print("this project does not exist")
            return -1
        else:
            #print("checkedout_amt: ",checkedout_amt) #debug
            return checkedout_amt
    else:
         return -1 #hardware doesn't exist OR project_list is empty
#get_hardware_proj_checkout("test1",8765)


#CALL this function in check in/out(); Dont call this directly, lack logic check
def set_hardware_project(hardware_name,project_id,hardware_amt):
    checked_out = get_hardware_proj_checkout(hardware_name,project_id)
    project_dict= get_hardware_projectlist(hardware_name)
    
    if(checked_out !=-1): #project exist, simply update hardware_amt
        project_dict[str(project_id)] += hardware_amt
        #print("check out: ", project_dict[str(project_id)])
    else: #Either hardware OR this project doesn't exist
        # project_dict = {str(project_id):hardware_amt}
        project_dict[str(project_id)] = hardware_amt
    
    hardware_set.update_one({"hardware_name":hardware_name},{"$set":{"project":project_dict}}, upsert= True)
    return 0  
#set_hardware_project("test1",8765,55) #DEMO





#DEMOs:-----------------------------------------------------------------------------------------------------------
#create_new_hardware_set(hardware_name="test", capacity=100)   
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

#---------------------------------------#CODE FOR ANOTHER SECTION----------------------------------------------------






