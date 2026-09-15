document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const groupName = group.dataset.tabGroup;
    const tabs = document.querySelectorAll(`[data-tab-for="${groupName}"]`);
    const panels = document.querySelectorAll(`[data-panel-for="${groupName}"]`);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tabTarget;
        tabs.forEach((t) => t.classList.toggle('active', t === tab));
        panels.forEach((p) => p.classList.toggle('active', p.dataset.panelId === target));
      });
    });
  });

  const pricingToggle = document.getElementById('pricing-toggle');
  if (pricingToggle) {
    const monthlyBtn = pricingToggle.querySelector('[data-billing="monthly"]');
    const annualBtn = pricingToggle.querySelector('[data-billing="annual"]');
    const priceEls = document.querySelectorAll('[data-price-monthly]');

    const setBilling = (mode) => {
      const isAnnual = mode === 'annual';
      monthlyBtn?.classList.toggle('active', !isAnnual);
      annualBtn?.classList.toggle('active', isAnnual);
      priceEls.forEach((el) => {
        const monthly = el.dataset.priceMonthly;
        const annual = el.dataset.priceAnnual;
        el.textContent = isAnnual ? annual : monthly;
      });
    };

    monthlyBtn?.addEventListener('click', () => setBilling('monthly'));
    annualBtn?.addEventListener('click', () => setBilling('annual'));
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const phone = data.get('phone') || '';
      const message = data.get('message') || '';
      const subject = encodeURIComponent('NextClaud demo request');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
      );
      window.location.href = `mailto:support@nextclaud.com?subject=${subject}&body=${body}`;
    });
  }
});
