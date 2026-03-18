/**
 * script.js — Alsatian K9 Training
 * Handles: Hamburger menu, FAQ accordion, Contact form
 */

(function () {
  'use strict';

  /* ============================
     HAMBURGER MENU
     ============================ */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu   = document.getElementById('mobile-menu');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileMenu) {

    // Toggle menu open / closed
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
      mobileMenu.setAttribute('aria-hidden', (!isOpen).toString());
    });

    // Close menu when any mobile link is clicked
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        mobileMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ============================
     FAQ ACCORDION
     ============================ */
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const answerId = btn.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);
      const isOpen   = btn.getAttribute('aria-expanded') === 'true';

      // Close all other open items first
      faqButtons.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          const otherId  = otherBtn.getAttribute('aria-controls');
          const otherAns = document.getElementById(otherId);
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) {
            otherAns.hidden = true;
          }
        }
      });

      // Toggle current item
      if (answer) {
        answer.hidden = isOpen;
        btn.setAttribute('aria-expanded', (!isOpen).toString());
      }
    });
  });

  /* ============================
     STICKY HEADER — shadow on scroll
     ============================ */
  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        siteHeader.style.boxShadow = '0 2px 12px rgba(0,0,0,0.5)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ============================
     CONTACT FORM — basic submit handler
     ============================ */
  const contactForm       = document.getElementById('contact-form');
  const formSuccessMsg    = document.getElementById('form-success-msg');

  if (contactForm && formSuccessMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('contact-name');
      const email   = document.getElementById('contact-email-input');
      const message = document.getElementById('contact-message');

      // Simple validation
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (!field || !field.value.trim()) {
          field.style.borderColor = '#b03030';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      // Basic email format check
      if (email && email.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          email.style.borderColor = '#b03030';
          valid = false;
        }
      }

      if (!valid) return;

      // Show success message (in production, replace with real form submission)
      contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
        field.value = '';
        field.style.borderColor = '';
      });

      formSuccessMsg.removeAttribute('hidden');

      // Hide success message after 6 seconds
      setTimeout(function () {
        formSuccessMsg.setAttribute('hidden', '');
      }, 6000);
    });
  }

  /* ============================
     SMOOTH SCROLL POLYFILL
     (for browsers that don't natively support it)
     ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const headerH = siteHeader ? siteHeader.offsetHeight : 0;
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
