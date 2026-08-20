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

    const deleteBtns = document.querySelectorAll('.action-btn.delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(confirm("Are you sure you want to delete this item? (This is a mock action)")) {
                showToast('Item deleted successfully! (Mock)', 'success');
                // Mock remove row if in a table
                const row = this.closest('tr');
                if(row) row.style.display = 'none';
                
                // Mock remove item if in skills list
                const item = this.closest('.skill-edit-item');
                if(item) item.style.display = 'none';
            }
        });
    });

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
