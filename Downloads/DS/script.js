let currentTextIndex = 0;
const animatedTexts = ['Cloud', 'DevOps', 'Docker', 'Terraform'];
let skillsChart = null;

// DOM Elements
const navbar = document.getElementById('navbar');
const animatedTextElement = document.getElementById('animatedText');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavbar();
    initializeSkillsChart();
    initializeContactForm();
    initializeScrollAnimations();
});

// Text Animation for Hero Section
function initializeAnimations() {
    if (animatedTextElement) {
        setInterval(() => {
            currentTextIndex = (currentTextIndex + 1) % animatedTexts.length;
            animatedTextElement.textContent = animatedTexts[currentTextIndex];
        }, 2000);
    }
}

// Navbar Scroll Effect
function initializeNavbar() {
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Skills Radar Chart
function initializeSkillsChart() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const skills = [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Terraform', level: 80 },
        { name: 'Kubernetes', level: 75 },
        { name: 'MySQL', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Docker', level: 70 }
    ];

    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid circles
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0, 255, 198, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Draw grid lines
        const angleStep = (2 * Math.PI) / skills.length;
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(0, 255, 198, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw skill labels
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillStyle = '#00FFC6';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(skill.name, labelX, labelY);
        });
        
        // Draw skill polygon
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const distance = (skill.level / 100) * radius;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 198, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#00FFC6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw skill points
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const distance = (skill.level / 100) * radius;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#00FFC6';
            ctx.fill();
        });
    }

    // Animate chart on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    drawRadarChart();
                }, 200);
            }
        });
    });

    observer.observe(canvas);
}

// Contact Form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showToast('Error', 'Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Error', 'Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            showToast('Success!', 'Thank you for reaching out. I\'ll get back to you soon!');
            contactForm.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast Notification
function showToast(title, message) {
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    toast.classList.remove('show');
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    });
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const techLines = document.querySelector('.tech-lines');
    if (techLines) {
        techLines.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
    
    const floatingCode = document.querySelectorAll('.code-element');
    floatingCode.forEach((element, index) => {
        const rate = scrolled * (-0.3 - index * 0.1);
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideToast();
    }
});

// Social icon hover effects
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.boxShadow = '0 0 20px rgba(0, 255, 198, 0.5)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.boxShadow = 'none';
    });
});

// Add click effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Victory Ajay Kumar Portfolio - Loaded Successfully!');
