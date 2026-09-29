/* ==========================================================================
   PINK OAKS - BANI PARK, JAIPUR
   Ultra-Luxurious Interactive & Animated System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Luxury Cursor (Desktop Only)
  initLuxuryCursor();

  // 2. Initialize 3D Tilt Parallax on Cards & Hero (Desktop Only)
  init3DTilt();

  // 3. Initialize Interactive Number Counters
  initNumberCounters();

  // 4. Initialize Magnetic Buttons
  initMagneticButtons();

  // 5. Initialize Click Water Ripples
  initClickRipples();

  // 6. Initialize Page Curtain Transition for Multi-Page Navigation
  initPageTransitions();

  // 7. Initialize Intersection Observer for Scroll Reveals
  initScrollObserver();

  // 8. Multi-Page Active Nav Link Highlighting
  initPageActiveNav();

  // 9. Initialize Mobile Slide-in Drawer Navigation
  initMobileDrawer();

  // 10. Set default preferred date to tomorrow in visit form
  const dateInput = document.getElementById('prefDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // 11. ESC Key listener to close modal & mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFloorplanModal();
      closeMobileDrawer();
    }
  });
});

/**
 * 0. Mobile Drawer Navigation Controller
 */
function initMobileDrawer() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && drawer && backdrop) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileDrawer();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileDrawer);
    }

    backdrop.addEventListener('click', closeMobileDrawer);

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });
  }
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * 1. Custom Luxury Cursor & Halo Follower
 */
function initLuxuryCursor() {
  // Only desktop viewports
  if (window.innerWidth <= 768) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  const halo = document.createElement('div');
  halo.className = 'custom-cursor-halo';

  document.body.appendChild(dot);
  document.body.appendChild(halo);

  let mouseX = 0, mouseY = 0;
  let haloX = 0, haloY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Smooth lerp halo follower
  function animateHalo() {
    haloX += (mouseX - haloX) * 0.15;
    haloY += (mouseY - haloY) * 0.15;
    halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateHalo);
  }
  animateHalo();

  // Add hover expand triggers on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .material-card, .floorplan-card, .swatch-item, .map-pin');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/**
 * 2. 3D Parallax Tilt Effect on Cards
 */
function init3DTilt() {
  if (window.innerWidth <= 768) return;
  const cards = document.querySelectorAll('.material-card, .floorplan-card, .hero-image-frame, .map-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -8;
      const tiltY = (x / (rect.width / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/**
 * 3. Animated Number Counter Roll-Up
 */
function initNumberCounters() {
  const numbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetText = el.textContent.trim();
        const numericVal = parseInt(targetText, 10);

        if (!isNaN(numericVal)) {
          let count = 0;
          const step = Math.ceil(numericVal / 25);
          const timer = setInterval(() => {
            count += step;
            if (count >= numericVal) {
              el.textContent = targetText;
              clearInterval(timer);
            } else {
              el.textContent = count;
            }
          }, 40);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(num => observer.observe(num));
}

/**
 * 4. Magnetic Buttons Attraction
 */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-primary, .phone-link');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
  });
}

/**
 * 5. Click Water Ripple Effect
 */
function initClickRipples() {
  const rippleTargets = document.querySelectorAll('.btn-primary, .material-card, .floorplan-card, .palette-block');

  rippleTargets.forEach(target => {
    target.addEventListener('click', function(e) {
      const rect = target.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = 'ripple-circle';

      const existing = target.getElementsByClassName('ripple-circle')[0];
      if (existing) existing.remove();

      target.appendChild(circle);
    });
  });
}

/**
 * 6. Multi-Page Curtain Transition
 */
function initPageTransitions() {
  const curtain = document.createElement('div');
  curtain.className = 'page-transition-curtain';
  document.body.appendChild(curtain);

  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Only transition internal html pages
      if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
        e.preventDefault();
        curtain.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
}

/**
 * 7. Scroll Reveal Observer
 */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 8. Page Active Nav Highlight
 */
function initPageActiveNav() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (!href.includes(page)) {
      link.classList.remove('active');
    }
  });
}

/**
 * Floor Plan Modal Manager
 */
function openFloorplanModal(planName, bhk, area, specs, imgSrc) {
  const modal = document.getElementById('floorplanModal');
  const title = document.getElementById('modalPlanTitle');
  const type = document.getElementById('modalLayoutType');
  const areaEl = document.getElementById('modalArea');
  const specsEl = document.getElementById('modalSpecs');
  const blueprintWrap = document.getElementById('modalBlueprintSvg');

  if (title) title.textContent = `${planName} — ${bhk}`;
  if (type) type.textContent = `${bhk}`;
  if (areaEl) areaEl.textContent = area;
  if (specsEl) specsEl.textContent = specs;

  // Render High-Resolution 3D Floor Plan Image according to plan
  if (blueprintWrap) {
    let imgPath = imgSrc;
    if (!imgPath) {
      if (planName.includes('Type A') || planName.includes('Flat A')) imgPath = 'assets/floorplan_flat_a.jpg';
      else if (planName.includes('Type B') || planName.includes('Flat B')) imgPath = 'assets/floorplan_flat_b.jpg';
      else imgPath = 'assets/floorplan_flat_c.jpg';
    }
    blueprintWrap.innerHTML = `<img src="${imgPath}" alt="${planName} 3D Architectural Floor Plan" style="width: 100%; max-height: 420px; object-fit: contain; display: block; border-radius: 6px;">`;
  }

  if (modal) {
    modal.classList.add('active');
  }
}

function closeFloorplanModal() {
  const modal = document.getElementById('floorplanModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside modal container
document.addEventListener('click', (e) => {
  const modal = document.getElementById('floorplanModal');
  if (modal && e.target === modal) {
    closeFloorplanModal();
  }
});

/**
 * Palette Swatch Highlight
 */
function highlightColor(colorName, hexCode) {
  showToast(`Color Accent: ${colorName} (${hexCode})`);
}

/**
 * Site Visit Form Submit Handler
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('prefDate').value;

  showToast(`Thank you, ${name}! Site visit request confirmed for ${date}.`);

  // Reset form
  event.target.reset();
}

/**
 * Brochure Download Simulator
 */
function downloadBrochure() {
  showToast('Downloading Pink Oaks Floor Plan & E-Brochure PDF...');
  setTimeout(() => {
    alert('Pink Oaks Bani Park Jaipur - E-Brochure PDF generated successfully.');
  }, 800);
}

/**
 * Toast Notification Popup
 */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');

  if (toast && msgEl) {
    msgEl.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/**
 * Interactive Amenity Category Filter
 */
function filterAmenities(category, btnEl) {
  const tabs = document.querySelectorAll('.amenity-tab-btn');
  tabs.forEach(t => {
    t.classList.remove('active');
    t.style.background = 'white';
    t.style.color = 'var(--color-text-secondary)';
    t.style.border = '1px solid var(--border-light)';
  });

  if (btnEl) {
    btnEl.classList.add('active');
    btnEl.style.background = 'var(--color-brand-pink)';
    btnEl.style.color = 'white';
    btnEl.style.border = 'none';
  }

  const items = document.querySelectorAll('.amenity-card-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'flex';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (!btnEl.parentElement.querySelector(`.amenity-tab-btn.active`).textContent.includes('All') && itemCat !== category) {
          item.style.display = 'none';
        }
      }, 200);
    }
  });
}

/**
 * Real Interactive Map Initialization (Leaflet.js + CartoDB Positron Luxury Tiles)
 */
function initRealMap(targetId = 'realLeafletMap') {
  const mapContainer = document.getElementById(targetId);
  if (!mapContainer || typeof L === 'undefined') return;

  // Bani Park, Jaipur Coordinates
  const pinkOaksCoords = [26.9295, 75.7942];

  const mapInstance = L.map(targetId, {
    center: pinkOaksCoords,
    zoom: 15,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: false
  });

  // CartoDB Positron luxury light theme tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(mapInstance);

  // Custom Pink Oaks Glowing Marker Icon
  const pinkIcon = L.divIcon({
    className: 'custom-pink-leaflet-marker',
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(196,107,133,0.3); animation: pulseGlow 2.5s infinite;"></div>
        <div style="width: 28px; height: 28px; border-radius: 50%; background: #C46B85; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 12px rgba(196,107,133,0.5);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  // Primary Marker: Pink Oaks Residences
  const mainMarker = L.marker(pinkOaksCoords, { icon: pinkIcon }).addTo(mapInstance);
  mainMarker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; text-align: center;">
      <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: #C46B85; letter-spacing: 1px;">Project Location</span>
      <h4 style="font-family: 'Cormorant Garamond', serif; font-size: 18px; margin: 4px 0; color: #1C1B1A;">PINK OAKS</h4>
      <p style="font-size: 11px; color: #5A5650; margin: 0 0 6px;">18 Boutique Luxury Residences<br>Bani Park, Jaipur</p>
      <a href="tel:9772297772" style="display: inline-block; padding: 4px 10px; background: #C46B85; color: white; border-radius: 4px; font-size: 10px; font-weight: 600; text-decoration: none;">Call 97722-97772</a>
    </div>
  `).openPopup();

  // Surrounding Key Landmarks
  const landmarks = [
    { coords: [26.9239, 75.8267], title: 'Walled Pink City (1.5 km)', desc: 'UNESCO Heritage Core' },
    { coords: [26.9202, 75.7877], title: 'Jaipur Railway Station (2 km)', desc: 'Main Rail Junction' },
    { coords: [26.9238, 75.7981], title: 'Sindhi Camp Bus Stand (500 m)', desc: 'Central Bus Terminal' },
    { coords: [26.9320, 75.7930], title: 'Madho Singh Park (500 m)', desc: 'Lush Heritage Gardens' },
    { coords: [26.9288, 75.7950], title: 'Radha Damodar Temple (100 m)', desc: 'Historic Shrine' },
    { coords: [26.9215, 75.7985], title: 'Rawat Sweets / MI Road (1 km)', desc: 'Dining & Commercial Corridor' }
  ];

  landmarks.forEach(lm => {
    const marker = L.circleMarker(lm.coords, {
      radius: 6,
      fillColor: '#1B382B',
      color: '#FFFFFF',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(mapInstance);

    marker.bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px;">
        <strong style="font-size: 12px; color: #1B382B;">${lm.title}</strong>
        <p style="font-size: 10px; color: #5A5650; margin: 2px 0 0;">${lm.desc}</p>
      </div>
    `);
  });
}

function switchMapMode(mode) {
  const leafletMap = document.getElementById('realLeafletMap');
  const googleMap = document.getElementById('googleMapWrap');
  const btnReal = document.getElementById('btnRealMap');
  const btnGoogle = document.getElementById('btnGoogleMap');

  if (mode === 'google') {
    if (leafletMap) leafletMap.style.display = 'none';
    if (googleMap) googleMap.style.display = 'block';
    if (btnGoogle) {
      btnGoogle.style.background = 'var(--color-brand-pink)';
      btnGoogle.style.color = 'white';
      btnGoogle.style.border = 'none';
    }
    if (btnReal) {
      btnReal.style.background = 'white';
      btnReal.style.color = 'var(--color-text-secondary)';
      btnReal.style.border = '1px solid var(--border-light)';
    }
  } else {
    if (googleMap) googleMap.style.display = 'none';
    if (leafletMap) {
      leafletMap.style.display = 'block';
      if (mapInstance) mapInstance.invalidateSize();
    }
    if (btnReal) {
      btnReal.style.background = 'var(--color-brand-pink)';
      btnReal.style.color = 'white';
      btnReal.style.border = 'none';
    }
    if (btnGoogle) {
      btnGoogle.style.background = 'white';
      btnGoogle.style.color = 'var(--color-text-secondary)';
      btnGoogle.style.border = '1px solid var(--border-light)';
    }
  }
}

// Auto init real map when DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (document.getElementById('realLeafletMap')) initRealMap('realLeafletMap');
    if (document.getElementById('homeLeafletMap')) initRealMap('homeLeafletMap');
  }, 400);
});


