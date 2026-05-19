 /* ═══════════════════════════════════════════════════════════
   Sumaiyya Ismail Nadaf — Digital Portfolio
   script.js  ·  All interactive features
   ═══════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────
   CERTIFICATE DATA (for modal popup)
────────────────────────────────────── */
const certData = [
  {
    title: "Introduction to Discrete Mathematics for CS",
    desc: "Completed a 5-course specialization covering Mathematical Thinking, Combinatorics & Probability, Introduction to Graph Theory, Number Theory & Cryptography, and the Delivery Problem. Authorized by UC San Diego.",
    date: "May 1, 2026",
    img: null, // will be set dynamically
  },
  {
    title: "Mathematical Thinking in Computer Science",
    desc: "An online course authorized by the University of California San Diego and offered through Coursera. Covers logical reasoning, induction, and mathematical proof techniques.",
    date: "April 30, 2026",
    img: null,
  },
  {
    title: "Combinatorics and Probability",
    desc: "An online course authorized by University of California San Diego covering counting, permutations, combinations, and probability theory for computer scientists.",
    date: "April 29, 2026",
    img: null,
  },
  {
    title: "Introduction to Graph Theory",
    desc: "An online course authorized by University of California San Diego covering graphs, trees, cycles, and their applications in computer science problems.",
    date: "April 29, 2026",
    img: null,
  },
  {
    title: "Delivery Problem",
    desc: "An online course authorized by University of California San Diego covering algorithmic solutions to the classic Travelling Salesman / Delivery routing problem.",
    date: "April 28, 2026",
    img: null,
  },
];

/* ──────────────────────────────────────
   DOM READY
────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initTheme();
  initCursor();
  initNavbar();
  initTyping();
  initParticles();
  initScrollProgress();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initGalleryFilter();
  initFAB();
  initBackToTop();
  collectCertImages();
});

/* ══════════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }, 1200);
  });
  document.body.style.overflow = "hidden";
}

/* ══════════════════════════════════════════════════
   THEME TOGGLE (dark/light) + localStorage
══════════════════════════════════════════════════ */
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const html = document.documentElement;

  // Restore saved theme
  const saved = localStorage.getItem("portfolio-theme") || "light";
  applyTheme(saved);

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  function applyTheme(t) {
    html.setAttribute("data-theme", t);
    icon.className = t === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

/* ══════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");

  // Hide on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    dot.style.display = "none";
    ring.style.display = "none";
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scale ring on hover of interactive elements
  document.querySelectorAll("a, button, .cert-card, .project-card, .gallery-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "var(--accent1)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "var(--rose)";
    });
  });
}

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById("navbar");
  const ham = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  const navLinkEls = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Scroll styling
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);

    // Active link highlight
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinkEls.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  });

  // Hamburger
  ham.addEventListener("click", () => {
    ham.classList.toggle("active");
    links.classList.toggle("open");
  });

  // Close menu on link click
  navLinkEls.forEach((l) => {
    l.addEventListener("click", () => {
      ham.classList.remove("active");
      links.classList.remove("open");
    });
  });
}

/* ══════════════════════════════════════════════════
   TYPING ANIMATION
══════════════════════════════════════════════════ */
function initTyping() {
  const el = document.getElementById("typingText");
  if (!el) return;
  const words = ["CSE Student", "Creative Developer", "AI Enthusiast", "Frontend Learner", "Math Explorer"];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();
}

/* ══════════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById("particlesCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const colors = ["#f7cad0", "#d8c4e8", "#f8dfc8", "#e8a0b0", "#c9a8c0"];
  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.3,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + "%";
  });
}

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

/* ══════════════════════════════════════════════════
   SKILL BARS
══════════════════════════════════════════════════ */
function initSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute("data-width") + "%";
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach((f) => io.observe(f));
}

/* ══════════════════════════════════════════════════
   ANIMATED COUNTERS
══════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const target = +e.target.getAttribute("data-target");
      let count = 0;
      const step = target / 40;
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        e.target.textContent = Math.round(count);
        if (count >= target) clearInterval(interval);
      }, 40);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
}

/* ══════════════════════════════════════════════════
   GALLERY FILTER
══════════════════════════════════════════════════ */
function initGalleryFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      items.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════════
   CERTIFICATE MODAL
══════════════════════════════════════════════════ */
// Collect the cert card images after DOM is ready
function collectCertImages() {
  const certCards = document.querySelectorAll("#certGrid .cert-card:not(.cert-placeholder)");
  certCards.forEach((card, i) => {
    const img = card.querySelector(".cert-img");
    if (img && certData[i]) certData[i].img = img.src;
  });
}

function openCertModal(index) {
  const d = certData[index];
  if (!d) return;
  document.getElementById("modalImg").src = d.img || "";
  document.getElementById("modalTitle").textContent = d.title;
  document.getElementById("modalDesc").textContent = d.desc;
  document.getElementById("modalDate").innerHTML = `<i class='fa-regular fa-calendar'></i> ${d.date}`;
  document.getElementById("certModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCertModal(e) {
  if (e && e.target !== document.getElementById("certModal") && !e.target.closest(".modal-close")) return;
  if (e && e.type === "click" && e.target.closest(".modal-box") && !e.target.closest(".modal-close")) return;
  document.getElementById("certModal").classList.remove("open");
  document.body.style.overflow = "";
}

// Keyboard close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.remove("open"));
    document.body.style.overflow = "";
  }
});

/* ══════════════════════════════════════════════════
   GALLERY LIGHTBOX
══════════════════════════════════════════════════ */
function openGalleryLightbox(el) {
  const img = el.querySelector(".gallery-img");
  if (!img) return;
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("galleryLightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeGalleryLightbox(e) {
  if (e && e.target !== document.getElementById("galleryLightbox") && !e.target.closest(".modal-close")) return;
  if (e && e.type === "click" && e.target.closest(".lightbox-box") && !e.target.closest(".modal-close")) return;
  document.getElementById("galleryLightbox").classList.remove("open");
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════ */
function sendMessage() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const subject = document.getElementById("subjectInput").value.trim();
  const msg = document.getElementById("messageInput").value.trim();

  if (!name || !email || !subject || !msg) {
    alert("Please fill in all fields 🌸");
    return;
  }

  // Simulate send (replace with actual backend/EmailJS)
  const btn = document.getElementById("sendBtn");
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    document.getElementById("formSuccess").style.display = "flex";
    // Clear
    ["nameInput", "emailInput", "subjectInput", "messageInput"].forEach((id) => {
      document.getElementById(id).value = "";
    });
    setTimeout(() => {
      document.getElementById("formSuccess").style.display = "none";
    }, 4000);
  }, 1500);
}

/* ══════════════════════════════════════════════════
   FLOATING ACTION BUTTON
══════════════════════════════════════════════════ */
function initFAB() {
  const fab = document.getElementById("fabBtn");
  const wrap = fab.parentElement;
  fab.addEventListener("click", () => wrap.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) wrap.classList.remove("open");
  });
}

/* ══════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ══════════════════════════════════════════════════
   RIPPLE EFFECT (for buttons with .ripple class)
══════════════════════════════════════════════════ */
document.querySelectorAll(".ripple").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(255,255,255,0.35);
      transform:scale(0);
      animation:rippleAnim 0.6s linear;
      width:${Math.max(rect.width, rect.height) * 2}px;
      height:${Math.max(rect.width, rect.height) * 2}px;
      left:${e.clientX - rect.left - Math.max(rect.width, rect.height)}px;
      top:${e.clientY - rect.top - Math.max(rect.width, rect.height)}px;
      pointer-events:none;
    `;
    this.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// Inject ripple keyframe
const style = document.createElement("style");
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(style);

/* ══════════════════════════════════════════════════
   MOUSE PARALLAX on Hero Blobs
══════════════════════════════════════════════════ */
document.addEventListener("mousemove", (e) => {
  const blobs = document.querySelectorAll(".blob");
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
  blobs.forEach((b, i) => {
    const strength = (i + 1) * 10;
    b.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });
});

/* ══════════════════════════════════════════════════
   3D TILT on Project Cards
══════════════════════════════════════════════════ */
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    card.style.transform = `translateY(-8px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ══════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLLING
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById("navbar").offsetHeight;
    window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  });
});
