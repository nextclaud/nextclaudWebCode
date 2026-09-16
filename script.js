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
    const saveBadge = document.getElementById('save-badge');
    const billingButtons = pricingToggle.querySelectorAll('[data-billing]');
    const priceEls = document.querySelectorAll('[data-price-monthly]');

    const saveBadgeText = {
      monthly: 'Flexible monthly billing',
      quarterly: 'Save 10% with quarterly billing',
      annual: 'Save 20% with annual billing',
    };

    const setBilling = (mode) => {
      billingButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.billing === mode);
      });
      if (saveBadge) {
        saveBadge.textContent = saveBadgeText[mode] || saveBadgeText.monthly;
      }
      priceEls.forEach((el) => {
        const price = el.dataset[`price${mode.charAt(0).toUpperCase()}${mode.slice(1)}`]
          ?? el.dataset.priceMonthly;
        el.textContent = price;
      });
    };

    billingButtons.forEach((btn) => {
      btn.addEventListener('click', () => setBilling(btn.dataset.billing));
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const interest = data.get('interest') || 'demo';
      const params = new URLSearchParams({ enquiry: String(interest) });
      window.location.href = `https://app.nextclaud.com/login?${params.toString()}`;
    });
  }
});
