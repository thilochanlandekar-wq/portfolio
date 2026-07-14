/**
 * TRILOCHAN LANDEKAR PORTFOLIO INTERACTION SYSTEM
 * Contains: Particle Canvas Background, Typewriter Animation, Scroll Progress,
 * Section Scroll Reveal, Project Filters, Project Modals, Form Submissions, and Resume Mock Download.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. SCROLL PROGRESS & HEADER SCROLL STATE
    // ----------------------------------------------------
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0 && scrollProgress) {
            const progress = (window.pageYOffset / totalScroll) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Header shrinking
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top appearance
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // 2. MOBILE MENU DRAWER
    // ----------------------------------------------------
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileNavToggle.classList.toggle('active');
            
            // Morph the hamburger icon lines
            const lineTop = document.getElementById('line-top');
            const lineMid = document.getElementById('line-mid');
            const lineBot = document.getElementById('line-bot');
            
            if (navMenu.classList.contains('open')) {
                if (lineTop) {
                    lineTop.setAttribute('transform', 'rotate(45 12 12) translate(0, 0)');
                    lineTop.setAttribute('y1', '12');
                    lineTop.setAttribute('y2', '12');
                }
                if (lineMid) lineMid.style.opacity = '0';
                if (lineBot) {
                    lineBot.setAttribute('transform', 'rotate(-45 12 12) translate(0, 0)');
                    lineBot.setAttribute('y1', '12');
                    lineBot.setAttribute('y2', '12');
                }
            } else {
                if (lineTop) {
                    lineTop.removeAttribute('transform');
                    lineTop.setAttribute('y1', '6');
                    lineTop.setAttribute('y2', '6');
                }
                if (lineMid) lineMid.style.opacity = '1';
                if (lineBot) {
                    lineBot.removeAttribute('transform');
                    lineBot.setAttribute('y1', '18');
                    lineBot.setAttribute('y2', '18');
                }
            }
        });

        // Close menu when links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                // reset menu button state
                const lineTop = document.getElementById('line-top');
                const lineMid = document.getElementById('line-mid');
                const lineBot = document.getElementById('line-bot');
                if (lineTop) {
                    lineTop.removeAttribute('transform');
                    lineTop.setAttribute('y1', '6');
                    lineTop.setAttribute('y2', '6');
                }
                if (lineMid) lineMid.style.opacity = '1';
                if (lineBot) {
                    lineBot.removeAttribute('transform');
                    lineBot.setAttribute('y1', '18');
                    lineBot.setAttribute('y2', '18');
                }
            });
        });
    }

    // ----------------------------------------------------
    // 3. TYPEWRITER ANIMATION (HERO)
    // ----------------------------------------------------
    const typewriterElement = document.getElementById('typewriter-text');
    const words = [
        "Full Stack Developer",
        "React Developer",
        "Java Developer",
        "Software Engineer Student"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typewriterElement) return;
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // ----------------------------------------------------
    // 4. PARTICLE CANVAS BACKGROUND
    // ----------------------------------------------------
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.15)' : 'rgba(157, 78, 221, 0.12)';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

                // Mouse interaction - slightly push particles away
                if (mouse.x != null && mouse.y != null) {
                    let dx = this.x - mouse.x;
                    let dy = this.y - mouse.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = dx / distance;
                        let directionY = dy / distance;
                        this.x += directionX * force * 1.5;
                        this.y += directionY * force * 1.5;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {
                        let opacity = (110 - distance) / 110 * 0.05;
                        ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animate);
        }

        // Trigger Canvas Setup
        resizeCanvas();
        animate();
    }

    // ----------------------------------------------------
    // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL & NAV LINKS
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Dynamic Navigation Active links highlighting based on page URL filename
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '/' || currentPath === 'portfillo') {
        currentPath = 'index.html';
    }
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ----------------------------------------------------
    // 6. PROJECTS CLIENT-SIDE FILTERING
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Trigger a brief transition fade-in effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay hiding display until opacity transition finishes
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ----------------------------------------------------
    // 7. PROJECTS DYNAMIC MODAL RENDERER
    // ----------------------------------------------------
    const projectModal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOpenButtons = document.querySelectorAll('.open-modal-btn');

    // Database containing rich detailed information for each project
    const projectsData = {
        'ai-builder': {
            title: 'AI Website Builder',
            category: 'React & Spring Boot & Gemini AI',
            bgMesh: 'grad-mesh-ai',
            icon: '🤖💻',
            desc: 'An AI-powered website builder that generates complete web apps based on simple user instructions. This project leverages Google\'s Gemini LLM to create responsive code and page content, feeding structured JSON variables down into custom rendering subcomponents. Built to deliver modern, fast page builders without coding knowledge.',
            tech: ['React.js', 'Spring Boot', 'Java', 'MySQL', 'Gemini AI API', 'REST Client', 'CSS Grid'],
            features: [
                'Instant, custom code structural layouts',
                'Live interactive client browser preview side-by-side',
                'Theme tuning engine (Dark/Light/Cyberpunk)',
                'Database connectivity to persist site configurations',
                'Production building export in one click'
            ]
        },
        'student-sys': {
            title: 'Student Management System',
            category: 'Java, Servlets & JDBC',
            bgMesh: 'grad-mesh-student',
            icon: '🎓📊',
            desc: 'A robust web portal designed to streamline administrative capabilities for schools. Enables operators to register new profiles, log qualifications, query search parameters by department, modify records, and purge legacy profiles securely. Configured using traditional servlet patterns to showcase solid core Java lifecycles.',
            tech: ['Java Programming', 'Jakarta Servlets', 'JDBC Driver', 'MySQL Database', 'CSS Framework', 'HTTP Session Cookies'],
            features: [
                'Secure login and session authentication',
                'Dynamic CRUD transactions on database layers',
                'Intelligent filter parameters for instant searches',
                'Data caching to avoid duplicate SQL queries'
            ]
        },
        'chatbot': {
            title: 'AI ChatBot Interface',
            category: 'HTML & CSS & JavaScript',
            bgMesh: 'grad-mesh-chat',
            icon: '💬🤖',
            desc: 'A custom web chatbot application built to handle questions using clean, animated message feeds. It focuses heavily on front-end aesthetics, applying subtle slide animations, status notifications, response delays to emulate realistic thinking intervals, and flexible layout constraints to support readability on small phone displays.',
            tech: ['HTML5 Semantic tags', 'Vanilla CSS Custom Properties', 'Vanilla JavaScript', 'Local Storage Caching'],
            features: [
                'Intuitive chatting thread UI with animations',
                'Instant local responses based on standard keyphrase algorithms',
                'Session history preservation via browser LocalStorage',
                'Full fluid width adjusting on smartphones'
            ]
        },
        'portfolio': {
            title: 'Personal Developer Portfolio',
            category: 'React.js & Core CSS',
            bgMesh: 'grad-mesh-portfolio',
            icon: '✨💻',
            desc: 'This premium developer portfolio designed to present background details, certificates, completed works, and experience in a modern glassmorphic theme. Highlights responsive grid design, dynamic vector illustrations, and interactive features like custom modal controllers, typed indicators, and verification prompts.',
            tech: ['React.js Architecture', 'Core CSS Variables', 'Intersection Observer API', 'Vector SVGs'],
            features: [
                'Typing indicator on landing headings',
                'Filter grids responding to filter events instantly',
                'HTML5 background particle networking canvas',
                'Responsive contact form validation and toast banners'
            ]
        }
    };

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data || !projectModal || !modalContent) return;

        // Render project structured layout inside the modal body
        modalContent.innerHTML = `
            <div class="project-img-wrapper modal-project-img">
                <div class="project-placeholder-bg ${data.bgMesh}">
                    <span class="placeholder-icon" style="font-size: 4rem;">${data.icon}</span>
                </div>
            </div>
            <h3 class="modal-project-title">${data.title}</h3>
            <span class="modal-project-cat">${data.category}</span>
            
            <h4 class="modal-section-title">Project Overview</h4>
            <p class="modal-desc">${data.desc}</p>
            
            <h4 class="modal-section-title">Technologies Used</h4>
            <div class="modal-tech-row">
                ${data.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('')}
            </div>
            
            <h4 class="modal-section-title">Key Features</h4>
            <div class="modal-features-list">
                ${data.features.map(f => `
                    <div class="modal-feature-item">${f}</div>
                `).join('')}
            </div>

            <div class="modal-actions">
                <a href="https://github.com/thilochanlandekar-wq/sam-studio" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <span>GitHub Repo</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <button class="btn btn-outline btn-sm close-modal-action-btn">Close Window</button>
            </div>
        `;

        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Stop background scrolling

        // Attach listener to new close button inside modal actions
        const closeActionBtn = modalContent.querySelector('.close-modal-action-btn');
        if (closeActionBtn) {
            closeActionBtn.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        if (projectModal) projectModal.classList.add('hidden');
        document.body.style.overflow = ''; // Resume background scrolling
        setTimeout(() => {
            if (modalContent) modalContent.innerHTML = '';
        }, 300);
    }

    modalOpenButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay backdrop click
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // 8. TOAST NOTIFICATION SYSTEM
    // ----------------------------------------------------
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconMarkup = '✦';
        if (type === 'error') iconMarkup = '✕';
        
        toast.innerHTML = `
            <span>${iconMarkup}</span>
            <span>${message}</span>
        `;
        
        if (toastContainer) {
            toastContainer.appendChild(toast);
        } else {
            // Fallback: create temporary container or alert if not found
            let tempContainer = document.getElementById('toast-container');
            if (!tempContainer) {
                tempContainer = document.createElement('div');
                tempContainer.id = 'toast-container';
                tempContainer.className = 'toast-container';
                document.body.appendChild(tempContainer);
            }
            tempContainer.appendChild(toast);
        }

        // Clear toast after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInToast 0.4s reverse forwards';
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    // ----------------------------------------------------
    // 9. CONTACT FORM INTERACTION & SUBMIT
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-button');
    const submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;
    const submitSpinner = submitBtn ? submitBtn.querySelector('.submit-spinner') : null;
    const sendIcon = submitBtn ? submitBtn.querySelector('.send-icon') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameVal = document.getElementById('form-name').value;
            const emailVal = document.getElementById('form-email').value;
            const subjectVal = document.getElementById('form-subject').value;
            const messageVal = document.getElementById('form-message').value;

            // Trigger submit load indicators
            submitBtn.disabled = true;
            submitText.textContent = 'Sending Message...';
            submitSpinner.classList.remove('hidden');
            sendIcon.classList.add('hidden');

            // Simulate server delivery delays
            setTimeout(() => {
                // Success trigger
                showToast(`Thank you, ${nameVal}! Your message has been sent successfully.`);
                
                // Clear fields
                contactForm.reset();

                // Re-enable submit button
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitSpinner.classList.add('hidden');
                sendIcon.classList.remove('hidden');
            }, 1800);
        });
    }

    // ----------------------------------------------------
    // 10. MOCK RESUME DOWNLOAD GENERATION
    // ----------------------------------------------------
    const downloadResumeBtn = document.getElementById('download-resume-btn');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            showToast('Preparing your resume download package...');
            
            setTimeout(() => {
                // Construct a dynamic premium text-formatted mock CV to download
                const resumeContent = `================================================
TRILOCHAN LANDEKAR - COMPUTER ENGINEER & DEV CV
================================================
Address: Maharashtra, India
Email: thilochanlandekar@gmail.com
Phone: +91 9284451501
GitHub: https://github.com/thilochanlandekar-wq/sam-studio
LinkedIn: https://www.linkedin.com/in/trilochan-landekar-06226638b?utm_source=share_via&utm_content=profile&utm_medium=member_android
Instagram: https://www.instagram.com/tril.ochan97?igsh=cmVsM2xwaGZpc2F2

SUMMARY
-------
Passionate Computer Engineering Student and Full Stack Developer.
Experienced in building modern responsive applications using React,
Java, Spring Boot, JDBC, and MySQL database engines. Completed 
internship roles optimizing frontend designs and backend REST services.

CORE EXPERTISE
--------------
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap
- Backend: Java, Spring Boot, JDBC, Jakarta Servlets
- Database: MySQL relational database
- Development tools: Git, GitHub, VS Code, Eclipse, Postman, Vite

PROJECTS
--------
1. AI Website Builder (React, Spring Boot, Gemini AI, MySQL)
   AI-driven builder compiling responsive web pages from user prompts.
   
2. Student Management System (Java, Servlets, JDBC, MySQL)
   Complete CRUD operations portal for managing institutional records.

3. AI ChatBot Interface (HTML, CSS, JavaScript)
   Responsive dialogue messaging layout implementing dynamic response intervals.

PROFESSIONAL EXPERIENCE
-----------------------
Full Stack Developer Intern - MBIG Company
- Programmed user interfaces using React.js components.
- Developed scalable server architectures leveraging Spring Boot & Java.
- Tuned MySQL databases and connected tables to endpoints.
- Designed endpoints and implemented REST APIs.

EDUCATION
---------
Diploma in Computer Engineering
Currently pursuing Computer Engineering with strong core alignment 
in Web Development, Full Stack Frameworks, and Artificial Intelligence.

CERTIFICATES
------------
- HTML & CSS
- JavaScript
- React.js
- Java Programming
- Spring Boot
- Full Stack Development

------------------------------------------------
Thank you for reading. Prepared in 2026.
================================================`;

                // Create a temporary Blob link and trigger browser downloads
                const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
                const downloadUrl = URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.href = downloadUrl;
                tempLink.download = 'Trilochan_Landekar_Resume.txt';
                document.body.appendChild(tempLink);
                tempLink.click();
                
                // Cleanup
                document.body.removeChild(tempLink);
                URL.revokeObjectURL(downloadUrl);

                showToast('CV Downloaded successfully!', 'success');
            }, 1000);
        });
    }
});
