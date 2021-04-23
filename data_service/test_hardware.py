import pytest
import pytest_check as check
from bson import ObjectId
from . import hardware
from random import randint

# print(hardware.get_HWSet_collection_info())
# print(randint(-pow(2,32), pow(2,31)-1))

class TestHardware:
    def test_getters(self):
        HWSet_info_list = hardware.get_HWSet_collection_info()
        for HW in HWSet_info_list:
            check.equal(hardware.get_HWSet_name(str(HW['_id'])), HW['HWSet_name'])
            check.equal(hardware.get_HWSet_availability(str(HW['_id'])), HW['availability'])
            check.equal(hardware.get_HWSet_capacity(str(HW['_id'])), HW['capacity'])
    

    @pytest.mark.parametrize("HWSet_name, capacity", [("name1",100), ("name2",200), ("name3",300), ("name4", -10)])
    def test_create_new_HWSet(self, HWSet_name, capacity):
        id = hardware.create_new_HWSet(HWSet_name, capacity) 
        if capacity < 0 :
            check.equal(id, -1)
        else:
            check.equal(hardware.get_HWSet_name(id), HWSet_name)
            check.equal(hardware.get_HWSet_capacity(id), capacity)
            check.equal(hardware.get_HWSet_availability(id), capacity)
            hardware.delete_HWSet(id)  # delete the valid temp HWSet


    @pytest.mark.parametrize("times", range(3))
    def test_set_HWSet_availability(self, times):
        id = hardware.create_new_HWSet("tempTestHWSet", 100)  # create a temp HWSet
        original_availability = hardware.get_HWSet_availability(id)
        original_capacity = hardware.get_HWSet_capacity(id)
        amt_of_hardware = randint(-2*original_availability, original_capacity - original_availability)  # generate random number of changed amount
        print(amt_of_hardware)
        if original_availability + amt_of_hardware < 0:
            check.equal(hardware.set_HWSet_availability(id, amt_of_hardware), -2)  # set random changed availability amount
        else:
            check.equal(hardware.set_HWSet_availability(id, amt_of_hardware), original_availability + amt_of_hardware)
        hardware.delete_HWSet(id) #delete temp HWSet

    @pytest.mark.parametrize("times", range(3))
    def test_set_HWSet_capacity(self, times):
        id = hardware.create_new_HWSet("tempTestHWSet", 100)  # create a temp HWSet
        original_availability = hardware.get_HWSet_availability(id)
        original_capacity = hardware.get_HWSet_capacity(id)
        amt_of_hardware = randint(-original_capacity, pow(2,31)-1)  # generate random number of changed amount
        if original_availability + amt_of_hardware < 0:
            check.equal(hardware.set_HWSet_capacity(id, amt_of_hardware), -2)  # set random changed availability amount
        else:
            check.equal(hardware.set_HWSet_availability(id, amt_of_hardware), original_availability + amt_of_hardware)
            check.equal(hardware.set_HWSet_capacity(id, amt_of_hardware), original_capacity + amt_of_hardware)
        hardware.delete_HWSet(id) #delete temp HWSet