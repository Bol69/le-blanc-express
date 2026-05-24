/* LE BLANC EXPRESS — Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── Scroll-to-top button ── */
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Intersection Observer for fade-in animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

  /* ── Contact Form ── */
  const form = document.getElementById('devis-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const rgpd = form.querySelector('[name="rgpd"]');
      if (!rgpd || !rgpd.checked) {
        showNotif('Veuillez accepter la politique de confidentialité.', 'error');
        return;
      }
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;
      setTimeout(() => {
        showNotif('Votre demande a bien été envoyée. Nous vous rappelons très rapidement.', 'success');
        form.reset();
        btn.textContent = 'Envoyer ma demande';
        btn.disabled = false;
      }, 1200);
    });
  }

  function showNotif(msg, type) {
    const el = document.createElement('div');
    el.className = 'form-notif form-notif--' + type;
    el.textContent = msg;
    Object.assign(el.style, {
      position: 'fixed', bottom: '2rem', left: '50%',
      transform: 'translateX(-50%)',
      padding: '1rem 2rem',
      background: type === 'success' ? '#2E7D32' : '#8B1A1A',
      color: 'white',
      fontFamily: "'Lora', serif",
      fontSize: '0.95rem',
      borderRadius: '2px',
      zIndex: '9999',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      maxWidth: '90vw', textAlign: 'center',
      transition: 'opacity 0.4s ease'
    });
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; }, 3500);
    setTimeout(() => el.remove(), 4000);
  }

  /* ── Active nav link ── */
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (path.endsWith(href) || (href === 'index.html' && path === '/'))) {
      a.style.color = 'var(--gold-dark)';
    }
  });

});
