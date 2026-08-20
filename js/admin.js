document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Login Screen Mockup
       ========================================================================== */
    const loginForm = document.getElementById('login-form');
    const loginOverlay = document.getElementById('admin-login');
    const dashboardLayout = document.getElementById('admin-dashboard');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.login-btn');
            const usernameInput = document.getElementById('admin-username').value;
            const passwordInput = document.getElementById('admin-password').value;
            
            if (usernameInput !== 'wajidullah' || passwordInput !== '01837!wajid') {
                showToast('Invalid username or password!', 'error');
                return;
            }

            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
            
            // Mock authentication delay
            setTimeout(() => {
                loginOverlay.style.display = 'none';
                dashboardLayout.style.display = 'flex';
                showToast('Welcome back, Wajid!', 'success');
            }, 1000);
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            dashboardLayout.style.display = 'none';
            loginOverlay.style.display = 'flex';
            
            // Reset login form button
            const btn = loginForm.querySelector('.login-btn');
            btn.innerHTML = 'Login to Dashboard';
            loginForm.reset();
        });
    }

    /* ==========================================================================
       Sidebar Navigation & Mobile Menu
       ========================================================================== */
    const navItems = document.querySelectorAll('.nav-item');
    const adminSections = document.querySelectorAll('.admin-section');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    const headerTitle = document.querySelector('.admin-header h2');

    // Section Switching
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            adminSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding section
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Update header title based on sidebar text
            headerTitle.textContent = item.textContent.trim();

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Mobile Sidebar Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    /* ==========================================================================
       Toast Notification System
       ========================================================================== */
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
        
        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);
        
        // Trigger reflow
        toast.offsetHeight;
        
        // Slide in
        toast.classList.add('show');
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // Wait for transition
        }, 3000);
    }

    // Attach mock save functionality to all save buttons
    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalHtml = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHtml;
                this.disabled = false;
                showToast('Changes saved successfully! (Mock)', 'success');
            }, 800);
        });
    });
    
    const saveInlineBtns = document.querySelectorAll('.save-inline');
    saveInlineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Item updated successfully! (Mock)', 'success');
        });
    });

    /* ==========================================================================
       Portfolio CRUD Operations (LocalStorage)
       ========================================================================== */
    const adminPortfolioTable = document.getElementById('admin-portfolio-table-body');
    const projectModal = document.getElementById('project-modal');
    const projectForm = document.getElementById('project-form');
    const projectModalTitle = document.getElementById('project-modal-title');
    const closeModalBtn = projectModal.querySelector('.close-modal');

    function renderAdminProjects() {
        if (!adminPortfolioTable) return;
        
        const projects = getProjects();
        adminPortfolioTable.innerHTML = '';
        
        projects.forEach(project => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${project.image}" alt="Img" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;"></td>
                <td>${project.title}</td>
                <td>${project.category}</td>
                <td>
                    <button class="action-btn edit" data-id="${project.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-id="${project.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            adminPortfolioTable.appendChild(tr);
        });

        // Re-bind Edit Buttons
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const project = getProjects().find(p => p.id === id);
                if (project) {
                    document.getElementById('project-id').value = project.id;
                    document.getElementById('project-title').value = project.title;
                    document.getElementById('project-category').value = project.category;
                    document.getElementById('project-image').value = project.image;
                    const preview = document.getElementById('project-image-preview');
                    if (preview) preview.src = project.image || 'assets/profile.jpg';
                    document.getElementById('project-github').value = project.github || '';
                    document.getElementById('project-demo').value = project.demo || '';
                    
                    projectModalTitle.textContent = 'Edit Project';
                    projectModal.style.display = 'flex';
                }
            });
        });

        // Re-bind Delete Buttons
        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                if(confirm("Are you sure you want to delete this project?")) {
                    const id = this.getAttribute('data-id');
                    deleteProject(id);
                    showToast('Project deleted successfully!', 'success');
                    renderAdminProjects();
                }
            });
        });
    }

    // Initialize Render
    renderAdminProjects();

    // Open Add Project Modal
    const addProjectBtn = document.querySelector('#manage-portfolio .card-header .btn-primary');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            projectForm.reset();
            document.getElementById('project-id').value = '';
            document.getElementById('project-image').value = 'assets/profile.jpg';
            const preview = document.getElementById('project-image-preview');
            if (preview) preview.src = 'assets/profile.jpg';
            projectModalTitle.textContent = 'Add New Project';
            projectModal.style.display = 'flex';
        });
    }

    // Close Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.style.display = 'none';
        });
    }
    
    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Handle Form Submit
    const imageFileInput = document.getElementById('project-image-file');
    const imagePreview = document.getElementById('project-image-preview');
    const imageUrlInput = document.getElementById('project-image');

    if (imageFileInput) {
        imageFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64String = event.target.result;
                    imagePreview.src = base64String;
                    imageUrlInput.value = base64String;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', function() {
            imagePreview.src = this.value || 'assets/profile.jpg';
        });
    }

    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = document.getElementById('project-id').value;
            const projectData = {
                title: document.getElementById('project-title').value,
                category: document.getElementById('project-category').value,
                image: document.getElementById('project-image').value,
                github: document.getElementById('project-github').value,
                demo: document.getElementById('project-demo').value
            };
            
            if (id) {
                updateProject(id, projectData);
                showToast('Project updated successfully!', 'success');
            } else {
                addProject(projectData);
                showToast('Project added successfully!', 'success');
            }
            
            projectModal.style.display = 'none';
            projectModal.style.display = 'none';
            renderAdminProjects();
        });
    }

    /* ==========================================================================
       Manage Skills (CRUD)
       ========================================================================== */
    const adminSkillsTable = document.getElementById('admin-skills-table-body');
    const skillModal = document.getElementById('skill-modal');
    const skillModalTitle = document.getElementById('skill-modal-title');
    const closeSkillModalBtn = document.getElementById('close-skill-modal');
    const skillForm = document.getElementById('skill-form');

    function renderAdminSkills() {
        if (!adminSkillsTable) return;
        
        const skills = getSkills();
        adminSkillsTable.innerHTML = '';
        
        skills.forEach(skill => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${skill.name}</td>
                <td>${skill.percent}%</td>
                <td><i class="${skill.icon}"></i> ${skill.icon}</td>
                <td>
                    <button class="action-btn edit skill-edit-btn" data-id="${skill.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete skill-delete-btn" data-id="${skill.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            adminSkillsTable.appendChild(tr);
        });

        // Re-bind Edit Buttons
        document.querySelectorAll('.skill-edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const skill = getSkills().find(s => s.id === id);
                if (skill) {
                    document.getElementById('skill-id').value = skill.id;
                    document.getElementById('skill-name').value = skill.name;
                    document.getElementById('skill-percent').value = skill.percent;
                    document.getElementById('skill-icon').value = skill.icon;
                    
                    skillModalTitle.textContent = 'Edit Skill';
                    skillModal.style.display = 'flex';
                }
            });
        });

        // Re-bind Delete Buttons
        document.querySelectorAll('.skill-delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if(confirm("Are you sure you want to delete this skill?")) {
                    const id = this.getAttribute('data-id');
                    deleteSkill(id);
                    showToast('Skill deleted successfully!', 'success');
                    renderAdminSkills();
                }
            });
        });
    }

    renderAdminSkills();

    // Open Add Skill Modal
    const addSkillBtn = document.getElementById('add-skill-btn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            skillForm.reset();
            document.getElementById('skill-id').value = '';
            skillModalTitle.textContent = 'Add New Skill';
            skillModal.style.display = 'flex';
        });
    }

    // Close Skill Modal
    if (closeSkillModalBtn) {
        closeSkillModalBtn.addEventListener('click', () => {
            skillModal.style.display = 'none';
        });
    }
    
    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target === skillModal) {
            skillModal.style.display = 'none';
        }
    });

    // Handle Form Submit for Skill
    if (skillForm) {
        skillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = document.getElementById('skill-id').value;
            const skillData = {
                name: document.getElementById('skill-name').value,
                percent: parseInt(document.getElementById('skill-percent').value),
                icon: document.getElementById('skill-icon').value
            };
            
            if (id) {
                updateSkill(id, skillData);
                showToast('Skill updated successfully!', 'success');
            } else {
                addSkill(skillData);
                showToast('Skill added successfully!', 'success');
            }
            
            skillModal.style.display = 'none';
            renderAdminSkills();
        });
    }

    /* ==========================================================================
       File Upload Previews (Mockup)
       ========================================================================== */
    function setupUploadArea(areaId, fileInputId, previewId, iconClass, defaultText) {
        const area = document.getElementById(areaId);
        const fileInput = document.getElementById(fileInputId);
        const preview = document.getElementById(previewId);

        if (!area || !fileInput || !preview) return;

        // Click to upload
        area.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and Drop
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });

        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });

        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        });

        // File Selection
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                handleFile(e.target.files[0]);
            }
        });

        function handleFile(file) {
            // Very basic mockup preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-height: 150px; border-radius: 8px;">
                                         <p class="text-small text-muted mt-2">${file.name}</p>`;
                }
                reader.readAsDataURL(file);
            } else {
                // For CV/PDFs
                preview.innerHTML = `<i class="fas fa-file-alt upload-icon highlight-icon"></i>
                                     <p><strong>${file.name}</strong> selected</p>
                                     <p class="text-small text-muted">Ready to publish</p>`;
            }
        }
    }

    // Initialize Upload Areas
    setupUploadArea('logo-upload-area', 'logo-file', 'logo-preview');
    setupUploadArea('profile-upload-area', 'profile-file', 'profile-preview');
    setupUploadArea('cv-upload-area', 'cv-file', 'cv-preview');

});
