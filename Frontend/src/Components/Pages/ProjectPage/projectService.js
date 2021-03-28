

const KEYS ={
    projects:'projects',
    projectId:'projectId'
}

export function insertProject(data) {   //--> user.py     add_projects(username: str, project_id: str)
    let projects=getAllProjects();
    data['id'] = generateProjectId()  //--> MongoDB auto generates it
    projects.push(data)
    localStorage.setItem(KEYS.projects,JSON.stringify(projects))
}

export function updateProject(data) { //handle_set_project_name(project_id, project_name) && handle_status(status, project_id) 
                                            //&& missing 'comment' handeling function （NA for now.. maybe phase 3)
    let projects = getAllProjects();
    let recordIndex = projects.findIndex(x => x.id == data.id);  //find proj id in db
    projects[recordIndex] = { ...data }
    localStorage.setItem(KEYS.projects, JSON.stringify(projects));
}

//Delete
export function deleteProject(id) {  // No delete function in .py?
    let projects = getAllProjects();
    projects = projects.filter(x => x.id != id)
    localStorage.setItem(KEYS.projects, JSON.stringify(projects));
}


export function generateProjectId() { //--> MongoDB auto generates it
   // check if item already occupied
    if (localStorage.getItem(KEYS.projectId) == null)
        localStorage.setItem(KEYS.projectId, '0')
        // retrieve id
    var id = parseInt(localStorage.getItem(KEYS.projectId))
        // increment id
    localStorage.setItem(KEYS.projectId, (++id).toString())
    return id;
}

export function getAllProjects() {  //--> user.py  getProjectList()?? unnecessary, 
     // check if item already occupied
    if (localStorage.getItem(KEYS.projects) == null)
        localStorage.setItem(KEYS.projects, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.projects));
}
