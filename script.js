 (function() {
    const wrapper = document.getElementById('card-wrapper');
    const startY = 1000;
    const endY   = 2600;

    function onScroll() {
      const scrollY = window.scrollY;
      // clamp desired top
      const clamped = Math.max(startY, Math.min(endY, scrollY));
      wrapper.style.top = clamped + 'px';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // initialize
    onScroll();
  })();
