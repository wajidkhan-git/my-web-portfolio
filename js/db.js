/* 
    Frontend LocalStorage Database for Wajid's Portfolio
*/

const defaultProjects = [
    {
        id: '1',
        title: 'E-Commerce Dashboard',
        category: 'mern',
        image: 'assets/profile.jpg',
        github: '#',
        demo: '#'
    },
    {
        id: '2',
        title: 'Real Estate Portal',
        category: 'react',
        image: 'assets/profile.jpg',
        github: '#',
        demo: '#'
    },
    {
        id: '3',
        title: 'Task Management App',
        category: 'fullstack',
        image: 'assets/profile.jpg',
        github: '#',
        demo: '#'
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
    localStorage.setItem('wajid_portfolio_projects', JSON.stringify(projects));
}

function addProject(project) {
    const projects = getProjects();
    project.id = Date.now().toString(); // Generate unique ID
    projects.push(project);
    saveProjects(projects);
}

function updateProject(id, updatedData) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updatedData };
        saveProjects(projects);
    }
}

function deleteProject(id) {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id !== id);
    saveProjects(filtered);
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
    localStorage.setItem('wajid_portfolio_skills', JSON.stringify(skills));
}

function addSkill(skill) {
    const skills = getSkills();
    skill.id = Date.now().toString();
    skills.push(skill);
    saveSkills(skills);
}

function updateSkill(id, updatedData) {
    const skills = getSkills();
    const index = skills.findIndex(s => s.id === id);
    if (index !== -1) {
        skills[index] = { ...skills[index], ...updatedData };
        saveSkills(skills);
    }
}

function deleteSkill(id) {
    const skills = getSkills();
    const filtered = skills.filter(s => s.id !== id);
    saveSkills(filtered);
}
