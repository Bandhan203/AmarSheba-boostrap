(function () {
  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function currency(amount) {
    return `Tk ${Number(amount || 0).toLocaleString()}`;
  }

  function icon(name) {
    return `<i class="${name}" aria-hidden="true"></i>`;
  }

  function shell(title, body, options) {
    const pageTitle = title ? `${escapeHtml(title)} | AmarSheba` : 'AmarSheba';
    const description = escapeHtml(options.description || 'AmarSheba Bootstrap mirror');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${description}">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="${escapeHtml(options.bodyClass || '')}">
${body}
</body>
</html>`;
  }

  function websiteNavbar(active) {
    const items = [
      ['Home', 'index.html', 'home'],
      ['Services', 'services.html', 'services'],
      ['How It Works', 'how-it-works.html', 'services'],
      ['Pricing', 'pricing.html', 'pricing'],
      ['Become a Provider', 'become-provider.html', 'become-provider'],
    ];

    return `
      <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-custom" id="mainNav">
        <div class="container">
          <a class="navbar-brand fw-extrabold fs-3 text-primary-mirror manrope" href="index.html">AmarSheba</a>
          <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto align-items-center gap-2">
              ${items.map(([label, href, key]) => `
                <li class="nav-item">
                  <a class="nav-link px-3 fw-semibold ${active === key ? 'text-primary-mirror' : 'text-muted'}" href="${href}">${label}</a>
                </li>`).join('')}
            </ul>
            <div class="d-flex align-items-center justify-content-center gap-3 mt-3 mt-lg-0">
              <a href="auth.html" class="text-decoration-none fw-semibold text-muted">Login</a>
              <a href="booking.html" class="btn btn-blue rounded-3 px-4 py-2 fw-semibold shadow-sm">Book a Service</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  function websiteFooter() {
    return `
      <footer class="bg-white border-top py-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-4">
              <h3 class="fw-extrabold text-primary-mirror manrope mb-2">AmarSheba</h3>
              <p class="text-muted small mb-3">Reliable home-service booking flows, ready to connect with backend APIs.</p>
              <div class="d-flex gap-3">
                <a href="#" class="footer-social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="footer-social-icon"><i class="fab fa-twitter"></i></a>
              </div>
            </div>
            <div class="col-lg-3">
              <h6 class="fw-bold mb-3">Company</h6>
              <ul class="list-unstyled small text-muted d-grid gap-2">
                <li><a href="index.html" class="text-muted text-decoration-none">Home</a></li>
                <li><a href="services.html" class="text-muted text-decoration-none">Services</a></li>
                <li><a href="about.html" class="text-muted text-decoration-none">About Us</a></li>
                <li><a href="contact.html" class="text-muted text-decoration-none">Contact Support</a></li>
              </ul>
            </div>
            <div class="col-lg-2">
              <h6 class="fw-bold mb-3">Legal</h6>
              <ul class="list-unstyled small text-muted d-grid gap-2">
                <li><a href="privacy.html" class="text-muted text-decoration-none">Privacy Policy</a></li>
                <li><a href="terms.html" class="text-muted text-decoration-none">Terms of Service</a></li>
                <li><a href="unauthorized.html" class="text-muted text-decoration-none">Unauthorized</a></li>
                <li><a href="session-expired.html" class="text-muted text-decoration-none">Session Expired</a></li>
              </ul>
            </div>
            <div class="col-lg-3">
              <h6 class="fw-bold mb-3">App Surfaces</h6>
              <ul class="list-unstyled small text-muted d-grid gap-2">
                <li><a href="auth.html" class="text-muted text-decoration-none">Customer Auth</a></li>
                <li><a href="customer-dashboard.html" class="text-muted text-decoration-none">Customer Dashboard</a></li>
                <li><a href="provider-app.html" class="text-muted text-decoration-none">Provider App</a></li>
                <li><a href="admin.html" class="text-muted text-decoration-none">Admin Panel</a></li>
              </ul>
            </div>
          </div>
          <div class="border-top mt-4 pt-4 text-center">
            <p class="text-muted smaller mb-0">© 2026 AmarSheba. Bootstrap frontend prepared for backend integration.</p>
          </div>
        </div>
      </footer>
    `;
  }

  function websitePage(content, options) {
    return shell(options.title, `
      ${websiteNavbar(options.activeNav)}
      <main class="page-offset">${content}</main>
      ${websiteFooter()}
    `, options);
  }

  function standalonePage(content, options) {
    return shell(options.title, content, options);
  }

  function dashboardSidebar(title, links, active) {
    return `
      <aside class="sidebar-mirror d-none d-lg-flex flex-column">
        <div class="sidebar-brand">
          <a href="index.html" class="text-decoration-none text-white">
            <div class="fw-extrabold fs-4 manrope">AmarSheba</div>
            <div class="small text-white-50">${escapeHtml(title)}</div>
          </a>
        </div>
        <nav class="flex-grow-1">
          ${links.map((link) => `
            <a class="nav-link-mirror ${active === link.id ? 'active' : ''}" href="${link.href}">
              <span class="nav-icon">${icon(link.icon)}</span>
              <span>${escapeHtml(link.label)}</span>
            </a>
          `).join('')}
        </nav>
      </aside>
    `;
  }

  function dashboardTopbar(title, subtitle) {
    return `
      <div class="dashboard-topbar bg-white border-bottom">
        <div class="container-fluid px-4 py-3 d-flex justify-content-between align-items-center gap-3">
          <div>
            <h1 class="manrope fw-extrabold fs-3 mb-1">${escapeHtml(title)}</h1>
            <p class="text-muted small mb-0">${escapeHtml(subtitle || '')}</p>
          </div>
        </div>
      </div>
    `;
  }

  function dashboardPage(content, options) {
    return shell(options.title, `
      <div class="dashboard-shell d-flex">
        ${dashboardSidebar(options.sidebarTitle, options.links || [], options.activeNav)}
        <div class="flex-grow-1 min-vh-100 bg-soft">
          ${dashboardTopbar(options.title, options.subtitle)}
          <main class="container-fluid px-4 py-4">${content}</main>
        </div>
      </div>
    `, options);
  }

  function heroSection(config) {
    const slides = (config.slides || []).map((slide, index) => `
      <img src="${slide}" class="hero-slide ${index === 0 ? 'active' : ''}" alt="Hero slide">
    `).join('');

    return `
      <section class="hero-mirror" data-hero-slider>
        ${slides}
        <div class="hero-overlay"></div>
        <div class="container hero-content px-4">
          <span class="hero-badge">${escapeHtml(config.badge || '')}</span>
          <h1 class="hero-title manrope">${config.title || ''}</h1>
          <p class="hero-subtitle">${escapeHtml(config.subtitle || '')}</p>
          ${config.search || ''}
          ${config.extra || ''}
        </div>
      </section>
    `;
  }

  function sectionHeading(title, subtitle, actionHtml) {
    return `
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
        <div>
          <h2 class="fw-extrabold manrope mb-2">${escapeHtml(title)}</h2>
          ${subtitle ? `<p class="text-muted fs-5 mb-0">${escapeHtml(subtitle)}</p>` : ''}
        </div>
        ${actionHtml || ''}
      </div>
    `;
  }

  function featureCard(item) {
    return `
      <div class="ag-card h-100">
        <div class="badge-stat mb-3" style="background:${escapeHtml(item.bg || '#E3F2FD')}; color:${escapeHtml(item.color || '#1E88E5')}">
          ${item.icon ? icon(item.icon) : escapeHtml(item.emoji || '*')}
        </div>
        <h5 class="fw-bold mb-2">${escapeHtml(item.title)}</h5>
        <p class="text-muted small mb-0">${escapeHtml(item.description)}</p>
      </div>
    `;
  }

  window.AmarShebaTemplates = {
    escapeHtml,
    currency,
    icon,
    shell,
    websitePage,
    standalonePage,
    dashboardPage,
    heroSection,
    sectionHeading,
    featureCard,
  };
})();
