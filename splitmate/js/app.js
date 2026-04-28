// Function to check if running in standalone mode (installed PWA)
function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

// Route handling
document.addEventListener('DOMContentLoaded', () => {
  const isLandingPage = window.location.pathname.endsWith('landing.html');
  
  if (isPWA()) {
    // If installed and on landing page, redirect to index
    if (isLandingPage) {
      window.location.replace('index.html');
    }
  } else {
    // If NOT installed and NOT on landing page, redirect to landing
    if (!isLandingPage) {
      window.location.replace('landing.html');
    }
  }

  // Handle Installation
  let deferredPrompt;
  const installBtn = document.getElementById('install-btn');

  if (installBtn) {
      if (isPWA()) {
          installBtn.textContent = 'Open SplitMate';
          installBtn.addEventListener('click', () => {
               window.location.replace('index.html');
          });
      } else {
          window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              deferredPrompt = e;
          });

          installBtn.addEventListener('click', async () => {
              if (deferredPrompt) {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  deferredPrompt = null;
              } else {
                  // Fallback for iOS or when prompt isn't ready
                  alert('To install, tap "Share" and then "Add to Home Screen".');
              }
          });
      }
  }

  // Splash Screen Logic
  const splashScreen = document.getElementById('splash-screen');
  const dashboard = document.getElementById('dashboard');

  if (splashScreen && dashboard) {
      setTimeout(() => {
          splashScreen.style.opacity = '0';
          setTimeout(() => {
              splashScreen.style.display = 'none';
              dashboard.classList.add('visible');
          }, 500);
      }, 2000);
  }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
