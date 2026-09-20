(function applySiteIncludes() {
  const config = window.NC_SITE;
  if (!config) return;

  document.querySelectorAll('[data-nc-email]').forEach((el) => {
    el.setAttribute('href', `mailto:${config.email}`);
    el.textContent = config.email;
  });

  document.querySelectorAll('[data-nc-phone]').forEach((el) => {
    el.setAttribute('href', `tel:${config.phoneTel}`);
    el.textContent = config.phoneDisplay;
  });

  document.querySelectorAll('[data-nc-whatsapp]').forEach((el) => {
    el.setAttribute('href', `https://wa.me/${config.whatsApp}`);
  });

  document.querySelectorAll('[data-nc-pk-site]').forEach((el) => {
    el.setAttribute('href', config.pkSiteUrl);
  });
})();
