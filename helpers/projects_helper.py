import sys
sys.path.append("..")
from data_service import project, user


def delete_project(project_id : str, user_id : str):  
    # delete from user proj list and project db
    # first to check if all the hardware has been returned
    hardware_set_dict = project.handle_get_project_info(project_id)[
        "hardware_set_dict"]
    # if all the hardware has been returned, delete this project from user's projects list directly
    if len(hardware_set_dict) > 0:
        # check if this user is the only one person to manage this project
        team_list = project.handle_get_project_info(project_id)['team']
        if len(team_list) == 1:
            return jsonify({'message': 'As the only manager for this project please return the hardware before delete it. This project will be permanently deleted afterwards.'})
    # remove project_id from user's projects list
    user.delete_projects(user_id, project_id)
    # remove member from project team
    project.handle_update_project_team(project_id, user_id, "-")
    team_list = project.handle_get_project_info(project_id)['team']
    # delete one project only when no one is managing that, and all the HW has been returned
    if len(team_list) == 0:
        project.delete_project(project_id)
    # print("succefully deleted!")


# delete_project("6077d56b9dd9b77af0279d65", "604e7d148aaacd6a12855cbb")


def create_project(project_name : str, user_id : str, comment:str): 
    proj_id = project.handle_project_creation(
    project_name, user_id, comment)  # create new proj
    # also need to add proj_id to user's project list!!
    user.add_projects(user_id, proj_id)


def update_project(project_id : str, project_name : str, comment:str): 
    project.handle_update_project(project_id, project_name, comment)


def join_project(project_id : str, user_id : str): 
    # print(ObjectId.is_valid(project_id))
    if (not ObjectId.is_valid(project_id)) or (not project.handle_get_project_info(project_id)):
        return jsonify({'message': 'Project ID does not exist!'})
    # if project does exist
    user.add_projects(user_id, project_id)
    project.handle_update_project_team(project_id, user_id, "+")