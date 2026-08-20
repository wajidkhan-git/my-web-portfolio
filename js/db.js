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
