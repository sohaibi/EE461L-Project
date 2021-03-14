#example use:
#hardware_set0 = Hardware_set(0,capacity) # initially capacity == availability
#hardware_set1 = Hardware_set(1,capacity)
#hardware_set1.hardware_checkin(project_8, checkedout==5,checkin==2)

class Hardware_set():
    def __init__(self,id, capacity):
        self.__id = id
        self.__capacity = capacity #total # of hardwares
        self.__availability = capacity #=capacity-checked out
        self.__project = [] #project list initially empty

#set & get id
    def set_hardware_id(self,id): 
#?? is this necessary since id is set when creating the hardware object?
#if updating id is needed, check if desire id exist before calling this function
        self.__id=id
        return

    def get_hardware_id(self):
        return self.__id


#set & get capacity
    def set_hardware_capacity(self,capacity):
        self.__capacity =capacity
        return

    def get_hardware_capacity(self):
        return self.__capacity


#set & get availability
    def set_hardware_availability(self,availability):
#?? Will we ever set the avialbility directly?
#?? Should it only change when check in/out?
        self.__availability = availability
        return

    def get_hardware_availability(self):
        return self.__availability


#set & get project
    def set_hardware_project(self,project_id):
#?? is this redundent since proj is added in hardware_checkin()??
        self.__project.append(project_id) #appened project ID to hardware's project list
        return 

    def get_hardware_project(self):
        return self.__project # return a list of project ids that checked out this hardware


#check in/out hardwares
    def hardware_checkin(self,project_id, checkedout_amt,checkin_amount):
        if(checkedout_amt >= checkin_amount):   #check valid check in amt
           self.__availability+= checkin_amount
        elif(checkedout_amt == checkin_amount): 
            self.__project.remove(project_id) #if returning all hardwares checked out, remove this proj id from hardware's proj list
        return
    def hardware_checkout(self,project_id,checkout_amount):
        if ( self.__availability >= checkout_amount): #check hardware amount is available
            self.__project.append(project_id) #appened project ID to hardware's project list
            self.__availability-= checkout_amount
        return