/* 
    Frontend LocalStorage Database for Wajid's Portfolio
*/

const defaultProjects = [
    {
        id: '1',
        title: 'Guest posting portfolio',
        category: 'frontend',
        image: 'assets/guestpost (1).png',
        github: 'https://github.com/wajidkhan-git/',
        demo: 'https://wajidullah-guestposts.vercel.app/'
    },
    {
        id: '2',
        title: 'salon portfolio',
        category: 'frontend',
        image: 'assets/salon.png',
        github: 'https://github.com/wajidkhan-git/',
        demo: 'https://wajidkhan-git.github.io/salon-portfolio/'
    },
    {
        id: '3',
        title: 'web portfolio',
        category: 'frontend',
        image: 'assets/web port.png',
        github: 'https://github.com/wajidkhan-git/',
        demo: 'https://wajidkhan-git.github.io/web-portfolio/'
    }
];

function getProjects() {
    const projects = localStorage.getItem('wajid_portfolio_projects');
    if (projects) {
        return JSON.parse(projects);
    }
    // If empty, initialize with default
    localStorage.setItem('wajid_portfolio_projects', JSON.stringify(defaultProjects));
    return defaultProjects;
}

function saveProjects(projects) {
    try {
        localStorage.setItem('wajid_portfolio_projects', JSON.stringify(projects));
        return true;
    } catch (e) {
        console.error("Storage Error:", e);
        alert("Local storage is full! Please upload a smaller image.");
        return false;
    }
}

function addProject(project) {
    const projects = getProjects();
    project.id = Date.now().toString(); // Generate unique ID
    projects.push(project);
    return saveProjects(projects);
}

function updateProject(id, updatedData) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updatedData };
        return saveProjects(projects);
    }
    return false;
}

function deleteProject(id) {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id !== id);
    return saveProjects(filtered);
}

/* 
    Skills Database Logic
*/

const defaultSkills = [
    { id: '1', name: 'HTML & CSS', percent: 90, icon: 'fas fa-code' },
    { id: '2', name: 'JavaScript', percent: 85, icon: 'fab fa-js' },
    { id: '3', name: 'React.js', percent: 80, icon: 'fab fa-react' },
    { id: '4', name: 'Node.js', percent: 75, icon: 'fab fa-node-js' }
];

function getSkills() {
    const skills = localStorage.getItem('wajid_portfolio_skills');
    if (skills) {
        return JSON.parse(skills);
    }
    localStorage.setItem('wajid_portfolio_skills', JSON.stringify(defaultSkills));
    return defaultSkills;
}

function saveSkills(skills) {
    try {
        localStorage.setItem('wajid_portfolio_skills', JSON.stringify(skills));
        return true;
    } catch (e) {
        console.error("Storage Error:", e);
        alert("Local storage is full!");
        return false;
    }
}

function addSkill(skill) {
    const skills = getSkills();
    skill.id = Date.now().toString();
    skills.push(skill);
    return saveSkills(skills);
}

function updateSkill(id, updatedData) {
    const skills = getSkills();
    const index = skills.findIndex(s => s.id === id);
    if (index !== -1) {
        skills[index] = { ...skills[index], ...updatedData };
        return saveSkills(skills);
    }
    return false;
}

function deleteSkill(id) {
    const skills = getSkills();
    const filtered = skills.filter(s => s.id !== id);
    return saveSkills(filtered);
}
