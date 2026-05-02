const NAV_HTML = `
<nav class="navbar transparent">
  <div class="navbar-inner">
    <a href="../index.html" class="nav-logo">
      <div class="logo-icon">G</div>
      <div class="logo-text">
        <div class="logo-name">Galilee Hotel</div>
        <div class="logo-tagline">Where Comfort Meets Excellence</div>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="rooms.html">Rooms &amp; Suites</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-cta">
      <a href="booking.html" class="btn btn-gold btn-sm">Book Now</a>
      <button class="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-menu">
  <a href="../index.html">Home</a>
  <a href="about.html">About Us</a>
  <a href="rooms.html">Rooms &amp; Suites</a>
  <a href="services.html">Services</a>
  <a href="booking.html">Booking</a>
  <a href="contact.html">Contact</a>
  <div class="mobile-menu-cta">
    <a href="booking.html" class="btn btn-gold">Book Your Stay →</a>
  </div>
  <div class="mobile-menu-tagline">Where Comfort Meets Excellence</div>
</div>`;

const NAV_HOME_HTML = `
<nav class="navbar transparent">
  <div class="navbar-inner">
    <a href="index.html" class="nav-logo">
      <div class="logo-icon">G</div>
      <div class="logo-text">
        <div class="logo-name">Galilee Hotel</div>
        <div class="logo-tagline">Where Comfort Meets Excellence</div>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="pages/about.html">About</a></li>
      <li><a href="pages/rooms.html">Rooms &amp; Suites</a></li>
      <li><a href="pages/services.html">Services</a></li>
      <li><a href="pages/contact.html">Contact</a></li>
      <li><a href="/admin-login.html">Dashboard</a></li>
    </ul>
    <div class="nav-cta">
      <a href="pages/booking.html" class="btn btn-gold btn-sm">Book Now</a>
      <button class="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-menu">
  <a href="index.html">Home</a>
  <a href="pages/about.html">About Us</a>
  <a href="pages/rooms.html">Rooms &amp; Suites</a>
  <a href="pages/services.html">Services</a>
  <a href="pages/booking.html">Booking</a>
  <a href="pages/contact.html">Contact</a>
</div>`;

const FOOTER_HOME_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="nav-logo" style="margin-bottom:1rem;">
          <div class="logo-icon">G</div>
          <div class="logo-text">
            <div class="logo-name" style="font-family:var(--font-display);font-size:1.3rem;color:var(--white);font-weight:700;">Galilee Hotel</div>
            <div class="logo-tagline" style="font-size:0.6rem;color:var(--gold);letter-spacing:0.18em;text-transform:uppercase;">Where Comfort Meets Excellence</div>
          </div>
        </div>
        <p>Galilee Gardens Hotels Ltd — a premium hospitality destination nestled in the heart of Port Harcourt, Rivers State. We provide unmatched comfort, elegance, and warmth.</p>
        <div class="footer-social">
          <a href="#" class="social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-btn" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="social-btn" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <a href="https://wa.me/2349092495502" class="social-btn" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html"><i class="bi bi-arrow-right"></i> Home</a></li>
          <li><a href="pages/about.html"><i class="bi bi-arrow-right"></i> About Us</a></li>
          <li><a href="pages/rooms.html"><i class="bi bi-arrow-right"></i> Rooms &amp; Suites</a></li>
          <li><a href="pages/services.html"><i class="bi bi-arrow-right"></i> Services</a></li>
          <li><a href="pages/booking.html"><i class="bi bi-arrow-right"></i> Book a Room</a></li>
          <li><a href="pages/contact.html"><i class="bi bi-arrow-right"></i> Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Our Rooms</h4>
        <ul>
          <li><a href="pages/rooms.html"><i class="bi bi-arrow-right"></i> Standard Room</a></li>
          <li><a href="pages/rooms.html"><i class="bi bi-arrow-right"></i> Deluxe Room</a></li>
          <li><a href="pages/rooms.html"><i class="bi bi-arrow-right"></i> Executive Suite</a></li>
          <li><a href="pages/rooms.html"><i class="bi bi-arrow-right"></i> Presidential Suite</a></li>
          <li><a href="pages/services.html"><i class="bi bi-arrow-right"></i> Event Hall</a></li>
          <li><a href="pages/services.html"><i class="bi bi-arrow-right"></i> Restaurant &amp; Dining</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Info</h4>
        <div class="footer-contact-item">
          <span class="icon"><i class="bi bi-pin-map"></i></span>
          <span>65 Old Refinery Road, Elelenwo, Rumurolu 500102, Port Harcourt, Rivers State, Nigeria</span>
        </div>
        <div class="footer-contact-item">
          <span class="icon"><i class="bi bi-telephone-inbound-fill"></i> </span>
          <span><a href="tel:+2348119706518">+2348119706518</a></span>
        </div>
        <div class="footer-contact-item">
          <span class="icon"><i class="bi bi-envelope-at-fill"></i></span>
          <span><a href="mailto:info@galileehotel.com">info@galileehotel.com</a></span>
        </div>
        <div class="footer-contact-item">
          <span class="icon"><i class="bi bi-clock-fill"></i></span>
          <span>Daily: 06:00 AM – 11:45 PM</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 <strong>Galilee Gardens Hotels Ltd</strong>. All rights reserved. <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
      <div class="footer-bottom-links">
        <a href="#">Sitemap</a>
  <a href="#">Cookie Policy</a>
  <a href="#">Accessibility</a>
  <a href="/admin-login.html" style="opacity:0.25;">Staff Login</a>
      </div>
    </div>
  </div>
</footer>`;

const FOOTER_PAGES_HTML = FOOTER_HOME_HTML
  .replace(/href="index\.html"/g, 'href="../index.html"')
  .replace(/href="pages\//g, 'href="');

const WIDGETS_HTML = `
<a href="https://wa.me/2348119706518?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20a%20room%20at%20Galilee%20Hotel."
   class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
  <i class="bi bi-whatsapp"></i>
</a>
<button class="back-to-top" aria-label="Back to top" title="Back to top">↑</button>
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-icon">✅</div>
    <h3>Booking Received!</h3>
    <p>Thank you for choosing <strong>Galilee Hotel</strong>. Your booking request has been submitted successfully. Our team will contact you within 24 hours to confirm your reservation.</p>
    <div style="display:flex;flex-direction:column;gap:0.75rem;">
      <a href="https://wa.me/2348119706518" class="btn btn-green" target="_blank">💬 Confirm on WhatsApp</a>
      <button class="btn btn-outline-gold modal-close">Close</button>
    </div>
  </div>
</div>`;

// Auto-inject into placeholders
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const widgetsPlaceholder = document.getElementById('widgets-placeholder');

  if (navPlaceholder) {
    const isHome = navPlaceholder.dataset.home === 'true';
    navPlaceholder.insertAdjacentHTML('beforebegin', isHome ? NAV_HOME_HTML : NAV_HTML);
    navPlaceholder.remove();
  }

  if (footerPlaceholder) {
    const isHome = footerPlaceholder.dataset.home === 'true';
    footerPlaceholder.insertAdjacentHTML('beforebegin', isHome ? FOOTER_HOME_HTML : FOOTER_PAGES_HTML);
    footerPlaceholder.remove();
  }

  if (widgetsPlaceholder) {
    widgetsPlaceholder.insertAdjacentHTML('beforebegin', WIDGETS_HTML);
    widgetsPlaceholder.remove();
  }
});

