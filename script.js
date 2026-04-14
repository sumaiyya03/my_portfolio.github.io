// Three.js Nebula Background
let scene, camera, renderer, stars = [];
function initNebula() {
    const canvas = document.getElementById('bgCanvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // 500 Stars
    for(let i = 0; i < 500; i++) {
        const geometry = new THREE.SphereGeometry(0.5, 24, 24);
        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.5 + 0.5)
        });
        stars[i] = new THREE.Mesh(geometry, material);
        stars[i].position.x = Math.random() * 2000 - 1000;
        stars[i].position.y = Math.random() * 2000 - 1000;
        stars[i].position.z = Math.random() * 2000 - 1000;
        scene.add(stars[i]);
    }
    
    camera.position.z = 5;
    animateStars();
}
function animateStars() {
    stars.forEach(star => {
        star.rotation.x += 0.001;
        star.rotation.y += 0.002;
        star.position.z += 0.5;
        if(star.position.z > 1000) star.position.z = -1000;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animateStars);
}

// EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// Loader
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').style.opacity = '0', 2000);
    setTimeout(() => document.getElementById('loader').style.display = 'none', 2500);
});

// Navigation
document.getElementById('menuToggle').onclick = () => {
    document.getElementById('orbitalNav').classList.toggle('active');
};

// Voice Control
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
document.getElementById('voiceBtn').onclick = () => {
    recognition.start();
    document.querySelector('.voice-btn i').className = 'fas fa-stop';
};
recognition.onresult = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    if(command.includes('home')) scrollTo('hero');
    if(command.includes('projects')) scrollTo('projects');
    if(command.includes('contact')) scrollTo('contact');
    // More voice commands
};

// Smooth Scroll
function scrollTo(section) {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}

// Copy Email
function copyEmail() {
    navigator.clipboard.writeText('sumaiyyanadaf99@gmail.com');
    // Toast notification
}

// Counter Animation
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.dataset.target;
        const count = +counter.innerText;
        const increment = target / 100;
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 30);
        }
    });
}

// Terminal Form
document.getElementById('contactTerminal').onsubmit = (e) => {
    e.preventDefault();
    // EmailJS send
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target)
        .then(() => {
            alert('Transmission Successful! 🚀');
            e.target.reset();
        });
};

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initNebula();
