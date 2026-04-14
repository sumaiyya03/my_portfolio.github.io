  // script.js
// Dark Mode Toggle
const darkToggle = document.getElementById('darkIcon');
const body = document.body;

darkToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        darkToggle.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        darkToggle.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    darkToggle.className = 'fas fa-sun';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10,10,10,0.95)';
    } else {
        navbar.style.background = 'rgba(10,10,10,0.9)';
    }
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
});

// Parallax effect for stars
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    const stars2 = document.querySelector('.stars2');
    const stars3 = document.querySelector('.stars3');
    
    stars.style.transform = `translateY(${scrolled * 0.5}px)`;
    stars2.style.transform = `translateY(${scrolled * 0.3}px)`;
    stars3.style.transform = `translateY(${scrolled * 0.7}px)`;
});

// Intersection Observer for animations
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

// Observe all cards
document.querySelectorAll('.glow, .project-card, .gallery-grid a').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});      
