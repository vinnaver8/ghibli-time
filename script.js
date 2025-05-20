// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cardWrapper    = document.getElementById('sticky-card');
  const startY         = 950;
  const endY           = 2600;
  let isAutoScrolling  = false;
  let ticking          = false;

  function handleScroll() {
    // don’t retrigger while we’re auto‐scrolling
    if (isAutoScrolling) return;

    const scrollY = window.scrollY;

    // only active in our [950 → 2600] range
    if (scrollY >= startY && scrollY <= endY) {
      // CSS sticky keeps it visually at center; JS just re-centers if it drifts
      const rect = cardWrapper.getBoundingClientRect();

      // if top edge at/above viewport or bottom at/below viewport
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        isAutoScrolling = true;

        // scroll so #sticky-card is dead-center
        cardWrapper.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // allow re-trigger after the smooth scroll (~600ms)
        setTimeout(() => {
          isAutoScrolling = false;
        }, 600);
      }
    }
    // outside the range, CSS sticky will “unstick” automatically
  }

  // throttle via requestAnimationFrame
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
});
