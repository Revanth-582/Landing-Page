// ===========================
//  AUTOVERSE — SCRIPT
// ===========================

// ── Navbar scroll ──────────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile hamburger ───────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── EV Tab switching ───────────────────────────
function switchEVTab(type) {
  const carsGrid = document.getElementById('evCarsGrid');
  const bikesGrid = document.getElementById('evBikesGrid');
  const tabs = document.querySelectorAll('.ev-tab');

  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', (type === 'cars' && i === 0) || (type === 'bikes' && i === 1));
  });

  if (type === 'cars') {
    carsGrid.style.display = 'grid';
    bikesGrid.style.display = 'none';
  } else {
    carsGrid.style.display = 'none';
    bikesGrid.style.display = 'grid';
  }
}

// ── Filter buttons ─────────────────────────────
document.querySelectorAll('.filter-bar').forEach(bar => {
  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

// ── Scroll reveal ──────────────────────────────
const revealElements = document.querySelectorAll(
  '.vehicle-card, .ev-card, .news-card, .brand-card, .why-card, .section-header, .compare-table-wrap'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// ── Stagger card animations ────────────────────
document.querySelectorAll('.vehicle-grid, .ev-grid, .brands-grid, .why-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 60}ms`;
  });
});

// ── Hero search: Enter key ─────────────────────
document.querySelector('.search-input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val) {
      alert(`Searching for: "${val}" — Results would appear here in the full version.`);
    }
  }
});

// ── Wishlist toggle ────────────────────────────
document.querySelectorAll('.btn-card-icon[title="Wishlist"]').forEach(btn => {
  btn.addEventListener('click', function () {
    const icon = this.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    this.style.color = icon.classList.contains('fas') ? '#ff4d6d' : '';
    this.style.borderColor = icon.classList.contains('fas') ? '#ff4d6d' : '';
  });
});

// ── Newsletter submit ──────────────────────────
document.querySelector('.nl-btn')?.addEventListener('click', () => {
  const input = document.querySelector('.nl-input');
  const val = input?.value.trim();
  if (val && val.includes('@')) {
    input.value = '';
    const btn = document.querySelector('.nl-btn');
    btn.textContent = 'Subscribed! ✓';
    btn.style.background = 'linear-gradient(135deg,#39ff14,#00aa00)';
    setTimeout(() => {
      btn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
    }, 3000);
  } else {
    input?.focus();
  }
});

// ── Smooth Active Nav Link highlight ──────────
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = '';
        a.style.background = '';
        if (a.getAttribute('href') === `#${section.id}`) {
          a.style.color = 'var(--blue)';
          a.style.background = 'var(--blue-dim)';
        }
      });
    }
  });
});

// ── View Details button interaction ───────────
document.querySelectorAll('.btn-card-primary, .btn-card-bike').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.vehicle-card');
    const name = card?.querySelector('.card-name')?.textContent;
    if (name) {
      this.textContent = 'Opening…';
      setTimeout(() => { this.textContent = 'View Details'; }, 1000);
    }
  });
});

console.log('%cAutoVerse v1.0 — Premium Automotive Platform', 'color:#00d4ff;font-size:14px;font-weight:700;');
