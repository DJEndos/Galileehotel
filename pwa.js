

(function () {

    // Register Service Worker 
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('✅ Galilee Hotel SW registered:', registration.scope);
  
            // Check for updates every 60 seconds
            setInterval(() => {
              registration.update();
            }, 60000);
          })
          .catch((err) => {
            console.error('❌ SW registration failed:', err);
          });
      });
    }
  
    // ── Install Prompt Banner 
    let deferredPrompt = null;
  
    // Create install banner HTML
    const banner = document.createElement('div');
    banner.id = 'pwa-banner';
    banner.innerHTML = `
      <div id="pwa-banner-inner">
        <div id="pwa-banner-logo">G</div>
        <div id="pwa-banner-text">
          <strong>Install Galilee Hotel App</strong>
          <span>Add to your home screen for quick access</span>
        </div>
        <button id="pwa-install-btn">Install</button>
        <button id="pwa-dismiss-btn">✕</button>
      </div>
    `;
  
    // Banner styles
    const style = document.createElement('style');
    style.textContent = `
      #pwa-banner {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #pwa-banner.show { transform: translateY(0); }
      #pwa-banner-inner {
        background: rgba(20,20,20,0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-top: 1px solid rgba(201,168,76,0.25);
        padding: 1rem 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        max-width: 600px;
        margin: 0 auto;
      }
      #pwa-banner-logo {
        width: 44px; height: 44px;
        background: linear-gradient(135deg, #C9A84C, #9A7830);
        border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-family: Georgia, serif;
        font-size: 1.2rem;
        font-weight: 700;
        color: #fff;
        flex-shrink: 0;
      }
      #pwa-banner-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      #pwa-banner-text strong {
        font-size: 0.88rem;
        font-weight: 600;
        color: #fff;
        font-family: sans-serif;
      }
      #pwa-banner-text span {
        font-size: 0.72rem;
        color: rgba(255,255,255,0.45);
        font-family: sans-serif;
      }
      #pwa-install-btn {
        background: linear-gradient(135deg, #C9A84C, #9A7830);
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 0.55rem 1.25rem;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        font-family: sans-serif;
        letter-spacing: 0.05em;
      }
      #pwa-dismiss-btn {
        background: none;
        border: none;
        color: rgba(255,255,255,0.35);
        font-size: 1rem;
        cursor: pointer;
        padding: 0.25rem;
        line-height: 1;
        flex-shrink: 0;
      }
      #pwa-dismiss-btn:hover { color: rgba(255,255,255,0.7); }
  
      /* iOS Install Instruction */
      #ios-install-hint {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 9999;
        background: rgba(20,20,20,0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-top: 1px solid rgba(201,168,76,0.25);
        padding: 1.25rem 1.5rem;
        text-align: center;
        transform: translateY(100%);
        transition: transform 0.4s ease;
      }
      #ios-install-hint.show { transform: translateY(0); }
      #ios-install-hint p {
        font-size: 0.85rem;
        color: rgba(255,255,255,0.75);
        font-family: sans-serif;
        line-height: 1.6;
        margin-bottom: 0.75rem;
      }
      #ios-install-hint strong { color: #C9A84C; }
      #ios-install-hint .arrow {
        font-size: 1.5rem;
        animation: bounce 1.5s ease-in-out infinite;
        display: block;
        margin-bottom: 0.5rem;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      #ios-dismiss {
        background: none;
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 8px;
        color: rgba(255,255,255,0.5);
        padding: 0.5rem 1.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        font-family: sans-serif;
      }
    `;
  
    document.head.appendChild(style);
    document.body.appendChild(banner);
  
    // ── Android/Desktop Install Prompt 
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
  
      // Don't show if already dismissed
      if (localStorage.getItem('galilee_pwa_dismissed')) return;
  
      // Show banner after 3 seconds
      setTimeout(() => {
        banner.classList.add('show');
      }, 3000);
    });
  
    // Install button click
    document.addEventListener('click', (e) => {
      if (e.target.id === 'pwa-install-btn') {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
              console.log('✅ User installed Galilee Hotel app');
              banner.classList.remove('show');
            }
            deferredPrompt = null;
          });
        }
      }
  
      // Dismiss button
      if (e.target.id === 'pwa-dismiss-btn') {
        banner.classList.remove('show');
        localStorage.setItem('galilee_pwa_dismissed', '1');
      }
  
      // iOS dismiss
      if (e.target.id === 'ios-dismiss') {
        const hint = document.getElementById('ios-install-hint');
        if (hint) hint.classList.remove('show');
        localStorage.setItem('galilee_pwa_dismissed', '1');
      }
    });
  
    // ── iOS Install Hint 
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone;
  
    if (isIOS && !isInStandaloneMode && !localStorage.getItem('galilee_pwa_dismissed')) {
      const iosHint = document.createElement('div');
      iosHint.id = 'ios-install-hint';
      iosHint.innerHTML = `
        <span class="arrow">↓</span>
        <p>
          Install <strong>Galilee Hotel</strong> on your iPhone.<br />
          Tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong>
        </p>
        <button id="ios-dismiss">Got it</button>
      `;
      document.body.appendChild(iosHint);
  
      setTimeout(() => iosHint.classList.add('show'), 3000);
    }
  
    // ── App Installed Event 
    window.addEventListener('appinstalled', () => {
      banner.classList.remove('show');
      deferredPrompt = null;
      console.log('✅ Galilee Hotel PWA installed successfully');
    });
  
    // ── Online/Offline Status 
    function updateOnlineStatus() {
      const isOnline = navigator.onLine;
      const existing = document.getElementById('offline-notice');
  
      if (!isOnline) {
        if (!existing) {
          const notice = document.createElement('div');
          notice.id = 'offline-notice';
          notice.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
            background: #EF4444; color: #fff; text-align: center;
            padding: 0.6rem 1rem; font-size: 0.8rem; font-family: sans-serif;
            font-weight: 600; letter-spacing: 0.05em;
          `;
          notice.textContent = '📶 You are offline — some features may not be available';
          document.body.prepend(notice);
        }
      } else {
        if (existing) existing.remove();
      }
    }
  
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  
  })();
  