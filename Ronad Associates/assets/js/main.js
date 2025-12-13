// Ronad Associates - Main JavaScript File
// ==========================================

// ==========================================
// Mobile Menu Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // ==========================================
    // Scroll-based Fade-in Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==========================================
    // Animated Counters
    // ==========================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    }
    
    // Observe counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ==========================================
    // Sticky Navigation
    // ==========================================
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // Lazy Loading Images
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ==========================================
    // Form Validation & Handling (Contact Page)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const service = document.getElementById('service');
            const message = document.getElementById('message');
            
            // Reset previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, 'Enter a valid 10-digit phone number');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Enter a valid email address');
                isValid = false;
            }
            
            // Validate service
            if (service.value === '') {
                showError(service, 'Please select a service');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Create FormData object
                const formData = new FormData(contactForm);
                
                // Submit form via AJAX
                fetch('contact.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    if (data.success) {
                        showSuccessMessage('Thank you! Your message has been sent successfully. We will contact you soon.');
                        contactForm.reset();
                    } else {
                        showErrorMessage(data.message || 'Something went wrong. Please try again.');
                    }
                })
                .catch(error => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    showErrorMessage('Network error. Please check your connection and try again.');
                });
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('p');
        error.className = 'text-red-500 text-sm mt-1';
        error.textContent = message;
        formGroup.appendChild(error);
        input.classList.add('border-red-500');
    }
    
    function clearErrors() {
        const errors = document.querySelectorAll('.text-red-500');
        errors.forEach(error => error.remove());
        
        const inputs = document.querySelectorAll('.border-red-500');
        inputs.forEach(input => input.classList.remove('border-red-500'));
    }
    
    function showSuccessMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
        alertDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
    
    function showErrorMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed top-24 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
        alertDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
    
    // ==========================================
    // Image Lightbox (Projects Page)
    // ==========================================
    const projectImages = document.querySelectorAll('.project-image');
    
    if (projectImages.length > 0) {
        projectImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                openLightbox(this.src, this.alt);
            });
        });
    }
    
    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
        lightbox.innerHTML = `
            <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition" onclick="this.parentElement.remove()">
                &times;
            </button>
            <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain">
        `;
        
        document.body.appendChild(lightbox);
        
        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                lightbox.remove();
            }
        });
    }
    
    // ==========================================
    // Project Filter (Projects Page)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active-filter'));
                this.classList.add('active-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    backToTop.className = 'fixed bottom-24 right-4 bg-charcoal text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 transition-all duration-300 hover:bg-terracotta z-40';
    backToTop.style.pointerEvents = 'none';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // Initialize AOS-like animations on load
    // ==========================================
    setTimeout(() => {
        const initialFadeIns = document.querySelectorAll('.fade-in');
        initialFadeIns.forEach((el, index) => {
            setTimeout(() => {
                if (isElementInViewport(el)) {
                    el.classList.add('active');
                }
            }, index * 100);
        });
    }, 100);
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

// ==========================================
// Console Welcome Message
// ==========================================
console.log('%cRonad Associates', 'font-size: 24px; font-weight: bold; color: #C4735A;');
console.log('%cBuilding Better Spaces', 'font-size: 14px; color: #95A5A6;');
console.log('%cWebsite developed with modern web technologies', 'font-size: 12px; color: #2D2D2D;');