(function () {
  const db = window.getAppDB();
  const T = window.AmarShebaTemplates;

  function readPageId() {
    return document.body.dataset.page || 'index';
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function getProvider(id) {
    return db.providers.find((provider) => provider.id === id) || db.providers[0];
  }

  function bookingLink(provider, serviceName) {
    const search = new URLSearchParams();
    search.set('provider', provider.id);
    search.set('cat', provider.category);
    if (serviceName) search.set('service', serviceName);
    return `booking.html?${search.toString()}`;
  }

  function providerCard(provider, href) {
    return `
      <div class="col">
        <a href="${href || bookingLink(provider, provider.services[0] && provider.services[0].name)}" class="text-decoration-none">
          <div class="service-card-mirror">
            <div class="service-img-wrap">
              <img src="${provider.photo}" alt="${provider.name}">
              <div class="rating-tag"><i class="fas fa-star text-warning me-1"></i>${provider.rating.toFixed(1)}</div>
              <span class="badge ${provider.type === 'expert' ? 'bg-purple-soft' : 'bg-green-soft'} rounded-pill fw-bold smaller position-absolute bottom-0 start-0 m-2">${provider.type === 'expert' ? 'Expert' : 'Local'}</span>
              ${provider.verified ? '<span class="badge bg-blue-soft rounded-pill fw-bold smaller position-absolute top-0 end-0 m-2"><i class="fas fa-shield-alt me-1"></i>Verified</span>' : ''}
            </div>
            <div class="service-card-body">
              <h5 class="fw-bold manrope mb-1 text-navy-dark">${provider.name}</h5>
              <p class="smaller text-muted fw-bold text-uppercase mb-3">${provider.category} | ${provider.area}</p>
              <p class="service-card-desc">${provider.description}</p>
              <div class="service-card-footer">
                <div>
                  <p class="smaller fw-bold text-uppercase text-muted mb-0">Starting from</p>
                  <p class="fw-extrabold text-primary-mirror fs-5 mb-0">${T.currency(provider.price)}</p>
                </div>
                <span class="btn btn-blue rounded-pill px-4 py-2 small fw-bold">Book Now</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  }

  function providerListCard(provider) {
    return `
      <div class="col">
        <a href="${bookingLink(provider, provider.services[0] && provider.services[0].name)}" class="text-decoration-none">
          <div class="provider-list-card h-100">
            <div class="provider-list-media">
              <img src="${provider.photo}" alt="${provider.name}">
              <span class="provider-type-badge ${provider.type === 'expert' ? 'expert' : 'local'}">${provider.type}</span>
              ${provider.verified ? '<span class="provider-verified-dot"><i class="fa-solid fa-circle-check"></i></span>' : ''}
            </div>
            <div class="provider-list-body">
              <div class="d-flex align-items-start justify-content-between gap-3 mb-2">
                <div>
                  <h5 class="fw-bold manrope text-navy-dark mb-1">${provider.name}</h5>
                  <div class="provider-meta-line">${provider.category} | ${provider.area} | ${provider.yearsExp}y exp</div>
                </div>
                <div class="provider-price">${T.currency(provider.price)}</div>
              </div>
              <div class="provider-rating-row mb-2">
                <span><i class="fas fa-star text-warning me-1"></i>${provider.rating.toFixed(1)}</span>
                <span>${provider.reviewCount}+ reviews</span>
                <span>${provider.jobsCompleted}+ jobs</span>
              </div>
              <p class="provider-snippet">${provider.description}</p>
              <div class="d-flex justify-content-end">
                <span class="btn btn-blue provider-book-btn">Continue</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  }

  function categoryGrid() {
    return db.categories.slice(0, 6).map((category) => `
      <div class="col">
        <a class="text-decoration-none" href="booking.html?cat=${category.id}">
          <div class="cat-card">
            <img src="${category.image || db.providers[0].photo}" alt="${category.name}">
            <div class="cat-card-overlay"><h5 class="cat-card-title manrope">${category.name}</h5></div>
          </div>
        </a>
      </div>
    `).join('');
  }

  function pageLead(title, body) {
    return `
      <section class="page-hero page-hero-blue">
        <div class="container text-center py-5">
          <h1 class="manrope fw-extrabold text-white mb-3">${title}</h1>
          <p class="text-white-50 mb-0">${body}</p>
        </div>
      </section>
    `;
  }

  function renderHome() {
    const hero = T.heroSection({
      slides: db.website.home.slides,
      badge: 'Trusted by 10k+ Households',
      title: 'Professional Services<br><span style="color:#93C5FD;">at Your Doorstep.</span>',
      subtitle: 'Vetted experts, predictable pricing, and a booking flow that can plug straight into production APIs.',
      search: `
        <div class="search-wrapper-mirror w-100">
          <form class="search-inner" action="booking.html" method="get">
            <div class="search-field flex-grow-1">
              <i class="fas fa-search text-muted me-3"></i>
              <input type="text" name="q" placeholder="What service do you need?">
            </div>
            <div class="search-field flex-grow-1">
              <i class="fas fa-map-marker-alt text-muted me-3"></i>
              <input type="text" name="area" placeholder="Enter your area">
            </div>
            <button class="btn btn-blue rounded-3 px-5 py-3 fw-bold flex-shrink-0" type="submit">Search</button>
          </form>
        </div>
      `,
      extra: `
        <div class="mt-4 d-flex align-items-center gap-3">
          <div class="d-flex">
            <img src="https://i.pravatar.cc/100?u=a1" class="rounded-circle border border-white border-2" width="40" height="40" alt="">
            <img src="https://i.pravatar.cc/100?u=a2" class="rounded-circle border border-white border-2 ms-n2" width="40" height="40" alt="">
            <img src="https://i.pravatar.cc/100?u=a3" class="rounded-circle border border-white border-2 ms-n2" width="40" height="40" alt="">
          </div>
          <p class="mb-0 small fw-semibold opacity-90"><i class="fas fa-star text-warning me-1"></i>4.9/5 average customer rating</p>
        </div>
      `
    });

    const whyCards = [
      { title: 'API-ready forms', description: 'Auth, provider onboarding, and booking pages now submit clean field names for backend integration.', icon: 'fa-solid fa-plug', bg: '#E3F2FD', color: '#1E88E5' },
      { title: 'Verified professionals', description: 'Customers can browse trusted local and expert providers with service and pricing context upfront.', icon: 'fa-solid fa-shield-halved', bg: '#E8F5E9', color: '#4CAF50' },
      { title: 'Simple public surface', description: 'Only the public Bootstrap pages remain, which makes routing and backend wiring much easier to maintain.', icon: 'fa-solid fa-layer-group', bg: '#FFF3E0', color: '#FF9800' }
    ];

    return T.websitePage(`
      ${hero}
      <section class="bg-white py-5">
        <div class="container py-4">
          ${T.sectionHeading('Explore Categories', 'Start with the service type and move directly into booking.', '<a href="services.html" class="text-primary-mirror fw-bold text-decoration-none small">View All Services <i class="fas fa-arrow-right ms-1"></i></a>')}
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">${categoryGrid()}</div>
        </div>
      </section>
      <section class="home-soft-section py-5">
        <div class="container py-4">
          <div class="row g-4 align-items-center">
            <div class="col-lg-6">
              <div class="home-why-image-wrap">
                <img class="img-fluid rounded-4 shadow-card" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1000&q=80" alt="Why choose us">
                <div class="home-floating-badge"><strong>Ready</strong><span>Public routes only</span></div>
              </div>
            </div>
            <div class="col-lg-6">
              <h2 class="fw-extrabold manrope home-section-title mb-4">A leaner frontend for production backend work</h2>
              <div class="d-grid gap-3">${whyCards.map((item) => `
                <div class="why-list-card">
                  <div class="why-icon" style="background:${item.bg}; color:${item.color}"><i class="${item.icon}"></i></div>
                  <div>
                    <h5 class="fw-bold mb-1">${item.title}</h5>
                    <p class="text-muted small mb-0">${item.description}</p>
                  </div>
                </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-white py-5">
        <div class="container py-4">
          ${T.sectionHeading('Top Rated Professionals', 'Choose a provider and continue straight to a backend-ready booking form.', '<div class="small text-muted">Customer-facing only</div>')}
          <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">${db.providers.slice(0, 4).map((provider) => providerCard(provider)).join('')}</div>
        </div>
      </section>
      <section class="promo-band">
        <div class="container">
          <div class="promo-band-inner">
            <div>
              <div class="text-white fw-bold mb-1">Start with the public booking flow</div>
              <div class="text-white-50 small">Search, compare, select a provider, and submit the order.</div>
              <a href="booking.html" class="btn btn-light rounded-pill px-4 py-2 fw-bold text-primary-mirror mt-3">Book a Service</a>
            </div>
            <i class="fas fa-gift promo-gift"></i>
          </div>
        </div>
      </section>
    `, { title: 'Home', activeNav: 'home', description: 'Professional services at your doorstep' });
  }

  function renderServicesPage() {
    const search = params();
    const activeCategory = search.get('cat') || 'all';
    const categories = [{ id: 'all', name: 'All', color: '#004AC6', bg: '#EFF4FF' }].concat(
      db.categories.map((category) => ({
        id: category.id,
        name: category.name,
        color: category.color,
        bg: category.bg,
      }))
    );
    const visibleCategories = activeCategory === 'all'
      ? db.categories
      : db.categories.filter((category) => category.id === activeCategory);

    return T.websitePage(`
      ${pageLead('Compare Services', 'Browse categories, pricing cues, and service packages before continuing to booking.')}
      <div class="service-sticky-nav">
        <div class="container py-3">
          <div class="service-chip-row no-scrollbar">
            ${categories.map((category) => `
              <a href="services.html${category.id === 'all' ? '' : `?cat=${category.id}`}" class="service-chip ${activeCategory === category.id ? 'active' : ''}" style="${activeCategory === category.id ? `--chip-bg:${category.color};--chip-text:#fff;--chip-border:${category.color};` : `--chip-bg:#fff;--chip-text:#475569;--chip-border:#E2E8F0;`}">
                <span>${category.name}</span>
              </a>`).join('')}
          </div>
        </div>
      </div>
      <main class="container py-5 service-page-main">
        <section class="d-grid gap-4 gap-lg-5">
          ${visibleCategories.map((category) => {
            const detail = db.website.servicesPage.listingDetails.find((item) => item.id === category.id);
            if (!detail) return '';
            const providers = db.providers.filter((provider) => provider.category === category.id);
            const expertCount = providers.filter((provider) => provider.type === 'expert').length;
            const averageRating = providers.length ? (providers.reduce((sum, provider) => sum + provider.rating, 0) / providers.length).toFixed(1) : 'N/A';
            const minimumPrice = providers.length ? Math.min(...providers.map((provider) => provider.price)) : 0;
            return `
              <article class="service-detail-card">
                <div class="row g-0 h-100">
                  <div class="col-lg-6 col-xl-5">
                    <div class="service-detail-image-wrap">
                      <img src="${detail.image}" alt="${detail.titleEn}">
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7">
                    <div class="service-detail-body">
                      <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                          <div class="service-bn-label">${detail.titleBn}</div>
                          <h3 class="service-detail-title">${detail.titleEn}</h3>
                        </div>
                        <span class="service-premium-badge">Active</span>
                      </div>
                      <div class="row g-3 mt-1">
                        <div class="col-4"><div class="service-stat-box"><div class="service-stat-label">Providers</div><div class="service-stat-value">${providers.length}</div></div></div>
                        <div class="col-4"><div class="service-stat-box purple"><div class="service-stat-label">Experts</div><div class="service-stat-value">${expertCount}</div></div></div>
                        <div class="col-4"><div class="service-stat-box amber"><div class="service-stat-label">Rating</div><div class="service-stat-value">${averageRating}</div></div></div>
                      </div>
                      <p class="service-detail-copy">${detail.shortDescription}</p>
                      <div>
                        <h4 class="service-subheading">Services Offered</h4>
                        <div class="service-offered-grid">
                          ${detail.servicesOffered.map((service) => `
                            <div class="service-offered-item">
                              <i class="fa-solid fa-circle-check" style="color:${category.color}"></i>
                              <span>${service}</span>
                            </div>`).join('')}
                        </div>
                      </div>
                      <div class="service-pricing-bar" style="--service-color:${category.color}">
                        <div>
                          <div class="service-price-label">Starting from</div>
                          <div class="service-price-value">${T.currency(minimumPrice)}</div>
                        </div>
                        <a href="booking.html?cat=${category.id}" class="btn service-price-cta">View Providers</a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>`;
          }).join('')}
        </section>
        <section class="service-trust-box mt-5">
          <h2 class="service-section-title">Why Book From Us</h2>
          <p class="service-section-copy">The public Bootstrap version now stays focused on discovery and transaction handoff.</p>
          <div class="d-grid gap-3 mt-4">
            ${db.website.servicesPage.trustItems.map((item) => `
              <div class="service-trust-item">
                <i class="fa-solid fa-circle-check"></i>
                <span>${item}</span>
              </div>`).join('')}
          </div>
        </section>
      </main>
    `, { title: 'Services', activeNav: 'services' });
  }

  function renderPricingPage() {
    const plans = db.website.pricingPlans;
    return T.websitePage(`
      ${pageLead('Simple, Honest Pricing', 'Choose the right subscription or book on demand.')}
      <section class="bg-white py-5">
        <div class="container py-4">
          <div class="text-center mb-5">
            <h2 class="manrope fw-extrabold mb-2">Choose Your Plan</h2>
            <p class="text-muted small mb-3">Start free, upgrade when your household books more often.</p>
            <div class="billing-toggle"><span class="active">Monthly</span><span>Yearly (20% off)</span></div>
          </div>
          <div class="row g-4 justify-content-center">${plans.map((plan, index) => `
            <div class="col-lg-4 col-md-6">
              <div class="pricing-card ${index === 1 ? 'featured' : ''}">
                ${plan.badge ? `<div class="pricing-badge">${plan.badge}</div>` : ''}
                <div class="small text-muted fw-semibold mb-2">${plan.name}</div>
                <div class="pricing-price mb-1">${T.currency(plan.monthly)}</div>
                <div class="small text-muted mb-3">/ month</div>
                <p class="small text-muted mb-4">${plan.description}</p>
                <div class="d-grid gap-2 mb-4">${plan.features.map((item) => `<div class="pricing-feature"><i class="fa-regular fa-circle-check"></i><span>${item}</span></div>`).join('')}</div>
                <a href="auth.html?intent=plan&plan=${encodeURIComponent(plan.name)}" class="btn btn-blue rounded-4 w-100 py-3 fw-bold">${index === 0 ? 'Start Free' : index === 1 ? 'Choose Plus' : 'Choose Pro'}</a>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </section>
      <section class="home-soft-section py-5">
        <div class="container py-4">
          <div class="text-center mb-5">
            <h2 class="manrope fw-extrabold mb-2">Pricing by Service</h2>
            <p class="text-muted small mb-0">Indicative local and expert pricing across top categories.</p>
          </div>
          <div class="row g-4">${db.website.servicePricing.map((item) => `
            <div class="col-lg-3 col-md-6">
              <div class="service-price-card">
                <h5 class="fw-bold mb-3">${item.name}</h5>
                <div class="service-price-band"><span>Local</span><strong>${item.local}</strong></div>
                <div class="service-price-band expert"><span>Expert</span><strong>${item.expert}</strong></div>
                <a href="booking.html" class="text-primary-mirror small fw-bold text-decoration-none">Book This Service</a>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </section>
    `, { title: 'Pricing', activeNav: 'pricing' });
  }

  function renderBecomeProviderPage() {
    return T.websitePage(`
      <section class="page-hero page-hero-green">
        <div class="container text-center py-5">
          <span class="hero-badge small">GROW YOUR BUSINESS</span>
          <h1 class="manrope fw-extrabold text-white mb-3">Become a Provider</h1>
          <p class="text-white-50 mb-4">Join verified service professionals on AmarSheba and send your application straight into backend onboarding.</p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a href="auth.html?role=provider" class="btn btn-light rounded-pill px-4 py-2 fw-bold text-success">Create Account</a>
            <a href="pricing.html" class="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">See Fees</a>
          </div>
        </div>
      </section>
      <section class="bg-white py-4">
        <div class="container">
          <div class="row g-3">${db.website.providerStats.map((item) => `
            <div class="col-lg-3 col-6">
              <div class="mini-stat-card text-center">
                <div class="fw-extrabold mb-1">${item.label}</div>
                <div class="small text-muted">${item.sublabel}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </section>
      <section class="home-soft-section py-5">
        <div class="container py-4">
          <div class="text-center mb-5">
            <h2 class="manrope fw-extrabold mb-2">Why Join AmarSheba</h2>
            <p class="text-muted small mb-0">Tools, trust, and city-wide demand for local and expert providers.</p>
          </div>
          <div class="row g-4">${db.website.providerBenefits.map((item) => `
            <div class="col-lg-4 col-md-6">
              <div class="provider-benefit-card h-100">
                <div class="provider-benefit-icon"><i class="${item.icon}"></i></div>
                <h5 class="fw-bold mb-2">${item.title}</h5>
                <p class="small text-muted mb-0">${item.body}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </section>
      <section class="bg-white py-5">
        <div class="container py-4">
          <div class="row g-4 align-items-start">
            <div class="col-lg-6">
              <div class="text-center text-lg-start mb-4">
                <h2 class="manrope fw-extrabold mb-2">Apply in 4 Steps</h2>
                <p class="text-muted small mb-0">Collect clean provider lead data now and complete the rest in your backend workflow.</p>
              </div>
              <div class="row g-4">${db.website.providerSteps.map((item, index) => `
                <div class="col-md-6">
                  <div class="join-step-card h-100">
                    <div class="join-step-number">${index + 1}</div>
                    <h5 class="fw-bold mb-2">${item.title}</h5>
                    <p class="small text-muted mb-0">${item.body}</p>
                  </div>
                </div>`).join('')}
              </div>
            </div>
            <div class="col-lg-6">
              <div class="ag-card">
                <h3 class="fw-bold mb-3">Provider Application Form</h3>
                <p class="text-muted small mb-4">Suggested action: <code>POST /api/provider-applications</code></p>
                <form method="post" action="/api/provider-applications" class="row g-3">
                  <div class="col-md-6">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_name">Full Name</label>
                    <input class="form-control rounded-4 py-3" id="provider_name" name="full_name" required>
                  </div>
                  <div class="col-md-6">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_phone">Phone</label>
                    <input class="form-control rounded-4 py-3" id="provider_phone" name="phone" required>
                  </div>
                  <div class="col-md-6">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_email">Email</label>
                    <input class="form-control rounded-4 py-3" type="email" id="provider_email" name="email" required>
                  </div>
                  <div class="col-md-6">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_area">Coverage Area</label>
                    <input class="form-control rounded-4 py-3" id="provider_area" name="coverage_area" placeholder="Gulshan, Banani" required>
                  </div>
                  <div class="col-md-6">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_category">Primary Category</label>
                    <select class="form-select rounded-4 py-3" id="provider_category" name="service_category" required>
                      <option value="">Select category</option>
                      ${db.categories.map((item) => `<option value="${item.id}">${item.name}</option>`).join('')}
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_type">Provider Type</label>
                    <select class="form-select rounded-4 py-3" id="provider_type" name="provider_type" required>
                      <option value="local">Local Provider</option>
                      <option value="expert">Expert Provider</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="provider_notes">Experience Summary</label>
                    <textarea class="form-control rounded-4" id="provider_notes" name="experience_summary" rows="4" placeholder="Skills, years of experience, certifications, team size"></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-blue rounded-4 px-4 py-3 fw-bold">Submit Application</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `, { title: 'Become a Provider', activeNav: 'become-provider' });
  }

  function renderAuth() {
    return T.standalonePage(`
      <div class="panel-shell py-5">
        <div class="container" style="max-width:1120px;">
          <div class="row g-4 align-items-stretch">
            <div class="col-lg-7">
              <div class="auth-card h-100">
                <div class="mb-5">
                  <h3 class="fw-extrabold manrope text-primary-mirror mb-1">AmarSheba</h3>
                  <p class="smaller text-muted mb-0">Customer sign in and registration forms prepared for backend API wiring.</p>
                </div>
                <div class="bg-light rounded-4 p-1 d-flex mb-4">
                  <button class="btn rounded-3 flex-grow-1 py-2 fw-bold small bg-white shadow-sm" type="button">Log In</button>
                  <button class="btn rounded-3 flex-grow-1 py-2 fw-bold small text-muted" type="button">Register</button>
                </div>
                <form method="post" action="/api/auth/login" class="d-grid gap-4">
                  <input type="hidden" name="channel" value="web-bootstrap">
                  <div>
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="auth_login_id">Email or Phone</label>
                    <input class="form-control rounded-4 py-3" id="auth_login_id" name="identifier" placeholder="your@email.com / 017XXXXXXXX" required>
                  </div>
                  <div>
                    <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="auth_password">Password</label>
                    <input type="password" class="form-control rounded-4 py-3" id="auth_password" name="password" placeholder="Enter password" required>
                  </div>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="auth_role">Role</label>
                      <select class="form-select rounded-4 py-3" id="auth_role" name="role">
                        <option value="customer">Customer</option>
                        <option value="provider">Provider</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="auth_redirect">Redirect Path</label>
                      <input class="form-control rounded-4 py-3" id="auth_redirect" name="redirect_to" value="/dashboard" required>
                    </div>
                  </div>
                  <button type="submit" class="panel-btn-primary border-0">Sign In <i class="fas fa-arrow-right small ms-1"></i></button>
                </form>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="auth-card h-100">
                <div class="small fw-bold text-primary-mirror mb-3"><i class="fas fa-user-plus me-2"></i>Customer Registration</div>
                <h2 class="fw-bold manrope mb-3">Create account</h2>
                <p class="text-muted smaller mb-4">Suggested endpoint: <code>POST /api/auth/register</code></p>
                <form method="post" action="/api/auth/register" class="d-grid gap-3">
                  <input type="hidden" name="account_type" value="customer">
                  <input class="form-control rounded-4 py-3" name="full_name" placeholder="Full name" required>
                  <input class="form-control rounded-4 py-3" type="email" name="email" placeholder="name@example.com" required>
                  <input class="form-control rounded-4 py-3" name="phone" placeholder="017XXXXXXXX" required>
                  <input class="form-control rounded-4 py-3" type="password" name="password" placeholder="Create password" required>
                  <button type="submit" class="btn btn-blue rounded-4 py-3 fw-bold">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `, { title: 'Auth', bodyClass: 'bg-soft' });
  }

  function filteredProviders() {
    const search = params();
    const activeCategory = search.get('cat') || 'all';
    const activeArea = (search.get('area') || '').toLowerCase();
    const activeType = search.get('type') || 'all';
    const query = (search.get('q') || '').toLowerCase();
    let list = db.providers.filter((provider) => {
      const matchesCategory = activeCategory === 'all' || provider.category === activeCategory;
      const matchesArea = !activeArea || provider.area.toLowerCase().includes(activeArea);
      const matchesType = activeType === 'all' || provider.type === activeType;
      const matchesQuery = !query
        || provider.name.toLowerCase().includes(query)
        || provider.category.toLowerCase().includes(query)
        || provider.description.toLowerCase().includes(query);
      return matchesCategory && matchesArea && matchesType && matchesQuery;
    });
    if (!list.length) list = db.providers;
    return list;
  }

  function renderProvidersPage() {
    const search = params();
    const activeCategory = search.get('cat') || 'all';
    const activeType = search.get('type') || 'all';
    const list = filteredProviders();
    const filters = `
      <div class="category-bar mb-3">${['all'].concat(db.categories.map((item) => item.id)).map((id) => {
        const label = id === 'all' ? 'All' : db.categories.find((item) => item.id === id).name;
        return `<a href="booking.html${id === 'all' ? '' : `?cat=${id}`}" class="category-pill ${id === activeCategory ? 'active' : ''}" data-category="${id}">${label}</a>`;
      }).join('')}</div>
      <div class="d-flex flex-wrap gap-2 mb-4">
        <a href="booking.html" class="filter-chip ${activeType === 'all' ? 'active-blue' : ''}" data-filter="all">All</a>
        <a href="booking.html?type=local" class="filter-chip ${activeType === 'local' ? 'active-green' : ''}" data-filter="local">Local</a>
        <a href="booking.html?type=expert" class="filter-chip ${activeType === 'expert' ? 'active-purple' : ''}" data-filter="expert">Expert</a>
      </div>
    `;

    return T.websitePage(`
      <section class="find-hero-section">
        <div class="container py-5">
          <div class="find-hero-copy">
            <h1 class="manrope fw-extrabold text-white mb-2">Book a Service</h1>
            <p class="text-white-50 mb-4">Compare providers, then continue to a booking form that posts to your backend.</p>
            <form action="booking.html" method="get" class="find-search-bar">
              <input type="text" name="q" placeholder="Search by skills, category, area...">
              <button class="btn btn-blue rounded-pill px-4" type="submit"><i class="fas fa-search me-2"></i>Search</button>
            </form>
          </div>
        </div>
      </section>
      <section class="bg-white py-5">
        <div class="container py-4">
          <div class="row g-4 align-items-start">
            <div class="col-xl-3">
              <div class="filter-panel">
                <div class="fw-bold mb-3">Filters</div>
                <div class="small text-muted text-uppercase mb-2">Service Category</div>
                <div class="d-grid gap-2 mb-4">${['all'].concat(db.categories.map((item) => item.id)).map((id) => {
                  const label = id === 'all' ? 'All Categories' : db.categories.find((item) => item.id === id).name;
                  return `<a href="booking.html${id === 'all' ? '' : `?cat=${id}`}" class="side-filter-link ${id === activeCategory ? 'active' : ''}">${label}</a>`;
                }).join('')}</div>
                <div class="small text-muted text-uppercase mb-2">Provider Type</div>
                <div class="d-grid gap-2 mb-4">
                  <a href="booking.html" class="side-filter-link ${activeType === 'all' ? 'active' : ''}">All</a>
                  <a href="booking.html?type=local" class="side-filter-link ${activeType === 'local' ? 'active' : ''}">Local Provider</a>
                  <a href="booking.html?type=expert" class="side-filter-link ${activeType === 'expert' ? 'active' : ''}">Expert Provider</a>
                </div>
                <div class="small text-muted text-uppercase mb-2">Flow</div>
                <div class="small text-muted d-grid gap-2">
                  <span>1. Choose provider</span>
                  <span>2. Fill booking form</span>
                  <span>3. Submit to API</span>
                </div>
              </div>
            </div>
            <div class="col-xl-9">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
                <div class="small text-muted">Showing ${list.length} providers</div>
                <div class="find-toolbar">
                  ${filters}
                  <button class="sort-pill active" type="button">Top Rating</button>
                </div>
              </div>
              <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">${list.map((provider) => providerListCard(provider)).join('')}</div>
            </div>
          </div>
        </div>
      </section>
    `, { title: 'Book a Service', activeNav: 'services' });
  }

  function renderBookingForm() {
    const provider = getProvider(params().get('provider'));
    const selectedService = params().get('service');
    const service = provider.services.find((item) => item.name === selectedService) || provider.services[0];
    const subtotal = service.price;
    const fee = Math.round(subtotal * 0.05);
    const total = subtotal + fee;
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    return T.websitePage(`
      <section class="bg-white border-bottom py-3">
        <div class="container">
          <div class="small text-muted">Provider selected. Complete the booking and submit it to your backend.</div>
        </div>
      </section>
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-7">
              <div class="ag-card">
                <div class="d-flex align-items-center gap-3 mb-4">
                  <img src="${provider.photo}" alt="${provider.name}" class="rounded-4 object-fit-cover" width="72" height="72">
                  <div>
                    <h3 class="fw-bold mb-0">${provider.name}</h3>
                    <p class="text-muted mb-0">${provider.area} | ${provider.category}</p>
                  </div>
                </div>
                <form id="booking-form" method="post" action="/api/bookings" class="d-grid gap-4">
                  <input type="hidden" name="provider_id" value="${provider.id}">
                  <input type="hidden" name="service_category" value="${provider.category}">
                  <input type="hidden" name="source_page" value="booking">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="booking_service">Service</label>
                      <select class="form-select rounded-4 py-3" id="booking_service" name="service_name" required>
                        ${provider.services.map((item) => `<option value="${item.name}" ${item.name === service.name ? 'selected' : ''}>${item.name} - ${T.currency(item.price)}</option>`).join('')}
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="booking_date">Date</label>
                      <input class="form-control rounded-4 py-3" id="booking_date" name="service_date" type="date" min="${tomorrow}" required>
                    </div>
                    <div class="col-md-6">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="booking_time">Time</label>
                      <select class="form-select rounded-4 py-3" id="booking_time" name="service_time" required>
                        <option value="09:00">09:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="booking_phone">Contact Number</label>
                      <input class="form-control rounded-4 py-3" id="booking_phone" name="contact_phone" type="tel" placeholder="017XXXXXXXX" required>
                    </div>
                    <div class="col-12">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="booking_address">Service Address</label>
                      <input class="form-control rounded-4 py-3" id="booking_address" name="service_address" placeholder="House 12, Road 4, Gulshan-1" required>
                    </div>
                    <div class="col-12">
                      <label class="smaller fw-bold text-muted text-uppercase mb-2 d-block" for="booking_notes">Instructions</label>
                      <textarea class="form-control rounded-4" id="booking_notes" name="special_instructions" rows="4" placeholder="Access notes, urgency, special tools, or service details"></textarea>
                    </div>
                  </div>
                  <div>
                    <label class="smaller fw-bold text-muted text-uppercase mb-3 d-block">Payment Method</label>
                    <div class="row g-2">
                      ${[['bkash', 'bKash'], ['nagad', 'Nagad'], ['card', 'Card'], ['cash', 'Cash on Delivery']].map(([value, label], index) => `
                        <div class="col-md-6">
                          <label class="border rounded-4 p-3 d-flex align-items-center gap-2 w-100">
                            <input type="radio" name="payment_method" value="${value}" ${index === 0 ? 'checked' : ''}>
                            <span class="fw-semibold">${label}</span>
                          </label>
                        </div>`).join('')}
                    </div>
                  </div>
                  <div class="d-flex flex-wrap gap-3">
                    <button type="submit" class="btn btn-blue px-4 py-3 rounded-4 fw-bold">Submit Booking</button>
                    <a href="booking.html" class="btn btn-light border-light px-4 py-3 rounded-4 fw-bold">Back to Provider List</a>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="ag-card sticky-top" style="top:100px;">
                <h4 class="fw-bold mb-4">Order Summary</h4>
                <div class="d-flex justify-content-between mb-2"><span>Provider</span><span class="fw-bold">${provider.name}</span></div>
                <div class="d-flex justify-content-between mb-2"><span>Service</span><span class="fw-bold">${service.name}</span></div>
                <div class="d-flex justify-content-between mb-2"><span>Subtotal</span><span>${T.currency(subtotal)}</span></div>
                <div class="d-flex justify-content-between mb-2"><span>Platform Fee</span><span>${T.currency(fee)}</span></div>
                <div class="d-flex justify-content-between pt-3 border-top fw-bold fs-5"><span>Total</span><span class="text-primary-mirror">${T.currency(total)}</span></div>
                <div class="bg-blue-soft rounded-4 p-3 mt-4 small">
                  <strong>Payload:</strong> provider_id, service_category, service_name, service_date, service_time, service_address, contact_phone, special_instructions, payment_method.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `, { title: 'Booking', activeNav: 'services' });
  }

  function renderSimpleWebsitePage(title, lead, sections, activeNav) {
    return T.websitePage(`
      <section class="py-5 bg-white">
        <div class="container py-5">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <h1 class="manrope fw-extrabold display-5 mb-3">${title}</h1>
              <p class="lead text-muted mb-5">${lead}</p>
              <div class="row g-4">
                ${sections.map((section) => `
                  <div class="col-md-6">
                    <div class="ag-card h-100">
                      <h5 class="fw-bold mb-3">${section.title}</h5>
                      <p class="text-muted small mb-0">${section.body}</p>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    `, { title, activeNav: activeNav || 'home' });
  }

  function renderWallet() {
    return T.websitePage(`
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-4">
              <div class="ag-card">
                <div class="small text-muted mb-2">Current Balance</div>
                <div class="display-6 fw-extrabold text-primary-mirror">${T.currency(db.wallet.currentBalance)}</div>
                <div class="small text-muted mt-3">Pending Refund: ${T.currency(db.wallet.pendingRefund)}</div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="ag-card">
                <h4 class="fw-bold mb-4">Recent Transactions</h4>
                <div class="table-responsive">
                  <table class="table align-middle">
                    <thead><tr><th>ID</th><th>Method</th><th class="text-end">Amount</th></tr></thead>
                    <tbody>
                      ${db.wallet.transactions.map((item) => `<tr><td>${item.id}</td><td>${item.method}</td><td class="text-end fw-bold">${T.currency(item.amount)}</td></tr>`).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `, { title: 'Wallet', activeNav: 'home' });
  }

  function renderRoleAccess() {
    return T.standalonePage(`
      <div class="panel-shell px-4 py-5">
        <div class="container" style="max-width:1100px;">
          <div class="row g-4">
            <div class="col-lg-7">
              <div class="auth-card h-100">
                <h1 class="fw-extrabold manrope mb-2">Role Access</h1>
                <p class="text-muted mb-4">Choose a role to continue. This mirrors the shared-access flow from the TypeScript app.</p>
                <div class="d-grid gap-3">
                  ${db.roleAccess.map((item) => `
                    <a href="${item.path}" class="text-decoration-none">
                      <div class="role-card" style="background:${item.color}12;border-color:${item.color};">
                        <div class="d-flex align-items-center gap-3">
                          <div class="rounded-4 d-flex align-items-center justify-content-center" style="width:42px;height:42px;background:${item.color}1a;">
                            <i class="${item.icon}" style="color:${item.color}"></i>
                          </div>
                          <div class="flex-grow-1">
                            <div class="fw-bold text-dark">${item.label}</div>
                            <div class="small text-muted">Route: ${item.path}</div>
                          </div>
                        </div>
                      </div>
                    </a>`).join('')}
                </div>
                <a href="index.html" class="btn btn-light border rounded-4 w-100 mt-4 py-3 fw-semibold">Back to Home</a>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="auth-card h-100">
                <div class="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 small fw-semibold mb-4" style="background:#EEF4FF;color:#004AC6;">
                  <i class="fa-solid fa-shield-halved"></i>
                  Shared Access Info
                </div>
                <h2 class="fw-bold manrope mb-2">Shared Credentials</h2>
                <p class="text-muted small mb-4">Use these demo credentials for local role previews.</p>
                <div class="d-grid gap-3">
                  ${[
                    ['customer', 'customer@amarsheba.com', 'Customer@1234'],
                    ['provider', 'provider@amarsheba.com', 'Provider@1234'],
                    ['resource', 'resource@amarsheba.com', 'Resource@1234'],
                    ['admin', 'admin@amarsheba.com', 'Admin@1234']
                  ].map((item) => `
                    <div class="rounded-4 border bg-light p-3">
                      <div class="d-flex justify-content-between mb-2">
                        <div class="small fw-bold text-uppercase text-muted">${item[0]} Credentials</div>
                      </div>
                      <div class="row g-2">
                        <div class="col-6">
                          <div class="smaller text-muted">ID</div>
                          <div class="small fw-semibold text-dark text-break">${item[1]}</div>
                        </div>
                        <div class="col-6">
                          <div class="smaller text-muted">Password</div>
                          <div class="small fw-semibold text-dark text-break">${item[2]}</div>
                        </div>
                      </div>
                    </div>`).join('')}
                </div>
                <div class="rounded-4 border p-3 mt-4" style="background:#EFF6FF;border-color:#BFDBFE;">
                  <div class="small fw-semibold text-primary-mirror">Requested Redirect</div>
                  <div class="fw-bold mt-1">/dashboard</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `, { title: 'Access', bodyClass: 'bg-soft' });
  }

  function renderUtility(title, message, ctaHref, ctaLabel) {
    return T.websitePage(`
      <section class="py-5">
        <div class="container py-5">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="ag-card text-center">
                <div class="display-5 fw-extrabold mb-3">${title}</div>
                <p class="text-muted mb-4">${message}</p>
                <a href="${ctaHref}" class="btn btn-blue px-4 py-3 rounded-4 fw-bold">${ctaLabel}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `, { title, activeNav: 'home' });
  }

  function renderSimpleDashboardPage(roleName, title, content, activeNav) {
    const linksByKind = {
      customer: [
        { id: 'dashboard', label: 'Dashboard', href: 'customer-dashboard.html', icon: 'fa-solid fa-chart-line' },
        { id: 'find', label: 'Find Services', href: 'providers.html', icon: 'fa-solid fa-location-dot' },
        { id: 'bookings', label: 'My Bookings', href: 'my-bookings.html', icon: 'fa-solid fa-clipboard-list' },
        { id: 'wallet', label: 'Wallet', href: 'wallet.html', icon: 'fa-solid fa-wallet' },
        { id: 'claims', label: 'Claims', href: 'claims-center.html', icon: 'fa-regular fa-circle-question' },
        { id: 'profile', label: 'Profile', href: 'customer-profile.html', icon: 'fa-regular fa-user' }
      ],
      provider: [
        { id: 'dashboard', label: 'Dashboard', href: 'provider-app.html', icon: 'fa-solid fa-chart-line' },
        { id: 'bookings', label: 'Live Bookings', href: 'provider-bookings.html', icon: 'fa-solid fa-calendar-check' },
        { id: 'team', label: 'Team', href: 'provider-team.html', icon: 'fa-solid fa-users' },
        { id: 'earnings', label: 'Earnings', href: 'provider-earnings-report.html', icon: 'fa-solid fa-money-bill-trend-up' },
        { id: 'kyc', label: 'Verification', href: 'provider-kyc.html', icon: 'fa-solid fa-shield-halved' },
        { id: 'profile', label: 'Profile', href: 'provider-profile.html', icon: 'fa-regular fa-user' }
      ],
      resource: [
        { id: 'dashboard', label: 'Dashboard', href: 'resource-app.html', icon: 'fa-solid fa-briefcase' },
        { id: 'assignments', label: 'Assignments', href: 'resource-assignments.html', icon: 'fa-solid fa-list-check' },
        { id: 'history', label: 'Completed', href: 'resource-history.html', icon: 'fa-solid fa-circle-check' },
        { id: 'messages', label: 'Messages', href: 'resource-messages.html', icon: 'fa-regular fa-envelope' },
        { id: 'profile', label: 'Profile', href: 'resource-profile.html', icon: 'fa-regular fa-user' }
      ],
      admin: [
        { id: 'dashboard', label: 'Dashboard', href: 'admin.html', icon: 'fa-solid fa-chart-pie' },
        { id: 'users', label: 'Users', href: 'admin-users.html', icon: 'fa-solid fa-users' },
        { id: 'bookings', label: 'Bookings', href: 'admin-bookings.html', icon: 'fa-solid fa-bag-shopping' },
        { id: 'verification', label: 'Verify', href: 'admin-verification.html', icon: 'fa-solid fa-shield-halved' },
        { id: 'analytics', label: 'Analytics', href: 'admin-analytics.html', icon: 'fa-solid fa-chart-line' },
        { id: 'settings', label: 'Settings', href: 'admin-settings.html', icon: 'fa-solid fa-gear' },
        { id: 'disputes', label: 'Disputes', href: 'admin-disputes.html', icon: 'fa-solid fa-scale-balanced' },
        { id: 'commissions', label: 'Commissions', href: 'admin-commissions.html', icon: 'fa-solid fa-percent' },
        { id: 'settlements', label: 'Settlements', href: 'admin-settlements.html', icon: 'fa-solid fa-money-check-dollar' }
      ]
    };

    return T.dashboardPage(content, {
      title,
      subtitle: `${roleName} workflow mirror`,
      sidebarTitle: `${roleName[0].toUpperCase()}${roleName.slice(1)} Panel`,
      links: linksByKind[roleName] || [],
      activeNav: activeNav || 'dashboard'
    });
  }

  function renderCustomerDashboard() {
    return renderSimpleDashboardPage('customer', 'Customer Dashboard', `
      <div class="row g-4">
        ${[
          ['Active Bookings', db.bookings.filter((booking) => booking.status === 'upcoming').length, 'fa-solid fa-calendar-check', '#1E88E5', '#E3F2FD'],
          ['Wallet Balance', T.currency(db.wallet.currentBalance), 'fa-solid fa-wallet', '#4CAF50', '#E8F5E9'],
          ['Open Claims', db.claims.length, 'fa-solid fa-shield-heart', '#FF9800', '#FFF3E0'],
          ['Saved Threads', db.threads.length, 'fa-regular fa-comments', '#7B1FA2', '#F3E5F5']
        ].map((card) => `
          <div class="col-md-6 col-xl-3">
            <div class="ag-card h-100">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="small text-muted">${card[0]}</div>
                <div class="rounded-4 d-flex align-items-center justify-content-center" style="width:42px;height:42px;background:${card[4]};color:${card[3]};">
                  <i class="${card[2]}"></i>
                </div>
              </div>
              <div class="display-6 fw-extrabold">${card[1]}</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="row g-4 mt-1">
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-1">Upcoming Bookings</h4>
                <div class="small text-muted">Track scheduled jobs, provider arrival, and payment status.</div>
              </div>
              <a href="my-bookings.html" class="small fw-semibold text-primary-mirror text-decoration-none">View all</a>
            </div>
            <div class="d-grid gap-3">
              ${db.bookings.map((booking) => `
                <a href="booking-tracking.html" class="text-decoration-none text-dark">
                  <div class="rounded-4 border p-3">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div class="fw-bold">${booking.service}</div>
                        <div class="small text-muted mt-1">${booking.providerName} | ${booking.date} | ${booking.time}</div>
                        <div class="smaller text-muted mt-1">${booking.address}</div>
                      </div>
                      <div class="text-end">
                        <div class="fw-bold text-primary-mirror">${T.currency(booking.amount)}</div>
                        <span class="badge ${booking.status === 'completed' ? 'bg-secondary-subtle text-secondary' : 'bg-primary-subtle text-primary'} text-capitalize mt-2">${booking.status}</span>
                      </div>
                    </div>
                  </div>
                </a>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Quick Actions</h4>
            <div class="d-grid gap-2">
              <a href="providers.html" class="btn btn-blue rounded-4 py-3">Find Services</a>
              <a href="booking.html" class="btn btn-light border rounded-4 py-3">Book a Service</a>
              <a href="wallet.html" class="btn btn-light border rounded-4 py-3">View Wallet</a>
              <a href="claims-center.html" class="btn btn-light border rounded-4 py-3">Open Help Center</a>
            </div>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Popular Categories</h4>
            <div class="row g-2">
              ${db.categories.slice(0, 6).map((category) => `
                <div class="col-6">
                  <a href="providers.html?category=${category.id}" class="text-decoration-none">
                    <div class="rounded-4 border p-3 text-center h-100">
                      <div class="fs-4 mb-2">${category.emoji}</div>
                      <div class="small fw-semibold text-dark">${category.name}</div>
                    </div>
                  </a>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`, 'dashboard');
  }

  function renderProviderDashboard() {
    return renderSimpleDashboardPage('provider', 'Provider Hub', `
      <div class="row g-4">
        ${[
          ['New Jobs', 12, 'Today', 'fa-solid fa-calendar-day', '#FF9800', '#FFF3E0'],
          ['Completed', 48, 'This Week', 'fa-solid fa-circle-check', '#4CAF50', '#E8F5E9'],
          ['Active Techs', '6/8', 'Online', 'fa-solid fa-users', '#1E88E5', '#E3F2FD'],
          ['Pending Payout', 'Tk 14,200', 'Next: Fri', 'fa-solid fa-chart-column', '#7B1FA2', '#F3E5F5'],
          ['Rating', '4.8', 'High', 'fa-solid fa-star', '#F9A825', '#FFF8E1']
        ].map((card) => `
          <div class="col-md-6 col-xl">
            <div class="ag-card h-100">
              <div class="rounded-4 d-flex align-items-center justify-content-center mb-3" style="width:38px;height:38px;background:${card[5]};color:${card[4]};">
                <i class="${card[3]}"></i>
              </div>
              <div class="small text-muted">${card[0]}</div>
              <div class="fs-3 fw-extrabold">${card[1]}</div>
              <div class="smaller text-muted mt-1">${card[2]}</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="row g-4 mt-1">
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-1">Profit Analytics</h4>
                <div class="small text-muted">Weekly revenue and throughput snapshot for the provider account.</div>
              </div>
              <span class="badge bg-success-subtle text-success">+14.2% vs last month</span>
            </div>
            <div class="d-grid gap-3">
              ${[
                ['Mon', 82000],
                ['Tue', 96000],
                ['Wed', 91000],
                ['Thu', 108000],
                ['Fri', 123000],
                ['Sat', 118000]
              ].map((item) => `
                <div>
                  <div class="d-flex justify-content-between small mb-2"><span class="fw-semibold">${item[0]}</span><span class="text-muted">${T.currency(item[1])}</span></div>
                  <div class="progress" style="height:10px;"><div class="progress-bar" style="width:${Math.round((item[1] / 130000) * 100)}%;background:#FF9800;"></div></div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Technician Tracking</h4>
            <div class="rounded-4 bg-light border p-4 text-center">
              <div class="display-6 mb-3 text-primary-mirror"><i class="fa-solid fa-map-location-dot"></i></div>
              <div class="fw-semibold">Map Interface Active</div>
              <div class="small text-muted mt-1">3 technicians en-route across Gulshan, Banani, and Dhanmondi.</div>
            </div>
            <div class="rounded-4 bg-white border p-3 mt-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="rounded-circle bg-success" style="width:8px;height:8px;"></span>
                <div class="small fw-semibold">Arif Hossain</div>
                <div class="smaller text-muted ms-auto">En-route to Gulshan</div>
              </div>
              <div class="progress" style="height:8px;"><div class="progress-bar bg-success" style="width:66%;"></div></div>
            </div>
          </div>
        </div>
      </div>`, 'dashboard');
  }

  function renderResourceDashboard() {
    return renderSimpleDashboardPage('resource', 'Field Technician Dashboard', `
      <div class="row g-4">
        ${db.resourceOps.stats.map((card) => `<div class="col-md-3"><div class="ag-card text-center"><div class="small text-muted mb-2">${card.label}</div><div class="display-6 fw-extrabold">${card.value}</div></div></div>`).join('')}
      </div>
      <div class="ag-card mt-4">
        <h4 class="fw-bold mb-4">Today’s Assignments</h4>
        <div class="d-grid gap-3">
          ${db.resourceOps.assignments.map((job) => `<a href="resource-job-detail.html?id=${job.id}" class="text-decoration-none text-dark"><div class="border rounded-4 p-3 d-flex justify-content-between align-items-center"><div><div class="fw-bold">${job.service}</div><div class="small text-muted">${job.address} | ${job.time}</div></div><span class="badge bg-orange-soft rounded-pill">${job.status}</span></div></a>`).join('')}
        </div>
      </div>`);
  }

  function renderAdminDashboard() {
    return renderSimpleDashboardPage('admin', 'Admin Dashboard', `
      <div class="row g-4">
        ${[
          ['Total Users', db.adminOps.stats.totalUsers.toLocaleString(), 'text-warning', 'fa-solid fa-users'],
          ['Total Providers', db.adminOps.stats.totalProviders.toLocaleString(), 'text-purple', 'fa-solid fa-shield-halved'],
          ['Total Bookings', db.adminOps.stats.totalBookings.toLocaleString(), 'text-success', 'fa-solid fa-bag-shopping'],
          ['Monthly Revenue', T.currency(db.adminOps.stats.monthlyRevenue), 'text-primary', 'fa-solid fa-dollar-sign'],
          ['Active Bookings', db.adminOps.stats.activeBookings.toLocaleString(), 'text-warning', 'fa-solid fa-chart-line'],
          ['Pending Verification', db.adminOps.stats.pendingVerifications.toLocaleString(), 'text-warning', 'fa-solid fa-triangle-exclamation'],
          ['Disputes', db.adminOps.stats.disputes.toLocaleString(), 'text-danger', 'fa-solid fa-circle-exclamation'],
          ['Commission Earned', T.currency(db.adminOps.stats.commissionEarned), 'text-success', 'fa-solid fa-sack-dollar']
        ].map((card) => `<div class="col-md-6 col-xl-3"><div class="ag-card"><div class="d-flex justify-content-between mb-3"><div class="small text-muted">${card[0]}</div><i class="${card[3]} ${card[2]}"></i></div><div class="display-6 fw-extrabold">${card[1]}</div></div></div>`).join('')}
      </div>
      <div class="row g-4 mt-1">
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-1">Recent Users</h4>
                <div class="small text-muted">Mirror of the admin user management overview</div>
              </div>
              <a href="admin-disputes.html" class="small fw-semibold text-primary-mirror text-decoration-none">View More</a>
            </div>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>User</th><th>Role</th><th>Joined</th><th>Status</th><th>Bookings</th></tr></thead>
                <tbody>
                  ${[
                    { id: 'U001', name: 'Ariful Islam', type: 'customer', joined: '2026-04-18', status: 'active', bookings: 12 },
                    { id: 'U002', name: 'Delowara Begum', type: 'provider', joined: '2026-04-17', status: 'pending', bookings: 0 }
                  ].map((user) => `<tr><td><div class="fw-semibold">${user.name}</div><div class="smaller text-muted">#${user.id}</div></td><td><span class="badge bg-light text-dark text-capitalize">${user.type}</span></td><td>${user.joined}</td><td><span class="badge ${user.status === 'active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} text-capitalize">${user.status}</span></td><td>${user.bookings}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Open Disputes</h4>
            <div class="d-grid gap-3">
              ${db.adminOps.disputes.map((item) => `<div class="border rounded-4 p-3"><div class="fw-bold">${item.id}</div><div class="small text-muted">${item.summary}</div></div>`).join('')}
            </div>
          </div>
        </div>
      </div>`, 'dashboard');
  }

  function renderCustomerProfileMirror() {
    return renderSimpleDashboardPage('customer', 'Profile & Settings', `
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="ag-card text-center">
            <div class="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center text-dark fw-bold" style="width:92px;height:92px;background:#FACC15;font-size:2rem;">RA</div>
            <h3 class="fw-bold mb-1">Rahim Ahmed</h3>
            <div class="text-muted small">+880 17XX XXXXXX</div>
            <div class="row g-3 mt-3 text-center">
              <div class="col-4"><div class="fw-bold fs-4">6</div><div class="smaller text-muted">Bookings</div></div>
              <div class="col-4"><div class="fw-bold fs-4">4.8</div><div class="smaller text-muted">Avg Rating</div></div>
              <div class="col-4"><div class="fw-bold fs-4">3</div><div class="smaller text-muted">Reviews</div></div>
            </div>
            <button class="btn btn-blue rounded-4 w-100 mt-4">Edit Profile</button>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Saved Service Providers</h4>
            <div class="d-grid gap-2">
              ${[
                ['Ruksana Akter', 'Insurance Verified'],
                ['Delwar Hossain', 'Police Cleared']
              ].map((item) => `<div class="rounded-4 bg-light p-3 d-flex justify-content-between align-items-center"><div class="small fw-semibold">${item[0]}</div><span class="badge bg-purple-soft">${item[1]}</span></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="ag-card">
            <h4 class="fw-bold mb-3">Saved Addresses</h4>
            <div class="d-grid gap-2">
              ${[
                ['Home', 'House 12, Road 4, Gulshan-1, Dhaka'],
                ['Work', 'Level 5, DIT Avenue, Motijheel']
              ].map((item) => `<div class="rounded-4 bg-light p-3 d-flex justify-content-between align-items-center"><div><div class="small fw-semibold">${item[0]}</div><div class="smaller text-muted">${item[1]}</div></div><i class="fa-regular fa-pen-to-square text-muted"></i></div>`).join('')}
            </div>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Basic Registration</h4>
            <p class="small text-muted mb-0">Email/Phone login enabled, OTP verified, active account since 2025.</p>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Job Posting History</h4>
            <div class="d-grid gap-2">
              ${[
                ['JOB-2201', 'Painters & Decorators', 'Tk 18,000', '5 days', 'Completed'],
                ['JOB-2207', 'Carpenters', 'Tk 9,500', '2 days', 'Quoted']
              ].map((item) => `<div class="rounded-4 bg-light p-3"><div class="d-flex justify-content-between"><div class="small fw-semibold">${item[0]} | ${item[1]}</div><span class="badge bg-blue-soft">${item[4]}</span></div><div class="smaller text-muted mt-1">Budget: ${item[2]} | Timeline: ${item[3]}</div></div>`).join('')}
            </div>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Preferences & Support</h4>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <tbody>
                  ${[
                    ['Phone Number', '+880 17XX XXXXXX'],
                    ['Email', 'rahim@email.com'],
                    ['Payment Methods', 'bKash, Nagad'],
                    ['Language', 'English / Bangla'],
                    ['Notifications', 'On'],
                    ['Privacy Policy', 'Open'],
                    ['Terms of Service', 'Open']
                  ].map((item) => `<tr><td class="fw-semibold">${item[0]}</td><td class="text-end text-muted">${item[1]}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
            <button class="btn btn-outline-danger rounded-4 mt-4">Sign Out</button>
          </div>
        </div>
      </div>`, 'profile');
  }

  function renderCustomerBookingsPage() {
    const upcomingBookings = db.bookings.filter((booking) => booking.status === 'upcoming');
    const pastBookings = db.bookings.filter((booking) => booking.status !== 'upcoming');
    return renderSimpleDashboardPage('customer', 'My Bookings', `
      <div class="row g-4">
        <div class="col-lg-7">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="fw-bold mb-0">Upcoming</h4>
              <span class="badge bg-primary-subtle text-primary">${upcomingBookings.length} scheduled</span>
            </div>
            <div class="d-grid gap-3">
              ${upcomingBookings.map((booking) => `
                <div class="rounded-4 border p-3">
                  <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div class="fw-bold">${booking.providerName}</div>
                      <div class="small text-muted">${booking.category} | ${booking.service}</div>
                      <div class="small text-muted mt-2">${booking.date} | ${booking.time} | ${booking.duration} hr</div>
                      <div class="smaller text-muted mt-1">${booking.address}</div>
                    </div>
                    <div class="text-end">
                      <div class="fw-bold text-primary-mirror">${T.currency(booking.amount)}</div>
                      <div class="d-grid gap-2 mt-2">
                        <a href="booking-tracking.html" class="btn btn-sm btn-blue rounded-3">Track</a>
                        <button class="btn btn-sm btn-light border rounded-3">Reschedule</button>
                      </div>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="fw-bold mb-0">History</h4>
              <span class="badge bg-secondary-subtle text-secondary">${pastBookings.length} closed</span>
            </div>
            <div class="d-grid gap-3">
              ${pastBookings.map((booking) => `
                <div class="rounded-4 bg-light p-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <div class="fw-semibold">${booking.service}</div>
                      <div class="smaller text-muted">${booking.providerName}</div>
                    </div>
                    <span class="badge ${booking.status === 'completed' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} text-capitalize">${booking.status}</span>
                  </div>
                  <div class="smaller text-muted mt-2">${booking.date} | ${booking.address}</div>
                  <div class="d-flex gap-2 mt-3">
                    <a href="providers.html" class="btn btn-sm btn-light border rounded-3 flex-fill">Rebook</a>
                    <button class="btn btn-sm btn-warning-subtle text-warning rounded-3 flex-fill">Rate</button>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`, 'bookings');
  }

  function renderCustomerClaimsPage() {
    return renderSimpleDashboardPage('customer', 'Claims & Support', `
      <div class="row g-4">
        <div class="col-lg-5">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">File a New Claim</h4>
            <div class="d-grid gap-3">
              <select class="form-select rounded-4 py-3">
                <option>Poor workmanship</option>
                <option>Property damage</option>
                <option>Incomplete work</option>
              </select>
              <textarea class="form-control rounded-4" rows="5" placeholder="Describe issue, timeline, and expected resolution"></textarea>
              <input class="form-control rounded-4 py-3" type="file" multiple>
              <button class="btn btn-blue rounded-4 py-3">Submit Claim</button>
            </div>
            <div class="small text-muted mt-3">Provider response window: 48 hours. Cases route to mediation automatically if unresolved.</div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Claim Status Tracking</h4>
            <div class="d-grid gap-3">
              ${db.claims.map((claim) => `
                <div class="rounded-4 border p-3">
                  <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div class="fw-semibold">${claim.id} | ${claim.bookingId}</div>
                      <div class="small text-muted mt-1">Reason: ${claim.reason}</div>
                      <div class="smaller text-muted mt-1">Created: ${claim.createdAt}</div>
                    </div>
                    <span class="badge bg-warning-subtle text-warning">${claim.stage}</span>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`, 'claims');
  }

  function renderCustomerMessagesPage() {
    return renderSimpleDashboardPage('customer', 'Communication Center', `
      <div class="row g-4">
        <div class="col-lg-5">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Active Job Threads</h4>
            <div class="d-grid gap-3">
              ${db.threads.map((thread) => `
                <div class="rounded-4 border p-3">
                  <div class="d-flex justify-content-between align-items-center gap-3">
                    <div>
                      <div class="fw-semibold">${thread.id} | ${thread.bookingId}</div>
                      <div class="small text-muted mt-1">${thread.participants.join(' | ')}</div>
                    </div>
                    ${thread.unreadCount ? `<span class="badge bg-primary-subtle text-primary">${thread.unreadCount} unread</span>` : '<span class="badge bg-light text-muted">Seen</span>'}
                  </div>
                  <div class="small text-muted mt-2">${thread.lastMessage}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Job Chat</h4>
            <div class="d-grid gap-3 mb-4">
              ${[
                ['Customer', 'Please confirm material quality before start.', '10:12 AM', 'bg-primary-subtle'],
                ['Provider', 'Confirmed. Sharing material sheet and quote breakdown now.', '10:15 AM', 'bg-light'],
                ['Customer', 'Great. Uploading room photos and measurements.', '10:18 AM', 'bg-primary-subtle']
              ].map((message) => `
                <div class="rounded-4 p-3 ${message[3]}">
                  <div class="d-flex justify-content-between small mb-1">
                    <span class="fw-semibold">${message[0]}</span>
                    <span class="text-muted">${message[2]}</span>
                  </div>
                  <div class="small">${message[1]}</div>
                </div>`).join('')}
            </div>
            <div class="rounded-4 border border-dashed p-3 mb-3">
              <div class="small text-muted mb-2">Share photo/document</div>
              <input type="file" class="form-control rounded-4 py-2">
            </div>
            <div class="d-flex gap-2">
              <input class="form-control rounded-4 py-3" placeholder="Type message...">
              <button class="btn btn-blue rounded-4 px-4">Send</button>
            </div>
          </div>
        </div>
      </div>`);
  }

  function renderProviderBookingsPage() {
    return renderSimpleDashboardPage('provider', 'Live Bookings', `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 class="fw-bold mb-1">Active Orders</h4>
          <div class="small text-muted">Assign field technicians, confirm arrival, and track order status.</div>
        </div>
        <div class="d-flex gap-2">
          <span class="badge bg-warning-subtle text-warning">3 New</span>
          <span class="badge bg-primary-subtle text-primary">2 Ongoing</span>
        </div>
      </div>
      <div class="d-grid gap-3">
        ${[
          { id: 'ORD-942', client: 'Nusrat Jahan', service: 'AC Maintenance', time: '10:30 AM', status: 'Ongoing', tech: 'Arif' },
          { id: 'ORD-945', client: 'Karim Ahmed', service: 'Full Home Clean', time: '01:00 PM', status: 'Confirmed', tech: 'Unassigned' },
          { id: 'ORD-948', client: 'Sumi Akter', service: 'Basin Repair', time: '04:30 PM', status: 'New', tech: 'Unassigned' }
        ].map((order) => `
          <div class="ag-card">
            <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
              <div class="d-flex gap-3">
                <div class="rounded-4 text-white d-flex flex-column align-items-center justify-content-center fw-bold" style="width:62px;height:62px;background:${order.status === 'Ongoing' ? '#1E88E5' : order.status === 'Confirmed' ? '#FF9800' : '#94A3B8'};">
                  <div class="smaller">${order.time.split(' ')[1]}</div>
                  <div>${order.time.split(' ')[0]}</div>
                </div>
                <div>
                  <div class="fw-bold">${order.service}</div>
                  <div class="small text-muted">${order.client} | ${order.id}</div>
                  <div class="smaller text-muted mt-2">Assigned tech: ${order.tech}</div>
                </div>
              </div>
              <div class="text-lg-end">
                <span class="badge ${order.status === 'Ongoing' ? 'bg-primary-subtle text-primary' : order.status === 'Confirmed' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'}">${order.status}</span>
                <div class="d-flex gap-2 mt-3 justify-content-lg-end">
                  <a href="provider-booking-detail.html" class="btn btn-sm btn-blue rounded-3">Open</a>
                  <a href="provider-assignment.html" class="btn btn-sm btn-light border rounded-3">Assign</a>
                </div>
              </div>
            </div>
          </div>`).join('')}
      </div>`, 'bookings');
  }

  function renderProviderTeamPage() {
    return renderSimpleDashboardPage('provider', 'Resource Management', `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold mb-0">Team Management</h4>
        <button class="btn btn-blue rounded-4 px-4">Add New Technician</button>
      </div>
      <div class="row g-4">
        ${db.providerOps.team.map((member) => `
          <div class="col-md-6 col-xl-4">
            <div class="ag-card h-100">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="rounded-4 bg-light d-flex align-items-center justify-content-center fw-bold text-dark" style="width:48px;height:48px;">${member.name[0]}</div>
                <div>
                  <div class="fw-bold">${member.name}</div>
                  <div class="small text-muted">${member.skill}</div>
                </div>
                <span class="badge ${member.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'} ms-auto">${member.status}</span>
              </div>
              <div class="row g-3 border-top pt-3">
                <div class="col-6"><div class="smaller text-muted">Today's Tasks</div><div class="fw-bold">${member.status === 'Offline' ? 0 : member.id === 'R01' ? 4 : 3} Jobs</div></div>
                <div class="col-6"><div class="smaller text-muted">Rating</div><div class="fw-bold">4.${member.id === 'R01' ? 9 : member.id === 'R02' ? 7 : 8}</div></div>
              </div>
              <button class="btn btn-light border rounded-4 w-100 mt-4">View Performance Report</button>
            </div>
          </div>`).join('')}
      </div>`, 'team');
  }

  function renderProviderVerificationPage() {
    return renderSimpleDashboardPage('provider', 'Partner Verification', `
      <div class="ag-card">
        <div class="d-flex align-items-start gap-3 mb-4">
          <div class="rounded-4 d-flex align-items-center justify-content-center" style="width:52px;height:52px;background:#FFF3E0;color:#FF9800;">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h4 class="fw-bold mb-1">Provider Verification</h4>
            <div class="small text-muted">Submit business documents to unlock expert badges and higher-value bookings.</div>
          </div>
        </div>
        <div class="row g-4">
          ${[
            ['NID / Passport', 'Scan of front and back side', 'Verified'],
            ['Trade License', 'Valid government business license', 'Pending'],
            ['Utility Bill', 'Proof of business location', 'Not Uploaded'],
            ['Tax Certificate', 'e-TIN or tax return copy', 'Not Uploaded']
          ].map((doc) => `
            <div class="col-md-6">
              <div class="rounded-4 border border-dashed p-4 h-100">
                <div class="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div class="fw-bold">${doc[0]}</div>
                    <div class="small text-muted mt-1">${doc[1]}</div>
                  </div>
                  <span class="badge ${doc[2] === 'Verified' ? 'bg-success-subtle text-success' : doc[2] === 'Pending' ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'}">${doc[2]}</span>
                </div>
                ${doc[2] === 'Not Uploaded' ? '<button class="btn btn-light border rounded-4 w-100 mt-4">Upload File</button>' : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>`, 'kyc');
  }

  function renderProviderEarningsPage() {
    return renderSimpleDashboardPage('provider', 'Earnings Report', `
      <div class="row g-4 mb-4">
        ${[
          ['Today Profit', 'Tk 2,400', '#4CAF50'],
          ['Weekly Gross', 'Tk 18,500', '#1E88E5'],
          ['Total Payouts', 'Tk 142,000', '#7B1FA2']
        ].map((card) => `<div class="col-md-4"><div class="ag-card"><div class="small text-muted mb-2">${card[0]}</div><div class="display-6 fw-extrabold" style="color:${card[2]};">${card[1]}</div></div></div>`).join('')}
      </div>
      <div class="ag-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold mb-0">Recent Payouts</h4>
          <button class="btn btn-blue rounded-4 px-4">Export PDF</button>
        </div>
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead><tr><th>Payout ID</th><th>Period</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              ${[
                ['PAY-421', 'Apr 20 - Apr 26', 'Tk 12,400', 'Transferred'],
                ['PAY-420', 'Apr 13 - Apr 19', 'Tk 9,800', 'Transferred'],
                ['PAY-419', 'Apr 06 - Apr 12', 'Tk 14,200', 'Transferred']
              ].map((row) => `<tr><td class="fw-semibold">${row[0]}</td><td>${row[1]}</td><td class="fw-bold">${row[2]}</td><td><span class="badge bg-success-subtle text-success">${row[3]}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`, 'earnings');
  }

  function renderProviderProfilePage() {
    return renderSimpleDashboardPage('provider', 'Provider Profile', `
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex flex-column flex-lg-row gap-4">
              <div class="text-center">
                <div class="rounded-4 bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style="width:144px;height:144px;font-size:3rem;">&#127970;</div>
                <button class="btn btn-blue rounded-4 w-100">Update Profile</button>
              </div>
              <div class="flex-grow-1">
                <h3 class="fw-bold mb-1">Ruksana Services Ltd.</h3>
                <div class="small text-muted mb-4">Dhanmondi, Dhaka | Joined 2024</div>
                <div class="row g-3">
                  ${[
                    ['Owner Name', 'Ruksana Akter'],
                    ['Business Type', 'Private Limited'],
                    ['Contact Phone', '+880 1677-123456'],
                    ['Support Email', 'help@ruksanaservices.com']
                  ].map((field) => `
                    <div class="col-md-6">
                      <label class="small text-muted d-block mb-2">${field[0]}</label>
                      <input class="form-control rounded-4 py-3" value="${field[1]}">
                    </div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card">
            <h4 class="fw-bold mb-3">Operating Hours</h4>
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between"><span class="text-muted">Saturday - Thursday</span><span class="fw-bold">09:00 AM - 08:00 PM</span></div>
              <div class="d-flex justify-content-between"><span class="text-muted">Friday</span><span class="fw-bold">Closed</span></div>
            </div>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Coverage Areas</h4>
            <div class="d-flex flex-wrap gap-2">
              ${['Dhanmondi', 'Lalmatia', 'Mohammadpur', 'Tejgaon', 'Panthapath'].map((area) => `<span class="badge bg-light text-dark rounded-pill px-3 py-2">${area}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>`, 'profile');
  }

  function renderResourceAssignmentsPanel() {
    return renderSimpleDashboardPage('resource', 'Assignments', `
      <div class="ag-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 class="fw-bold mb-1">Today's Queue</h4>
            <div class="small text-muted">Field technician job list with status and arrival windows.</div>
          </div>
          <span class="badge bg-warning-subtle text-warning">${db.resourceOps.assignments.length} jobs</span>
        </div>
        <div class="d-grid gap-3">
          ${db.resourceOps.assignments.map((job) => `
            <a href="resource-job-detail.html?id=${job.id}" class="text-decoration-none text-dark">
              <div class="rounded-4 border p-3">
                <div class="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div class="fw-bold">${job.service}</div>
                    <div class="small text-muted mt-1">${job.address}</div>
                    <div class="smaller text-muted mt-1">${job.time} | #${job.id}</div>
                  </div>
                  <span class="badge bg-warning-subtle text-warning">${job.status}</span>
                </div>
              </div>
            </a>`).join('')}
        </div>
      </div>`, 'assignments');
  }

  function renderResourceHistoryPage() {
    return renderSimpleDashboardPage('resource', 'Completed Jobs', `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold mb-0">Job History</h4>
        <span class="badge bg-light text-muted">Total: 240 Jobs</span>
      </div>
      <div class="d-grid gap-3">
        ${[
          { id: 'JOB-938', service: 'Sofa Cleaning', client: 'Anika Islam', date: 'Yesterday', rating: '5.0', price: 'Tk 450' },
          { id: 'JOB-935', service: 'AC Checkup', client: 'Mohammad Karim', date: '2 days ago', rating: '4.8', price: 'Tk 300' },
          { id: 'JOB-930', service: 'Electric Repair', client: 'Laila Rahman', date: '3 days ago', rating: '5.0', price: 'Tk 200' }
        ].map((job) => `
          <div class="ag-card">
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-4 d-flex align-items-center justify-content-center text-success" style="width:48px;height:48px;background:#E8F5E9;">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div class="fw-bold">${job.service}</div>
                    <div class="small text-muted">${job.client} | ${job.date}</div>
                  </div>
                  <div class="text-end">
                    <div class="small fw-semibold text-warning">${job.rating}</div>
                    <div class="smaller text-muted">${job.id}</div>
                  </div>
                </div>
              </div>
              <div class="text-end border-start ps-3">
                <div class="fw-bold">${job.price}</div>
                <div class="smaller text-muted">Earned</div>
              </div>
            </div>
          </div>`).join('')}
      </div>`, 'history');
  }

  function renderResourceMessagesPage() {
    return renderSimpleDashboardPage('resource', 'Internal Messages', `
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="ag-card p-0 overflow-hidden">
            <div class="p-4 border-bottom bg-light">
              <h4 class="fw-bold mb-0">Chats</h4>
            </div>
            <div class="d-grid">
              ${[
                ['Provider Support', 'Payment processed...', '10m ago', true],
                ['Team Hub', 'Arif: New job assigned...', '1h ago', false],
                ['HR Dept', 'Please update your KYC...', '2d ago', false]
              ].map((chat) => `
                <div class="p-4 border-bottom ${chat[3] ? 'bg-warning-subtle' : ''}">
                  <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold" style="width:40px;height:40px;">${chat[0][0]}</div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between">
                        <div class="small fw-semibold">${chat[0]}</div>
                        <div class="smaller text-muted">${chat[2]}</div>
                      </div>
                      <div class="smaller text-muted mt-1">${chat[1]}</div>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
              <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle bg-warning" style="width:32px;height:32px;"></div>
                <div class="fw-bold">Provider Support</div>
              </div>
              <span class="badge bg-success-subtle text-success">Online</span>
            </div>
            <div class="d-grid gap-3 mb-4">
              <div class="rounded-4 bg-light p-3 small">Hi Arif, your weekly commission has been successfully transferred to your bKash wallet.</div>
              <div class="rounded-4 bg-dark text-white p-3 small ms-auto" style="max-width:75%;">Got it. Thanks!</div>
            </div>
            <div class="d-flex gap-2">
              <input class="form-control rounded-4 py-3" placeholder="Type a message...">
              <button class="btn btn-warning rounded-4 px-4 text-white">Send</button>
            </div>
          </div>
        </div>
      </div>`, 'messages');
  }

  function renderResourceProfilePage() {
    return renderSimpleDashboardPage('resource', 'My Profile', `
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex flex-column flex-lg-row gap-4 align-items-start">
              <div class="text-center">
                <div class="rounded-4 bg-light d-flex align-items-center justify-content-center mb-3" style="width:128px;height:128px;font-size:3rem;">&#128119;</div>
                <div class="small fw-bold text-warning">Technician ID: 402</div>
              </div>
              <div class="flex-grow-1">
                <h3 class="fw-bold mb-1">Arif Hossain</h3>
                <div class="small text-muted mb-4">Senior Electrician | Expert Badge</div>
                <div class="row g-3">
                  ${[
                    ['Work Experience', '4+ Years'],
                    ['Verified Status', 'Full Access'],
                    ['Primary Contact', '01712-334455'],
                    ['Emergency Contact', '01611-223344']
                  ].map((field) => `<div class="col-md-6"><div class="rounded-4 bg-light border p-3"><div class="smaller text-muted">${field[0]}</div><div class="fw-semibold mt-1">${field[1]}</div></div></div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card">
            <h4 class="fw-bold mb-3">Account Preferences</h4>
            <div class="d-grid gap-3">
              ${[
                ['Auto-accept high rated jobs', true],
                ['Real-time location sharing', true],
                ['Sound alerts for new bookings', false]
              ].map((item) => `
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span>${item[0]}</span>
                  <div class="form-check form-switch m-0">
                    <input class="form-check-input" type="checkbox" ${item[1] ? 'checked' : ''}>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`, 'profile');
  }

  function renderCustomerFindServicesPage() {
    return renderSimpleDashboardPage('customer', 'Find Services', `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 class="fw-bold mb-1">Browse Providers</h4>
          <div class="small text-muted">Filter by category, area, and expertise level.</div>
        </div>
        <a href="booking.html" class="btn btn-blue rounded-4 px-4">Book Now</a>
      </div>
      <div class="row g-4">
        ${db.providers.slice(0, 6).map((provider) => `
          <div class="col-md-6">
            <a href="provider-profile.html?id=${provider.id}" class="text-decoration-none text-dark">
              <div class="ag-card h-100">
                <div class="d-flex align-items-center gap-3">
                  <div class="rounded-4 d-flex align-items-center justify-content-center text-white fw-bold" style="width:54px;height:54px;background:#1E88E5;">
                    ${provider.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                  </div>
                  <div class="flex-grow-1">
                    <div class="fw-bold">${provider.name}</div>
                    <div class="small text-muted text-capitalize">${provider.category} | ${provider.area}</div>
                    <div class="smaller text-muted mt-1">Rating ${provider.rating} | ${provider.jobsCompleted} jobs</div>
                  </div>
                  <span class="badge ${provider.type === 'expert' ? 'bg-purple-soft text-dark' : 'bg-success-subtle text-success'} text-capitalize">${provider.type}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
                  <div class="fw-bold text-primary-mirror">${T.currency(provider.price)} <span class="small text-muted">${provider.priceUnit}</span></div>
                  <span class="small fw-semibold text-primary-mirror">Open profile</span>
                </div>
              </div>
            </a>
          </div>`).join('')}
      </div>`, 'find');
  }

  function renderCustomerWalletPanel() {
    return renderSimpleDashboardPage('customer', 'My Wallet', `
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="ag-card">
            <div class="small text-muted mb-2">Current Balance</div>
            <div class="display-6 fw-extrabold text-primary-mirror">${T.currency(db.wallet.currentBalance)}</div>
            <div class="small text-muted mt-3">Pending Refund: ${T.currency(db.wallet.pendingRefund)}</div>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Payment Methods</h4>
            <div class="d-grid gap-2">
              ${['bKash', 'Nagad', 'Card EMI'].map((method) => `<div class="rounded-4 bg-light p-3 small fw-semibold">${method}</div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="ag-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="fw-bold mb-0">Recent Transactions</h4>
              <button class="btn btn-light border rounded-4 px-4">Export</button>
            </div>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>ID</th><th>Method</th><th class="text-end">Amount</th></tr></thead>
                <tbody>
                  ${db.wallet.transactions.map((item) => `<tr><td class="fw-semibold">${item.id}</td><td>${item.method}</td><td class="text-end fw-bold">${T.currency(item.amount)}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`, 'wallet');
  }

  function renderResourceDashboardPanel() {
    return renderSimpleDashboardPage('resource', 'Field App', `
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="fw-bold mb-0">My Schedule Today</h4>
            <span class="badge bg-light text-muted">April 27, 2026</span>
          </div>
          <div class="d-grid gap-3">
            ${[
              { id: 'job-1', time: '10:00 AM', client: 'Rahim Ahmed', service: 'AC Maintenance', location: 'Gulshan 2, Road 14', status: 'Ready' },
              { id: 'job-2', time: '01:30 PM', client: 'Sumi Akter', service: 'Basin Repair', location: 'Banani Block D', status: 'Upcoming' },
              { id: 'job-3', time: '04:00 PM', client: 'Tanvir Hossain', service: 'Full Home Clean', location: 'Baridhara', status: 'Upcoming' }
            ].map((job) => `
              <a href="resource-job-detail.html?id=${job.id}" class="text-decoration-none text-dark">
                <div class="ag-card">
                  <div class="d-flex gap-3 align-items-start">
                    <div class="d-flex flex-column align-items-center gap-2">
                      <span class="badge bg-light text-dark">${job.time}</span>
                      <div class="bg-light rounded-pill" style="width:4px;height:48px;"></div>
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-start gap-3">
                        <div>
                          <div class="fw-bold">${job.service}</div>
                          <div class="small text-muted">${job.client}</div>
                          <div class="small text-muted mt-2">${job.location}</div>
                        </div>
                        <span class="badge ${job.status === 'Ready' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'}">${job.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>`).join('')}
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card text-white border-0" style="background:#22C55E;">
            <div class="small text-white-50">Shift Status</div>
            <div class="d-flex align-items-center gap-2 mt-1 mb-4">
              <span class="rounded-circle bg-white" style="width:10px;height:10px;"></span>
              <h4 class="fw-bold mb-0">Online & Active</h4>
            </div>
            <button class="btn btn-light rounded-4 w-100">Go Offline</button>
          </div>
          <div class="row g-3 mt-1">
            ${[
              ['Report Issue', 'fa-solid fa-triangle-exclamation', '#FEE2E2', '#EF4444'],
              ['View Map', 'fa-solid fa-location-arrow', '#DBEAFE', '#2563EB']
            ].map((item) => `
              <div class="col-6">
                <div class="ag-card text-center h-100">
                  <div class="rounded-4 d-inline-flex align-items-center justify-content-center mb-3" style="width:40px;height:40px;background:${item[2]};color:${item[3]};"><i class="${item[1]}"></i></div>
                  <div class="small fw-semibold">${item[0]}</div>
                </div>
              </div>`).join('')}
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Performance Today</h4>
            <div class="d-grid gap-3">
              <div class="d-flex justify-content-between"><span class="text-muted">Jobs Done</span><span class="fw-bold">4</span></div>
              <div class="d-flex justify-content-between"><span class="text-muted">Avg. Rating</span><span class="fw-bold">4.95</span></div>
              <div class="d-flex justify-content-between"><span class="text-muted">Distance Covered</span><span class="fw-bold">12.4 km</span></div>
            </div>
          </div>
        </div>
      </div>`, 'dashboard');
  }

  function renderAdminUsersPage() {
    return renderSimpleDashboardPage('admin', 'User Management', `
      <div class="row g-4">
        <div class="col-12">
          <div class="ag-card">
            <div class="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between mb-4">
              <div class="input-group" style="max-width:420px;">
                <span class="input-group-text bg-light border-0 rounded-start-4"><i class="fa-solid fa-magnifying-glass text-muted"></i></span>
                <input class="form-control border-0 bg-light rounded-end-4 py-3" placeholder="Search by name...">
              </div>
              <div class="d-flex flex-wrap gap-2">
                <button class="btn btn-blue rounded-4 px-4">All</button>
                <button class="btn btn-light border rounded-4 px-4">Pending</button>
                <button class="btn btn-light border rounded-4 px-4">Verified</button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Bookings</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${[
                    { id: 'U001', name: 'Ariful Islam', type: 'customer', joined: 'Apr 18, 2026', status: 'active', bookings: 12 },
                    { id: 'U002', name: 'Delowara Begum', type: 'provider', joined: 'Apr 17, 2026', status: 'pending', bookings: 0 },
                    { id: 'U003', name: 'Mina Akter', type: 'resource', joined: 'Apr 16, 2026', status: 'verified', bookings: 31 },
                    { id: 'U004', name: 'Nusrat Jahan', type: 'customer', joined: 'Apr 14, 2026', status: 'active', bookings: 8 }
                  ].map((user) => `
                    <tr>
                      <td>
                        <div class="d-flex align-items-center gap-3">
                          <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:38px;height:38px;background:linear-gradient(135deg,#1E88E5,#7B1FA2);">
                            ${user.name.split(' ').map((part) => part[0]).join('')}
                          </div>
                          <div>
                            <div class="fw-semibold">${user.name}</div>
                            <div class="smaller text-muted">ID: ${user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td><span class="badge bg-light text-dark text-capitalize">${user.type}</span></td>
                      <td>${user.joined}</td>
                      <td><span class="badge ${user.status === 'active' ? 'bg-success-subtle text-success' : user.status === 'verified' ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning'} text-capitalize">${user.status}</span></td>
                      <td class="fw-semibold">${user.bookings}</td>
                      <td class="text-end">
                        <div class="d-inline-flex gap-2">
                          <button class="btn btn-sm btn-light"><i class="fa-regular fa-eye"></i></button>
                          ${user.status === 'pending' ? '<button class="btn btn-sm btn-success-subtle text-success"><i class="fa-solid fa-check"></i></button>' : ''}
                          <button class="btn btn-sm btn-danger-subtle text-danger"><i class="fa-solid fa-ban"></i></button>
                        </div>
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`, 'users');
  }

  function renderAdminBookingsPage() {
    return renderSimpleDashboardPage('admin', 'Live Bookings Monitor', `
      <div class="ag-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 class="fw-bold mb-1">Live Bookings Monitor</h4>
            <div class="small text-muted">Real-time overview of booking activity across the platform</div>
          </div>
          <div class="d-flex align-items-center gap-2 text-success small fw-semibold">
            <span class="rounded-circle bg-success" style="width:8px;height:8px;"></span>
            ${db.adminOps.stats.activeBookings} Active
          </div>
        </div>
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Provider</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
                <th class="text-end"></th>
              </tr>
            </thead>
            <tbody>
              ${[
                { id: 'BK001', customer: 'Rahim Ahmed', provider: 'Fatema Begum', service: 'Maid - Cleaning', amount: 450, status: 'upcoming' },
                { id: 'BK002', customer: 'Karim Uddin', provider: 'Mohammad Karim', service: 'Driver - Airport', amount: 800, status: 'ongoing' },
                { id: 'BK003', customer: 'Sadia Islam', provider: 'Roksana Rahman', service: 'Chef - Event', amount: 4800, status: 'completed' },
                { id: 'BK004', customer: 'Farhan Khan', provider: 'Nasrin Sultana', service: 'Nursing - ICU', amount: 5600, status: 'upcoming' }
              ].map((booking) => `
                <tr>
                  <td class="font-monospace small text-muted">${booking.id}</td>
                  <td class="fw-semibold">${booking.customer}</td>
                  <td>${booking.provider}</td>
                  <td class="small text-muted">${booking.service}</td>
                  <td class="fw-bold">${T.currency(booking.amount)}</td>
                  <td><span class="badge ${booking.status === 'ongoing' ? 'bg-success-subtle text-success' : booking.status === 'upcoming' ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'} text-capitalize">${booking.status}</span></td>
                  <td class="text-end"><button class="btn btn-sm btn-light"><i class="fa-regular fa-eye text-primary-mirror"></i></button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`, 'bookings');
  }

  function renderAdminVerificationPage() {
    return renderSimpleDashboardPage('admin', 'Verification Queue', `
      <div class="rounded-4 border border-warning-subtle bg-warning-subtle p-4 mb-4">
        <div class="d-flex align-items-start gap-3">
          <i class="fa-solid fa-triangle-exclamation text-warning mt-1"></i>
          <div>
            <div class="fw-bold text-dark">${db.adminOps.stats.pendingVerifications} Expert Providers Awaiting Verification</div>
            <div class="small text-muted mt-1">Review submitted documents and approve or reject providers from the admin queue.</div>
          </div>
        </div>
      </div>
      <div class="row g-4">
        ${db.providers.filter((provider) => provider.type === 'expert').slice(0, 4).map((provider) => `
          <div class="col-xl-6">
            <div class="ag-card h-100">
              <div class="d-flex align-items-start gap-3">
                <div class="rounded-4 bg-purple-soft text-dark fw-bold d-flex align-items-center justify-content-center" style="width:56px;height:56px;">
                  ${provider.name.split(' ').map((part) => part[0]).join('')}
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div class="fw-bold">${provider.name}</div>
                      <div class="small text-muted">${provider.category} | ${provider.area} | ${provider.yearsExp} yrs exp</div>
                      <div class="small text-muted mt-1">${provider.rating} rating | ${provider.reviewCount} reviews</div>
                    </div>
                    <span class="badge bg-warning-subtle text-warning">Pending Review</span>
                  </div>
                  <p class="small text-muted mt-3 mb-3">${provider.description ? provider.description.slice(0, 100) : 'Document review pending for this provider.'}...</p>
                  <div class="row g-2">
                    <div class="col-6"><div class="bg-light rounded-4 p-3 text-center"><div class="smaller text-muted">Submitted Docs</div><div class="small fw-semibold mt-1">NID, Certificate, Photo</div></div></div>
                    <div class="col-6"><div class="bg-light rounded-4 p-3 text-center"><div class="smaller text-muted">Jobs Completed</div><div class="small fw-semibold mt-1">${provider.jobsCompleted}</div></div></div>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row gap-2 mt-4 pt-4 border-top">
                <button class="btn btn-light border rounded-4 flex-fill">View Documents</button>
                <button class="btn btn-danger-subtle text-danger rounded-4 flex-fill">Reject</button>
                <button class="btn btn-success rounded-4 flex-fill">Approve Expert</button>
              </div>
            </div>
          </div>`).join('')}
      </div>`, 'verification');
  }

  function renderAdminAnalyticsPage() {
    const weeklyData = [
      { day: 'Mon', revenue: 178000, bookings: 142 },
      { day: 'Tue', revenue: 194000, bookings: 156 },
      { day: 'Wed', revenue: 205000, bookings: 168 },
      { day: 'Thu', revenue: 187000, bookings: 151 },
      { day: 'Fri', revenue: 231000, bookings: 184 },
      { day: 'Sat', revenue: 248000, bookings: 196 },
      { day: 'Sun', revenue: 219000, bookings: 171 }
    ];
    const categoryData = [
      { name: 'Cleaning', value: 24, color: '#1E88E5' },
      { name: 'Driver', value: 18, color: '#4CAF50' },
      { name: 'Plumbing', value: 16, color: '#FF9800' },
      { name: 'Electrical', value: 15, color: '#7B1FA2' },
      { name: 'Nursing', value: 11, color: '#E91E63' }
    ];

    return renderSimpleDashboardPage('admin', 'Platform Analytics', `
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="ag-card h-100">
            <h4 class="fw-bold mb-4">Revenue Trend (Last 7 Days)</h4>
            <div class="d-grid gap-3">
              ${weeklyData.map((item) => `
                <div>
                  <div class="d-flex justify-content-between small mb-2">
                    <span class="fw-semibold text-dark">${item.day}</span>
                    <span class="text-muted">${T.currency(item.revenue)} | ${item.bookings} bookings</span>
                  </div>
                  <div class="progress" style="height:10px;">
                    <div class="progress-bar" style="width:${Math.max(12, Math.round((item.revenue / 250000) * 100))}%;background:#1E88E5;"></div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="ag-card h-100">
            <h4 class="fw-bold mb-4">Category Distribution</h4>
            <div class="d-grid gap-3">
              ${categoryData.map((item) => `
                <div>
                  <div class="d-flex justify-content-between small mb-2">
                    <span>${item.name}</span>
                    <span class="fw-bold">${item.value}%</span>
                  </div>
                  <div class="progress" style="height:10px;">
                    <div class="progress-bar" style="width:${item.value}%;background:${item.color};"></div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="ag-card mt-4">
        <h4 class="fw-bold mb-4">Top Performing Areas</h4>
        <div class="row g-3">
          ${[
            ['Gulshan', '2,345 bookings', 'Tk 987K'],
            ['Banani', '1,890 bookings', 'Tk 756K'],
            ['Dhanmondi', '1,567 bookings', 'Tk 623K'],
            ['Uttara', '1,234 bookings', 'Tk 498K']
          ].map((area, index) => `
            <div class="col-md-6 col-xl-3">
              <div class="bg-light rounded-4 p-3 h-100">
                <div class="d-flex align-items-center gap-3">
                  <div class="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center" style="width:28px;height:28px;">${index + 1}</div>
                  <div>
                    <div class="fw-semibold">${area[0]}</div>
                    <div class="smaller text-muted">${area[1]}</div>
                  </div>
                </div>
                <div class="fw-bold text-success mt-3">${area[2]}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`, 'analytics');
  }

  function renderAdminSettingsPage() {
    return renderSimpleDashboardPage('admin', 'Platform Settings', `
      <div class="row g-4">
        <div class="col-lg-7">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Commission Settings</h4>
            <div class="d-grid gap-4">
              ${[
                ['Local Provider', 10, 25, '#4CAF50'],
                ['Expert Provider', 15, 30, '#7B1FA2']
              ].map((item) => `
                <div>
                  <div class="d-flex justify-content-between mb-2">
                    <label class="fw-medium">${item[0]}</label>
                    <span class="fw-extrabold" style="color:${item[3]};">${item[1]}%</span>
                  </div>
                  <input type="range" class="form-range" min="5" max="${item[2]}" value="${item[1]}">
                  <div class="d-flex justify-content-between smaller text-muted"><span>5%</span><span>${item[2]}%</span></div>
                </div>`).join('')}
            </div>
            <div class="rounded-4 p-3 mt-4" style="background:#EFF6FF;">
              <div class="small text-primary-mirror">Commission changes apply to new bookings only.</div>
            </div>
            <button class="btn btn-blue rounded-4 w-100 mt-4 py-3">Save Commission Settings</button>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="ag-card">
            <h4 class="fw-bold mb-4">Platform Toggles</h4>
            <div class="d-grid gap-3">
              ${[
                ['Emergency Booking Priority', true],
                ['Auto-verify returning providers', false],
                ['SMS notifications', true],
                ['Review moderation', true]
              ].map((item) => `
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span>${item[0]}</span>
                  <div class="form-check form-switch m-0">
                    <input class="form-check-input" type="checkbox" ${item[1] ? 'checked' : ''}>
                  </div>
                </div>`).join('')}
            </div>
          </div>
          <div class="ag-card mt-4">
            <h4 class="fw-bold mb-3">Commission Breakdown</h4>
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between"><span class="text-muted">Local commission (avg)</span><span class="fw-semibold">Tk 7.5K</span></div>
              <div class="d-flex justify-content-between"><span class="text-muted">Expert commission (avg)</span><span class="fw-semibold">Tk 5.0K</span></div>
              <div class="d-flex justify-content-between border-top pt-2"><span class="fw-semibold">Total commission</span><span class="fw-extrabold text-success">${T.currency(db.adminOps.stats.commissionEarned)}</span></div>
            </div>
          </div>
        </div>
      </div>`, 'settings');
  }

  function renderPage(pageId) {
    switch (pageId) {
      case 'index':
        return renderHome();
      case 'services':
        return renderServicesPage();
      case 'find':
        return renderProvidersPage();
      case 'provider-detail':
        return renderBookingForm();
      case 'how-it-works':
        return renderSimpleWebsitePage('How It Works', 'Simple steps from selecting a service to post-booking support.', [
          { title: 'Choose a Service', body: 'Select the service you need from our verified categories.' },
          { title: 'Pick a Pro', body: 'Compare providers, reviews, and rates before you book.' },
          { title: 'Track and Pay', body: 'Get booking updates, secure payment, and support in one flow.' },
          { title: 'Stay Protected', body: 'Claims, support, verification, and dispute assistance are built in.' }
        ], 'services');
      case 'about':
        return renderSimpleWebsitePage('About AmarSheba', 'Dhaka’s trusted home-service marketplace, built for reliable household support and verified field work.', db.website.aboutStats.map((item) => ({ title: item.label, body: item.value })), 'home');
      case 'contact':
        return renderSimpleWebsitePage('Contact Us', 'Reach customer care, emergency dispatch, provider support, or our Gulshan office.', db.website.contactMethods.map((item) => ({ title: item.title, body: `${item.value} | ${item.note}` })), 'home');
      case 'pricing':
        return renderPricingPage();
      case 'emergency':
        return renderSimpleWebsitePage('Emergency Services', 'Rapid-response services for urgent household, access, and medical situations.', db.website.emergencyServices.map((item) => ({ title: `${item.name} | ${item.eta}`, body: `${item.cases}. Starting from ${T.currency(item.price)}.` })), 'services');
      case 'become-provider':
        return renderBecomeProviderPage();
      case 'privacy':
        return renderSimpleWebsitePage('Privacy Policy', 'How AmarSheba handles account, booking, payment, and support data.', [
          { title: 'Account Data', body: 'We store identity, contact, and service preference data to operate your account.' },
          { title: 'Booking Data', body: 'Booking details, technician location, and provider records are used to deliver service safely.' },
          { title: 'Payment Data', body: 'Payment method metadata is stored for wallet, settlement, and refund workflows.' }
        ], 'home');
      case 'terms':
        return renderSimpleWebsitePage('Terms & Conditions', 'Core booking, provider, payment, and dispute terms.', [
          { title: 'Bookings', body: 'Bookings are confirmed based on provider availability and service scope.' },
          { title: 'Provider Standards', body: 'Providers must maintain compliance, on-time performance, and service quality.' },
          { title: 'Payments & Disputes', body: 'Platform fees, settlement timing, and dispute rules apply to all bookings.' }
        ], 'home');
      case 'customer-dashboard':
        return renderCustomerDashboard();
      case 'auth':
        return renderAuth();
      case 'access':
        return renderRoleAccess();
      case 'booking':
        return params().get('provider') ? renderBookingForm() : renderProvidersPage();
      case 'booking-tracking':
        return renderSimpleWebsitePage('Booking Tracking', `Track order ${db.bookingTracking.orderId} through each service milestone.`, db.bookingTracking.steps.map((step, index) => ({ title: step, body: index === db.bookingTracking.currentStepIndex ? 'Current active stage' : 'Pending or completed milestone' })), 'home');
      case 'wallet':
        return renderCustomerWalletPanel();
      case 'unauthorized':
        return renderUtility('403', 'You do not have permission to access that route with the current role.', 'access.html', 'Switch Role');
      case 'session-expired':
        return renderUtility('Session Expired', 'Your session has expired. Please choose a role and continue again.', 'access.html', 'Continue');
      case '404':
        return renderUtility('404', 'The page you are looking for could not be found.', 'index.html', 'Back Home');
      case 'splash':
        return T.standalonePage(`<div class="mobile-splash d-flex align-items-center justify-content-center"><div class="text-center"><div class="brand-mark mb-4">A</div><h1 class="manrope fw-extrabold text-white">AmarSheba</h1><p class="text-white-50">Dhaka’s trusted service marketplace</p><a href="login.html" class="btn btn-light rounded-pill px-4 py-3 fw-bold mt-3">Enter Demo</a></div></div>`, { title: 'Splash', bodyClass: 'bg-soft' });
      case 'login':
        return T.standalonePage(`<div class="panel-shell"><div class="container" style="max-width:480px;"><div class="auth-card"><h2 class="fw-extrabold manrope mb-4">Customer Login</h2><div class="d-grid gap-3"><input class="form-control rounded-4 py-3" placeholder="Phone or email"><input class="form-control rounded-4 py-3" type="password" placeholder="Password"><a class="panel-btn-primary text-decoration-none" href="home.html">Continue</a></div></div></div></div>`, { title: 'Login' });
      case 'home':
        return renderCustomerDashboard();
      case 'providers':
        return renderCustomerFindServicesPage();
      case 'book':
        return renderBookingForm();
      case 'payment':
        return renderSimpleDashboardPage('customer', 'Payment', `<div class="ag-card"><h4 class="fw-bold mb-4">Payment Summary</h4><p class="text-muted">Choose wallet, card, Nagad, bKash, or cash on delivery. Escrow and promo sections are mirrored as static Bootstrap cards for demo use.</p><a href="confirmation.html" class="btn btn-blue rounded-4 px-4 py-3 mt-3">Pay Now</a></div>`);
      case 'confirmation':
        return renderSimpleDashboardPage('customer', 'Booking Confirmed', `<div class="ag-card text-center"><div class="display-5 mb-3">Booking Confirmed</div><p class="text-muted">Your provider has been notified and tracking is now available.</p><div class="d-flex justify-content-center gap-3 mt-4"><a href="my-bookings.html" class="btn btn-blue rounded-4 px-4">View Bookings</a><a href="home.html" class="btn btn-light border-light rounded-4 px-4">Back Home</a></div></div>`);
      case 'my-bookings':
        return renderCustomerBookingsPage();
      case 'claims-center':
        return renderCustomerClaimsPage();
      case 'messages':
        return renderCustomerMessagesPage();
      case 'customer-profile':
      case 'more':
        return renderCustomerProfileMirror();
      case 'provider-app':
        return renderProviderDashboard();
      case 'provider-bookings':
        return renderProviderBookingsPage();
      case 'provider-booking-detail':
        return renderSimpleDashboardPage('provider', 'Provider Booking Detail', `<div class="ag-card"><h4 class="fw-bold mb-4">Booking PB001</h4><p class="text-muted">Customer: Nusrat Jahan | Deep Cleaning | 10:30 AM - 12:30 PM | Uttara Sector 7</p><div class="d-flex gap-3 mt-4"><a href="provider-assignment.html" class="btn btn-blue rounded-4">Assign Resource</a><button class="btn btn-light border-light rounded-4">Mark Contacted</button></div></div>`);
      case 'provider-kyc':
        return renderProviderVerificationPage();
      case 'provider-team':
        return renderProviderTeamPage();
      case 'provider-assignment':
        return renderSimpleDashboardPage('provider', 'Assign Resource', `<div class="d-grid gap-3">${db.providerOps.resources.map((resource)=>`<div class="ag-card d-flex justify-content-between align-items-center"><div><div class="fw-bold">${resource.name}</div><div class="small text-muted">${resource.proximity} | ${resource.availability}</div></div><button class="btn btn-blue rounded-4 px-4">Assign</button></div>`).join('')}</div>`);
      case 'provider-earnings-report':
        return renderProviderEarningsPage();
      case 'provider-profile':
        return renderProviderProfilePage();
      case 'resource-app':
      case 'technician':
        return renderResourceDashboardPanel();
      case 'resource-assignments':
        return renderResourceAssignmentsPanel();
      case 'resource-history':
        return renderResourceHistoryPage();
      case 'resource-messages':
        return renderResourceMessagesPage();
      case 'resource-job-detail':
      case 'technician-job-detail':
        return renderSimpleDashboardPage('resource', 'Job Detail', `<div class="ag-card"><h4 class="fw-bold mb-4">${db.resourceOps.jobDetail.service}</h4><div class="small text-muted mb-2">${db.resourceOps.jobDetail.customer}</div><div class="small text-muted mb-4">${db.resourceOps.jobDetail.address} | ${db.resourceOps.jobDetail.slot}</div><div class="d-flex gap-3"><a href="resource-proof-upload.html?id=RS001" class="btn btn-blue rounded-4">Upload Proof</a><a href="resource-issue-report.html?id=RS001" class="btn btn-light border-light rounded-4">Report Issue</a></div></div>`);
      case 'resource-proof-upload':
        return renderSimpleDashboardPage('resource', 'Proof Upload', `<div class="ag-card"><div class="d-grid gap-3"><input class="form-control rounded-4 py-3" type="file"><input class="form-control rounded-4 py-3" type="file"><textarea class="form-control rounded-4" rows="4" placeholder="Work summary"></textarea><a href="resource-job-detail.html?id=RS001" class="btn btn-blue rounded-4 py-3">Save Proof</a></div></div>`);
      case 'resource-issue-report':
        return renderSimpleDashboardPage('resource', 'Issue Report', `<div class="ag-card"><div class="d-grid gap-3"><select class="form-select rounded-4 py-3">${db.resourceOps.issueReasons.map((reason)=>`<option>${reason}</option>`).join('')}</select><textarea class="form-control rounded-4" rows="5" placeholder="Describe the issue"></textarea><a href="resource-job-detail.html?id=RS001" class="btn btn-blue rounded-4 py-3">Submit Issue</a></div></div>`);
      case 'resource-profile':
        return renderResourceProfilePage();
      case 'admin':
        return renderAdminDashboard();
      case 'admin-users':
        return renderAdminUsersPage();
      case 'admin-bookings':
        return renderAdminBookingsPage();
      case 'admin-verification':
        return renderAdminVerificationPage();
      case 'admin-analytics':
        return renderAdminAnalyticsPage();
      case 'admin-settings':
        return renderAdminSettingsPage();
      case 'admin-disputes':
        return renderSimpleDashboardPage('admin', 'Admin Disputes', `
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold mb-0">Verification Queue & Disputes</h4>
            <div class="d-flex gap-2">
              <span class="badge bg-warning-subtle text-warning">12 Pending</span>
              <span class="badge bg-danger-subtle text-danger">4 Flagged</span>
            </div>
          </div>
          <div class="ag-card mb-4">
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead><tr><th>Entity</th><th>Type</th><th>Submitted</th><th>Documents</th><th class="text-end">Actions</th></tr></thead>
                <tbody>
                  ${[
                    ['Technician: Rakib', 'Individual', '2h ago', '2 Files'],
                    ['Provider: CleanPro', 'Agency', '5h ago', '4 Files'],
                    ['Technician: Sumon', 'Individual', '1d ago', '2 Files']
                  ].map((row) => `<tr><td class="fw-semibold">${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td><span class="badge bg-blue-soft">${row[3]}</span></td><td class="text-end"><div class="d-inline-flex gap-2"><button class="btn btn-sm btn-light"><i class="fa-regular fa-eye"></i></button><button class="btn btn-sm btn-success-subtle text-success"><i class="fa-solid fa-check"></i></button><button class="btn btn-sm btn-danger-subtle text-danger"><i class="fa-solid fa-xmark"></i></button></div></td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-grid gap-3">${db.adminOps.disputes.map((item)=>`<div class="ag-card"><div class="fw-bold">${item.id}</div><div class="small text-muted">${item.summary}</div></div>`).join('')}</div>`, 'disputes');
      case 'admin-commissions':
        return renderSimpleDashboardPage('admin', 'Admin Commissions', `
          <div class="row g-4 mb-4">
            ${[
              ['Total Revenue', 'Tk 14.8M'],
              ['Net Commission', 'Tk 2.2M'],
              ['Active Escrow', 'Tk 4.5L'],
              ['Payouts Pending', 'Tk 8.2L']
            ].map((card) => `<div class="col-md-3"><div class="ag-card"><div class="small text-muted mb-2">${card[0]}</div><div class="display-6 fw-extrabold">${card[1]}</div></div></div>`).join('')}
          </div>
          <div class="ag-card">
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>Category</th><th class="text-end">Percent</th></tr></thead>
                <tbody>${db.adminOps.commissions.map((item)=>`<tr><td>${item.category}</td><td class="text-end fw-bold">${item.percent}%</td></tr>`).join('')}</tbody>
              </table>
            </div>
            <button class="btn btn-blue rounded-4 px-4">Update Rules</button>
          </div>`, 'commissions');
      case 'admin-settlements':
        return renderSimpleDashboardPage('admin', 'Admin Settlements', `
          <div class="row g-4 mb-4">
            <div class="col-md-4"><div class="ag-card"><div class="small text-muted mb-2">Pending</div><div class="display-6 fw-extrabold">${T.currency(db.adminOps.settlements.pending)}</div></div></div>
            <div class="col-md-4"><div class="ag-card"><div class="small text-muted mb-2">Released</div><div class="display-6 fw-extrabold">${T.currency(db.adminOps.settlements.released)}</div></div></div>
            <div class="col-md-4"><div class="ag-card"><div class="small text-muted mb-2">Payout Schedule</div><div class="display-6 fw-extrabold">${db.adminOps.settlements.payoutSchedule}</div></div></div>
          </div>
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="ag-card">
                <h4 class="fw-bold mb-4">Commission Logs</h4>
                <div class="d-grid gap-3">
                  ${[1,2,3].map((i)=>`<div class="d-flex justify-content-between align-items-center border-bottom pb-3"><div><div class="fw-semibold">Booking #102${i}</div><div class="small text-muted">Apr 27, 2026</div></div><div class="fw-bold text-success">+Tk 150</div></div>`).join('')}
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="ag-card">
                <h4 class="fw-bold mb-4">Pending Settlements</h4>
                <div class="d-grid gap-3">
                  ${[1,2,3].map((i)=>`<div class="d-flex justify-content-between align-items-center border-bottom pb-3"><div><div class="fw-semibold">Partner: TechTeam ${i}</div><div class="small text-muted">Cycle: Apr 20 - Apr 26</div></div><div class="fw-bold">Tk 14,200</div></div>`).join('')}
                </div>
              </div>
            </div>
          </div>`, 'settlements');
      default:
        return T.websitePage(`
          <section class="py-5">
            <div class="container py-5">
              <div class="ag-card text-center">
                <div class="display-6 fw-extrabold mb-3">Page Not Available</div>
                <p class="text-muted mb-4">This Bootstrap version only keeps the public production-facing pages.</p>
                <a href="index.html" class="btn btn-blue px-4 py-3 rounded-4 fw-bold">Back Home</a>
              </div>
            </div>
          </section>
        `, { title: 'Not Found', activeNav: 'home' });
    }
  }

  function bootstrapPage() {
    const html = renderPage(readPageId());
    document.open();
    document.write(html);
    document.close();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapPage);
  } else {
    bootstrapPage();
  }
})();
