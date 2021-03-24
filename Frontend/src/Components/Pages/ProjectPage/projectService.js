

const KEYS ={
    projects:'projects',
    projectId:'projectId'
}

export function insertProject(data) {
    let projects=getAllProjects();
    data['id'] = generateProjectId()
    projects.push(data)
    localStorage.setItem(KEYS.projects,JSON.stringify(projects))
}

export function updateProject(data) {
    let projects = getAllProjects();
    let recordIndex = projects.findIndex(x => x.id == data.id);
    projects[recordIndex] = { ...data }
    localStorage.setItem(KEYS.projects, JSON.stringify(projects));
}

export function generateProjectId() {
   // check if item already occupied
    if (localStorage.getItem(KEYS.projectId) == null)
        localStorage.setItem(KEYS.projectId, '0')
        // retrieve id
    var id = parseInt(localStorage.getItem(KEYS.projectId))
        // increment id
    localStorage.setItem(KEYS.projectId, (++id).toString())
    return id;
}

export function getAllProjects() {
     // check if item already occupied
    if (localStorage.getItem(KEYS.projects) == null)
        localStorage.setItem(KEYS.projects, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.projects));
}
