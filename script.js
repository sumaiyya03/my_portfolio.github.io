// EmailJS Init - REPLACE WITH YOUR CREDENTIALS
emailjs.init('YOUR_PUBLIC_KEY');  // From EmailJS dashboard

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = darkToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// Load saved theme
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').style.background = 
        window.scrollY > 50 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
    body.dark && (document.querySelector('.navbar').style.background = 
        window.scrollY > 50 ? 'rgba(20,20,40,0.98)' : 'rgba(20,20,40,0.95)');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.achievement-card, .project-card, .about-details div').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Lightbox Gallery
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// EmailJS Contact Form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // REPLACE: 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID'
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            const status = document.getElementById('form-status');
            status.innerHTML = 'Message sent successfully! 🎉';
            status.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
            status.style.color = 'white';
            this.reset();
            setTimeout(() => status.innerHTML = '', 5000);
        }, function(error) {
            const status = document.getElementById('form-status');
            status.innerHTML = 'Oops! Something went wrong. Try again.';
            status.style.background = '#ff6b6b';
            status.style.color = 'white';
            console.log('FAILED...', error);
            setTimeout(() => status.innerHTML = '', 5000);
        });
});

// Mobile Menu (if needed)
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});
