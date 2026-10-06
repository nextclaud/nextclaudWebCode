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
    const pricingCfg = window.NC_PLAN_PRICING ?? {
      quarterlyDiscountPercent: 2,
      yearlyDiscountPercent: 5,
      monthlyGBP: { starter: 36, growth: 47, pro: 89 }
    };
    const monthlyByPlan = pricingCfg.monthlyGBP ?? pricingCfg.monthlyUSD ?? {};
    const currencySymbol = window.NC_SITE?.currencySymbol ?? '£';
    const taxSuffix = window.NC_SITE?.market === 'pk' ? 'ex tax' : 'ex VAT';

    const saveBadgeText = {
      monthly: 'Flexible monthly billing',
      quarterly: `Save ${pricingCfg.quarterlyDiscountPercent}% with quarterly billing`,
      annual: `Save ${pricingCfg.yearlyDiscountPercent}% with annual billing`
    };

    const discountForMode = (mode) => {
      if (mode === 'quarterly') return pricingCfg.quarterlyDiscountPercent / 100;
      if (mode === 'annual') return pricingCfg.yearlyDiscountPercent / 100;
      return 0;
    };

    const formatAmount = (amount) => {
      const rounded = Math.round(amount * 100) / 100;
      return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
    };

    const pricingForMode = (monthlyList, mode) => {
      const monthlyCents = Math.round(monthlyList * 100);
      const multiplier = 1 - discountForMode(mode);
      const effectiveMonthlyCents = Math.round(monthlyCents * multiplier);
      const months = mode === 'quarterly' ? 3 : mode === 'annual' ? 12 : 1;
      const totalCents =
        mode === 'monthly' ? monthlyCents : Math.round(monthlyCents * months * multiplier);

      return {
        perMonth: effectiveMonthlyCents / 100,
        total: totalCents / 100,
        months
      };
    };

    const footnoteForMode = (monthlyList, mode) => {
      if (mode === 'monthly') return '';
      const { total, months } = pricingForMode(monthlyList, mode);
      const formatted = `${currencySymbol}${formatAmount(total)}`;
      return months === 3
        ? `${formatted} billed every 3 months (${taxSuffix})`
        : `${formatted} billed annually (${taxSuffix})`;
    };

    const setBilling = (mode) => {
      billingButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.billing === mode);
      });
      if (saveBadge) {
        saveBadge.textContent = saveBadgeText[mode] || saveBadgeText.monthly;
      }

      document.querySelectorAll('[data-plan-price]').forEach((el) => {
        const planKey = el.dataset.planPrice;
        const monthly = monthlyByPlan[planKey];
        if (monthly == null) return;
        el.textContent = formatAmount(pricingForMode(monthly, mode).perMonth);
        const footnote = el.closest('.price-card')?.querySelector('.price-billed');
        if (footnote) {
          const text = footnoteForMode(monthly, mode);
          footnote.textContent = text;
          footnote.hidden = !text;
        }
      });

      document.querySelectorAll('[data-price-monthly]').forEach((el) => {
        if (el.dataset.planPrice) return;
        const attr =
          mode === 'monthly'
            ? 'priceMonthly'
            : mode === 'quarterly'
              ? 'priceQuarterly'
              : 'priceAnnual';
        const price = el.dataset[attr] ?? el.dataset.priceMonthly;
        el.textContent = price;
      });
    };

    billingButtons.forEach((btn) => {
      btn.addEventListener('click', () => setBilling(btn.dataset.billing));
    });
    setBilling('monthly');
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const interest = data.get('interest') || 'demo';
      const params = new URLSearchParams({ enquiry: String(interest) });
      params.set('market', 'uk');
      window.location.href = `https://app.nextclaud.com/login?${params.toString()}`;
    });
  }
});
