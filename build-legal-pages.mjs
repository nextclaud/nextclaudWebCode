import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function extractSection(html, className) {
  const marker = `<section class="${className}"`;
  const start = html.indexOf(marker);
  if (start < 0) {
    throw new Error(`Missing section ${className}`);
  }

  const end = html.indexOf('</section>', start);
  return html.slice(start, end + '</section>'.length);
}

function transformLegal(sectionHtml) {
  let html = sectionHtml
    .replace('class="policy"', 'class="legal-content"')
    .replace('class="terms"', 'class="legal-content"')
    .replace(/<div class="container">\s*<div class="row">\s*<div class="col-md-12">\s*/s, '')
    .replace(/<h3>/g, '<h2>')
    .replace(/<\/h3>/g, '</h2>')
    .replace(/<div class="mb-3">\s*(<h2>[\s\S]*?<\/h2>)\s*<\/div>/g, '$1')
    .replace(/<div class="my-3">/g, '<section class="legal-section">');

  html = html.replace(
    /<div class="legal-content">\s*<div>\s*<h2>Privacy Policy<\/h2>\s*/,
    '<div class="legal-content"><div class="legal-intro">'
  );
  html = html.replace(
    /<div class="legal-content">\s*<div>\s*<h2>End User License Agreement \(EULA\)<\/h2>\s*/,
    '<div class="legal-content"><div class="legal-intro">'
  );

  html = html.replace(
    /(<div class="legal-intro">[\s\S]*?<\/p>)\s*(<section class="legal-section">)/,
    '$1</div>$2'
  );

  html = html.replace(/<\/div>\s*(?=<section class="legal-section">)/g, '</section>\n');
  html = html.replace(/<section class="legal-content"[^>]*>/, '<div class="legal-content">');
  html = html.replace(/<\/section>\s*$/, '</section></div>');
  html = html.replace(/<\/div>\s*<\/div>\s*$/, '</section></div>');

  return html
    .replace(
      /<div class="legal-content">\s*<div>\s*<h2>Privacy Policy<\/h2>\s*/g,
      '<div class="legal-content"><div class="legal-intro">'
    )
    .replace(
      /<div class="legal-content">\s*<div>\s*<h2>End User License Agreement \(EULA\)<\/h2>\s*/g,
      '<div class="legal-content"><div class="legal-intro">'
    )
    .replace(
      /(<div class="legal-intro">[\s\S]*?<\/p>)\s*<\/section>\s*<section class="legal-section">/,
      '$1</div><section class="legal-section">'
    )
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function pageShell(title, description, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — NextClaud</title>
  <meta name="description" content="${description}">
  <link rel="icon" href="assets/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="brand" aria-label="NextClaud home">
        <img src="assets/nextclaud-header-logo.png" alt="NextClaud" class="brand__logo" height="32" width="111">
      </a>
      <nav class="nav-desktop" aria-label="Primary">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="pricing.html">Pricing</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="header-actions">
        <a class="btn btn-secondary" href="https://app.nextclaud.com/login">Log in</a>
        <a class="btn btn-primary" href="contact.html">Book a demo</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
      </div>
    </div>
    <nav class="mobile-nav container" id="mobile-nav">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="pricing.html">Pricing</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main class="container legal-page">
    <a href="index.html" class="back-link">← Back to home</a>
    <h1>${title}</h1>
    ${body}
  </main>

  <footer class="site-footer">
    <div class="container footer-top">
      <a href="index.html" class="brand brand--footer" aria-label="NextClaud home">
        <img src="assets/nextclaud-logo-light.png" alt="NextClaud" class="brand__logo" height="28" width="97">
      </a>
      <span class="meta-badge">✓ Meta WhatsApp Business Platform</span>
    </div>
    <div class="container footer-grid">
      <div><p style="font-size:0.88rem;margin:0">Official WhatsApp Business API platform for teams who want inbox, templates, broadcasts, and developer tools in one place.</p></div>
      <div><h4>Product</h4><ul><li><a href="services.html">Services</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="https://app.nextclaud.com/login">Log in</a></li></ul></div>
      <div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy-policy.html">Privacy</a></li><li><a href="terms-and-conditions.html">Terms</a></li></ul></div>
      <div><h4>Contact</h4><ul><li><a href="mailto:support@nextclaud.com">support@nextclaud.com</a></li><li><a href="tel:+923368527111">+92 336 8527 111</a></li><li><a href="contact.html">Book a demo</a></li></ul></div>
    </div>
    <div class="container footer-bottom"><span>© 2026 NextClaud. All rights reserved.</span></div>
  </footer>
  <a class="wa-float" href="https://wa.me/923368527111" target="_blank" rel="noopener">💬 Talk to us</a>
  <script src="script.js"></script>
</body>
</html>`;
}

const privacySource = fs.readFileSync(path.join(repoRoot, '.curl-body-privacy.html'), 'utf8');
const termsSource = fs.readFileSync(path.join(repoRoot, '.curl-body-terms.html'), 'utf8');

const privacyBody = transformLegal(extractSection(privacySource, 'policy'));
const termsBody = transformLegal(extractSection(termsSource, 'terms'));

fs.writeFileSync(
  path.join(__dirname, 'privacy-policy.html'),
  pageShell('Privacy Policy', 'NextClaud Privacy Policy — how we collect, use, and protect your information.', privacyBody),
  'utf8'
);

fs.writeFileSync(
  path.join(__dirname, 'terms-and-conditions.html'),
  pageShell('Terms & Conditions', 'NextClaud Terms and Conditions — End User License Agreement for the platform.', termsBody),
  'utf8'
);

console.log('Generated privacy-policy.html and terms-and-conditions.html');
