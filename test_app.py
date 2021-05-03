import pytest
import pytest_check as check
import json
import app
from random import randint


@pytest.fixture
def client():
    # db_fd, flaskr.app.config['DATABASE'] = tempfile.mkstemp()
    myapp = app.create_app()
    myapp.config['TESTING'] = True

    with myapp.test_client() as client:
        yield client

# def test_hardware_module_second(client):
#     rv = client.get('/hardware_module')
#     # assert b'hardware_module' in rv.data
#     check.equal(b'hardware_module', rv.data)


def test_hardware_module_hwtable(client):
    rv = get_hwtable(client)
    data= rv.get_json(force = True)
    # check.equal(data['HW_ava'][1], 187)



def test_hardware_module_get_projects(client):
    rv_login = login(client, 'test', '123456')
    data_login= rv_login.get_json(force = True)
    # successfully login
    check.equal(data_login['message'], 'success')
    # test get projecs info on hardware page
    rv_proj = get_projects(client)
    data_proj = rv_proj.get_json(force = True)
    check.equal(data_proj['message'], 'success')
    for i in range(len(data_proj)):
        check.is_in('testProj', data_proj['projects'][i]['name'])


def test_hardware_module_checkout(client):
    data_login = login(client, 'test', '123456').get_json(force = True)
    # data_login= rv_login
    # test successfully login
    check.equal(data_login['message'], 'success')
    # test get projecs info on hardware page
    data_proj = get_projects(client).get_json(force = True)
    check.equal(data_proj['message'], 'success')

    # randomly pick up a project and test chekout 
    projects = data_proj['projects']
    i = randint(0, len(projects)-1)
    proj_id = projects[i]['id']
    # get hwtable
    hwtable = get_hwtable(client).get_json(force = True)
    # randomly pick up a HWset to checkout
    while True:
        hw_set_idx = randint(0, len(hwtable['HW_ava'])-1)
        if hwtable['HW_ava'][hw_set_idx] >0:
            break
    HW_id = hwtable['HW_id'][hw_set_idx]
    # record orignal hardware amount for both HWSet collection and project collection
    original_HWSet_ava= hwtable['HW_ava'][hw_set_idx]
    original_HW_use = 0
    HW_info_list = projects[i]['hardware']
    for each in HW_info_list:
        if HW_id == each['HW_id']:
            original_HW_use = each['HW_use']
            break
    # randomly pick up an amount to checkout this HWSet
    checkout_amount = randint(0, hwtable['HW_ava'][hw_set_idx])
    # checkout
    checkout_dict = {}
    checkout_dict[HW_id] = -checkout_amount
    
    json.dumps({'project_id': proj_id, 'update': checkout_dict })
    data_checkin = client.post('/check', data =json.dumps({'project_id': proj_id, 'update': checkout_dict }) ).get_json(force = True)
    check.equal(data_checkin['message'], 'success')

    # test if the change in Hardware equals the change of HWSet info
    new_HW_ava = get_hwtable(client).get_json(force = True)['HW_ava'][hw_set_idx]
    check.equal(-checkout_amount,new_HW_ava-original_HWSet_ava)
    # test if the change in hardware amount in the projectsinfo equals the change in project info
    HW_info_list = get_projects(client).get_json(force = True)['projects'][i]["hardware"]
    new_HW_use = 0
    for each in HW_info_list:
        if HW_id == each['HW_id']:
            new_HW_use = each['HW_use']
            break
    check.equal(checkout_amount, new_HW_use- original_HW_use)



def test_hardware_module_checkin(client):
    data_login = login(client, 'test', '123456').get_json(force = True)
    # data_login= rv_login
    # test successfully login
    check.equal(data_login['message'], 'success')
    # test get projecs info on hardware page
    data_proj = get_projects(client).get_json(force = True)
    check.equal(data_proj['message'], 'success')

    # randomly pick up a project which has HW in use and test checkin
    projects = data_proj['projects']
    proj_id =''
    HW_id= ''
    original_HW_use =0
    find = False
    i = -1 # index of the selected project in the projects list associated for that user
    for proj in projects:
        i = i+1
        for hw in proj['hardware']:
            if hw['HW_use'] >0:
                original_HW_use = hw['HW_use']
                # get the proj_id
                proj_id = proj['id']
                # get the HW_id
                HW_id = hw['HW_id']
                find = True
                break
        if find:
            break
    
    if proj_id == '':
        return

    # randomly pick up a checkin ammount to checkin
    checkin_amount = randint(0, original_HW_use)
    # get original HW_ava
    hwtable = client.get('/hardware', follow_redirects=True).get_json(force = True)
    hw_set_idx = hwtable['HW_id'].index(HW_id)
    original_HW_ava = hwtable['HW_ava'][hw_set_idx]

    # check in hardware
    checkin_dict = {}
    checkin_dict[HW_id] = checkin_amount
    
    data_checkin = client.post('/check', data =json.dumps({'project_id': proj_id, 'update': checkin_dict }) ).get_json(force = True)
    check.equal(data_checkin['message'], 'success')

    # test if the change in Hardware equals the change of HWSet info
    new_HW_ava = get_hwtable(client).get_json(force = True)['HW_ava'][hw_set_idx]
    check.equal(checkin_amount,new_HW_ava-original_HW_ava)
    # test if the change in Hardware equals the change in project info
    HW_info_list = get_projects(client).get_json(force = True)['projects'][i]["hardware"]
    new_HW_use = 0
    for each in HW_info_list:
        if HW_id == each['HW_id']:
            new_HW_use = each['HW_use']
            break
    check.equal(-checkin_amount, new_HW_use- original_HW_use)




def get_hwtable(client):
    return client.get('/hardware', follow_redirects=True)
    
def get_projects(client):
    return client.get('/check', follow_redirects=True)

def login(client, username, password):
    req_login = json.dumps({'username': username, 'password': password})
    return client.post('/login', data=req_login, follow_redirects=True)

def logout(client, username, password):
    req_login = json.dumps({'username': username, 'password': password})
    # return client.post('/login', data=dict(username=username,
    #     password=password), follow_redirects=True)
    return client.post('/logout', data=req_login, follow_redirects=True)