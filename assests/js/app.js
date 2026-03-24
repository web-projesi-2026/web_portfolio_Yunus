
/* =========================================
   YUNUS BARIŞ — PORTFOLYO
   app.js
   ========================================= */

// ── CUSTOM CURSOR ──────────────────────────
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ── NAV SCROLL ────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER / MOBILE MENU ───────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── CANVAS BACKGROUND ─────────────────────
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = ['#e63946','#ffd166','#2a9d8f','#6a4c93'];
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.6 + 0.2;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Init 120 particles
for (let i = 0; i < 120; i++) particles.push(new Particle());

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 100) * 0.12;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── INTERSECTION OBSERVER (Scroll Reveal) ──
const reveals = document.querySelectorAll('.reveal-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bars if inside skills
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) animateSkillBar(fill);
      // Trigger counters
      entry.target.querySelectorAll('.stat-num').forEach(n => animateCounter(n));
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Animate skill bars on reveal
document.querySelectorAll('.skill-card').forEach(card => {
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) animateSkillBar(fill);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  cardObserver.observe(card);
});

function animateSkillBar(fill) {
  const target = fill.dataset.width;
  setTimeout(() => { fill.style.width = target + '%'; }, 100);
}

// ── COUNTER ANIMATION ──────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  let current  = 0;
  const step   = target / 40;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else el.textContent = Math.floor(current);
  }, 40);
}

// Observe stats section
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(n => animateCounter(n));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);

// ── TOPIC PILLS ────────────────────────────
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
    document.getElementById('topic').value = pill.dataset.topic;
    document.getElementById('topicErr')?.closest('.field-group')?.classList.remove('has-error');
  });
});

// ── MULTI-STEP FORM ────────────────────────
let currentStep = 1;
const totalSteps = 3;

function goToStep(step) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active','done');
    if (i + 1 < step) s.classList.add('done');
    if (i + 1 === step) s.classList.add('active');
  });
  const target = document.querySelector(`.form-step[data-step="${step}"]`);
  if (target) target.classList.add('active');
  currentStep = step;
}

function validateStep(step) {
  let valid = true;
  if (step === 1) {
    const name  = document.getElementById('name');
    const email = document.getElementById('email');
    const nameG  = name.closest('.field-group');
    const emailG = email.closest('.field-group');
    nameG.classList.remove('has-error');
    emailG.classList.remove('has-error');
    if (!name.value.trim()) { nameG.classList.add('has-error'); valid = false; }
    if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) { emailG.classList.add('has-error'); valid = false; }
  }
  if (step === 2) {
    const topic   = document.getElementById('topic');
    const msg     = document.getElementById('message');
    const topicG  = topic.closest('.field-group');
    const msgG    = msg.closest('.field-group');
    topicG.classList.remove('has-error');
    msgG.classList.remove('has-error');
    if (!topic.value) { topicG.classList.add('has-error'); valid = false; }
    if (!msg.value.trim()) { msgG.classList.add('has-error'); valid = false; }
  }
  return valid;
}

window.nextStep = function(from) {
  if (!validateStep(from)) return;
  if (from === 2) fillSummary();
  goToStep(from + 1);
};
window.prevStep = function(from) {
  goToStep(from - 1);
};

function fillSummary() {
  document.getElementById('sumName').textContent  = document.getElementById('name').value;
  document.getElementById('sumEmail').textContent = document.getElementById('email').value;
  document.getElementById('sumTopic').textContent = document.getElementById('topic').value;
  const msg = document.getElementById('message').value;
  document.getElementById('sumMsg').textContent   = msg.length > 60 ? msg.slice(0, 60) + '…' : msg;
}

// Form submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate send
  setTimeout(() => {
    btn.classList.remove('loading');
    this.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('formSuccess').classList.add('visible');
    document.querySelector('.steps-bar').style.display = 'none';
  }, 1800);
});

window.resetForm = function() {
  document.getElementById('contactForm').reset();
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
  document.getElementById('formSuccess').classList.remove('visible');
  document.querySelector('.steps-bar').style.display = 'flex';
  const btn = document.getElementById('submitBtn');
  btn.disabled = false;
  goToStep(1);
};

// ── PROJECT CARD GLOW ON MOUSE ────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    const glow = card.querySelector('.project-glow');
    if (glow) glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(230,57,70,0.12), transparent 60%)`;
  });
});

// ── SMOOTH ANCHOR ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── PAGE LOAD REVEAL ──────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up').forEach(el => {
    el.classList.add('visible');
  });
});
