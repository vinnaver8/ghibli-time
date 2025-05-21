(function() {
  const wrapper   = document.getElementById('card-wrapper');
  const card      = document.getElementById('scroll-card');
  const startY    = 1000;   // when the wrapper sits at top of viewport
  const endY      = 2600;   // when wrapper should stop moving
  const maxOffset = endY - startY;

  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    // 1) Toggle visibility once the wrapper enters the viewport
    // We show the card when the top of the page has scrolled past startY - (viewport/2)
    const showThreshold = startY - (window.innerHeight / 2);
    if (scrollY >= showThreshold && scrollY <= endY) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }

    // 2) Clamp the wrapper’s top between startY and endY
    const clampedTop = Math.min(Math.max(scrollY, startY), endY);
    wrapper.style.top = clampedTop + 'px';

    // 3) Schedule next rAF
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load in case you refresh mid-scroll
  onScroll();
})();
