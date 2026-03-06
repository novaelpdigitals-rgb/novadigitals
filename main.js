/* =============================================
   NOVAELP WEBSITE — MAIN JAVASCRIPT
   All interactions, animations, and logic
   ============================================= */

// ===== NAVBAR: Scroll effect + Mobile toggle =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// Close nav when a link is clicked (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TESTIMONIAL DOTS (Home Page) =====
const dots = document.querySelectorAll('.dot');
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    // In a real setup you'd scroll the testimonials track here
  });
});

// ===== AUTO ROTATE DOTS =====
let dotIndex = 0;
if (dots.length > 0) {
  setInterval(() => {
    dotIndex = (dotIndex + 1) % dots.length;
    dots.forEach(d => d.classList.remove('active'));
    dots[dotIndex]?.classList.add('active');
  }, 4000);
}

// ===== SERVICES TABS (Services Page) =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ===== PORTFOLIO FILTER (Portfolio Page) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.4s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== VIDEO MODAL (Portfolio Page) =====
const videoModal = document.getElementById('videoModal');

function openVideoModal(title, desc) {
  if (!videoModal) return;
  videoModal.querySelector('#modalTitle').textContent = title;
  videoModal.querySelector('#modalDesc').textContent = desc;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.play-overlay').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.portfolio-item');
    const title = item.querySelector('h3')?.textContent || 'Video Preview';
    const desc = item.querySelector('p')?.textContent || '';
    openVideoModal(title, desc);
  });
});

videoModal?.querySelector('.modal-close')?.addEventListener('click', closeVideoModal);
videoModal?.addEventListener('click', (e) => {
  if (e.target === videoModal) closeVideoModal();
});

// ===== QUOTE MODAL (Pricing Page) =====
const quoteModal = document.getElementById('quoteModal');

function openQuoteModal(planName) {
  if (!quoteModal) return;
  const titleEl = quoteModal.querySelector('#quotePlanName');
  if (titleEl) titleEl.textContent = planName;
  quoteModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
  quoteModal?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.select-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    openQuoteModal(btn.dataset.plan);
  });
});

quoteModal?.querySelector('.modal-close')?.addEventListener('click', closeQuoteModal);
quoteModal?.addEventListener('click', (e) => {
  if (e.target === quoteModal) closeQuoteModal();
});

// ===== CONTACT FORM VALIDATION (Contact Page) =====
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  // Clear old errors
  document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));

  // Validate Name
  const nameField = document.getElementById('name');
  if (!nameField?.value.trim()) {
    document.getElementById('nameError')?.classList.add('show');
    valid = false;
  }

  // Validate Email
  const emailField = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailField?.value.trim() || !emailRegex.test(emailField.value)) {
    document.getElementById('emailError')?.classList.add('show');
    valid = false;
  }

  // Validate School
  const schoolField = document.getElementById('school');
  if (!schoolField?.value.trim()) {
    document.getElementById('schoolError')?.classList.add('show');
    valid = false;
  }

  // Validate Message
  const messageField = document.getElementById('message');
  if (!messageField?.value.trim()) {
    document.getElementById('messageError')?.classList.add('show');
    valid = false;
  }

  if (valid) {
    // Show success
    document.getElementById('formSuccess')?.classList.add('show');
    contactForm.reset();
    // Hide success after 5 seconds
    setTimeout(() => {
      document.getElementById('formSuccess')?.classList.remove('show');
    }, 5000);
  }
});

// ===== QUOTE MODAL FORM =====
const quoteForm = document.getElementById('quoteForm');

quoteForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('quoteSuccess')?.classList.add('show');
  quoteForm.reset();
  setTimeout(() => {
    closeQuoteModal();
    document.getElementById('quoteSuccess')?.classList.remove('show');
  }, 3000);
});

// ===== FAQ ACCORDION (FAQ Page) =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open this one if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ===== BLOG SEARCH + FILTER (Blog Page) =====
const blogSearch = document.getElementById('blogSearch');
const blogCards = document.querySelectorAll('.blog-card');
const noResults = document.getElementById('noResults');

function filterBlog() {
  const query = blogSearch?.value.toLowerCase() || '';
  const activeFilter = document.querySelector('.blog-filters .filter-btn.active')?.dataset.filter || 'all';
  let visibleCount = 0;

  blogCards.forEach(card => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const text = card.querySelector('p')?.textContent.toLowerCase() || '';
    const cat = card.dataset.category || '';

    const matchesSearch = title.includes(query) || text.includes(query);
    const matchesFilter = activeFilter === 'all' || cat === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.3s ease';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

blogSearch?.addEventListener('input', filterBlog);

document.querySelectorAll('.blog-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.blog-filters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterBlog();
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply initial state and observe
document.querySelectorAll('.service-card, .testimonial-card, .team-card, .portfolio-item, .pricing-card, .blog-card, .value-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== KEYFRAME for fadeIn =====
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
