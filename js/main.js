document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Loading Screen & Welcome Popup
       ========================================================================== */
    const loadingScreen = document.getElementById('loading-screen');
    const welcomePopup = document.getElementById('welcome-popup');
    const closePopupBtn = document.querySelector('.close-popup');

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Show welcome popup after loader fades out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Only show if it's the user's first time (using sessionStorage for this demo)
            if (!sessionStorage.getItem('welcomeShown')) {
                welcomePopup.classList.add('show');
                sessionStorage.setItem('welcomeShown', 'true');
            }
        }, 500); // match transition time
    }, 2000);

    // Close Popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            welcomePopup.classList.remove('show');
        });
    }

    // Close popup when clicking outside
    welcomePopup.addEventListener('click', (e) => {
        if (e.target === welcomePopup) {
            welcomePopup.classList.remove('show');
        }
    });

    /* ==========================================================================
       Header & Navigation
       ========================================================================== */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active nav link on scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    /* ==========================================================================
       Typing Animation (Hero Section)
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const roles = ["JavaScript Developer", "React.js Developer", "Node.js Developer", "Express.js Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typingText) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 2500); // Start after loading screen

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-card');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            
            // Special handling for skill cards to trigger progress bar animation
            if (entry.target.classList.contains('skill-card')) {
                entry.target.classList.add('animated');
            }
            
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Portfolio Filtering
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Trigger reflow for animation
                    item.style.animation = 'none';
                    item.offsetHeight; /* trigger reflow */
                    item.style.animation = null; 
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       Currency Toggle Logic
       ========================================================================== */
    const currencyToggle = document.getElementById('currency-toggle');
    const labelUsd = document.getElementById('label-usd');
    const labelPkr = document.getElementById('label-pkr');
    
    // Base prices in USD (matches HTML data-placeholder defaults)
    const prices = [199, 399, 699, 1499];
    const conversionRate = 280; // approximate USD to PKR
    
    if (currencyToggle) {
        currencyToggle.addEventListener('change', () => {
            const priceElements = document.querySelectorAll('.pricing-card .amount');
            const currencyElements = document.querySelectorAll('.pricing-card .currency');
            
            if (currencyToggle.checked) {
                // PKR
                labelUsd.classList.remove('active');
                labelPkr.classList.add('active');
                
                priceElements.forEach((el, index) => {
                    const pkrPrice = prices[index] * conversionRate;
                    el.innerText = pkrPrice.toLocaleString();
                });
                currencyElements.forEach(el => el.innerText = 'Rs');
            } else {
                // USD
                labelPkr.classList.remove('active');
                labelUsd.classList.add('active');
                
                priceElements.forEach((el, index) => {
                    el.innerText = prices[index];
                });
                currencyElements.forEach(el => el.innerText = '$');
            }
        });
    }

    /* ==========================================================================
       Contact Form Submission (Mockup)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                btn.style.background = '#10B981'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
